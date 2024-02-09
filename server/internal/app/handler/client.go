package handler

import (
	"bufio"
	"encoding/json"
	"fmt"
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
)

func GetClient(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var user model.Client
	if result := database.DB.Find(&user, id); result.Error != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(fiber.Map{"message": "User found", "data": fiber.Map{"id": user.ID, "name": user.Name, "email": user.Email}})
}

func ClientUpdate(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	input := new(model.Client)
	if err := c.BodyParser(input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var client model.Client
	if result := database.DB.First(&client, id).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	if input.Name != "" && input.Name != client.Name {
		client.Name = input.Name
	}

	if input.Email != "" && input.Email != client.Email {
		client.Email = input.Email
	}

	if input.Password != "" && input.Password != client.Password {
		hashedPassword, err := service.HashPassword(input.Password)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		client.Password = hashedPassword
	}

	if err := database.DB.Updates(&client).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Profile Updated", "data": nil})
}

func DeleteClient(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var client model.Client
	if result := database.DB.Delete(&client, id); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "User deleted", "data": nil})

}

func GetClientOrder(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
		newOrders := make(chan entity.OrderClient)
		go listenForClientOrders(uint(id), newOrders)

		for {
			select {
			case order := <-newOrders:
				jsonData, _ := json.Marshal(order)
				fmt.Fprintf(w, "data: %s\n\n", jsonData)
				if err := w.Flush(); err != nil {
					fmt.Printf("Error while flushing: %v. Closing http connection.\n", err)
					return
				}
			case <-time.After(2 * time.Second):
				fmt.Fprintf(w, ":keep-alive\n\n")
				if err := w.Flush(); err != nil {
					fmt.Printf("Error while flushing: %v. Closing http connection.\n", err)
					return
				}
			}
		}
	}))

	return nil
}

func listenForClientOrders(clientID uint, newOrders chan<- entity.OrderClient) {
	var lastChecked time.Time

	for {
		time.Sleep(2 * time.Second)

		var orders []entity.OrderClient
		if err := database.DB.Model(&model.Order{}).
			Select("orders.id, orders.identification_code, orders.status, restaurants.name as restaurant_name").
			Joins("left join restaurants on restaurants.id = orders.restaurant_id").
			Where("orders.client_id = ? AND orders.created_at > ?", clientID, lastChecked).
			Order("orders.updated_at DESC").
			Find(&orders).Error; err != nil {
			log.Printf("Error querying new orders: %v", err)
			continue
		}

		for _, order := range orders {
			newOrders <- order
		}

		if len(orders) > 0 {
			lastChecked = time.Now()
		}
	}
}
