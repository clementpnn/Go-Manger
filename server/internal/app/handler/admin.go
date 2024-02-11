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
	"path/filepath"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
)

func GetAdmin(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	var user model.Admin
	if result := database.DB.First(&user, id); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "User found", "data": fiber.Map{"id": user.ID, "name": user.Name, "email": user.Email}})
}

func UpdateAdmin(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	input := new(model.Admin)
	if err := c.BodyParser(input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var admin model.Admin
	if result := database.DB.First(&admin, id).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	if input.Name != "" && input.Name != admin.Name {
		admin.Name = input.Name
	}

	if input.Email != "" && input.Email != admin.Email {
		admin.Email = input.Email
	}

	if input.Password != "" && input.Password != admin.Password {
		hashedPassword, err := service.HashPassword(input.Password)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		admin.Password = hashedPassword
	}

	if err := database.DB.Updates(&admin).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Profile updated", "data": nil})
}

func GetAllClient(c *fiber.Ctx) error {
	var client []model.Client
	if result := database.DB.Find(&client); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	response := make([]entity.Client, len(client))
	for i, r := range client {
		response[i] = entity.Client{
			ID:    r.ID,
			Name:  r.Name,
			Email: r.Email,
		}
	}

	return c.JSON(fiber.Map{"message": "Clients Found", "data": response})
}

func GetClientAdmin(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var client model.Client
	if result := database.DB.Where("id = ?", id).First(&client).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(fiber.Map{"message": "Client's found", "data": fiber.Map{"id": client.ID, "name": client.Name, "email": client.Email}})
}

func DeleteRestaurantAdmin(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var restaurant model.Restaurant
	if result := database.DB.Delete(&restaurant, id); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Restaurant deleted", "data": nil})

}

func DeleteClientAdmin(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var client model.Client
	if result := database.DB.Delete(&client, id); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "User deleted", "data": nil})

}

func ClientUpdateAdmin(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
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

	return c.JSON(fiber.Map{"message": "User Updated", "data": nil})
}

func GetRestaurantsOrders(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
		for {
			time.Sleep(2 * time.Second)
			var orders []entity.Order
			if err := database.DB.Model(&model.Order{}).
				Select("orders.id, orders.identification_code, orders.status, clients.name as client_name, restaurants.name as restaurant_name").
				Joins("left join clients on clients.id = orders.client_id").
				Joins("left join restaurants on restaurants.id = orders.restaurant_id").
				Order("orders.updated_at DESC").
				Find(&orders).Error; err != nil {
				log.Printf("Error querying orders: %v", err)
			}

			jsonData, _ := json.Marshal(orders)
			fmt.Fprintf(w, "data: %s\n\n", jsonData)
			if err := w.Flush(); err != nil {
				fmt.Printf("Error while flushing: %v. Closing http connection.\n", err)
				return
			}
		}
	}))

	return nil
}

func UpdateRestaurantById(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid ID format", "data": nil})
	}

	input := new(model.Restaurant)
	if err := c.BodyParser(input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var restaurant model.Restaurant
	if result := database.DB.First(&restaurant, id).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	if input.Email != "" && input.Email != restaurant.Email {
		restaurant.Email = input.Email
	}

	if input.Name != "" && input.Name != restaurant.Name {
		restaurant.Name = input.Name
	}

	if input.Password != "" && input.Password != restaurant.Password {
		hashedPassword, err := service.HashPassword(input.Password)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		restaurant.Password = hashedPassword
	}

	if input.Description != "" && input.Description != restaurant.Description {
		restaurant.Description = input.Description
	}

	file, err := c.FormFile("image")
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	extension := filepath.Ext(file.Filename)
	uniqueFileName := uuid.New().String() + extension

	err = c.SaveFile(file, "../../../uploads/"+uniqueFileName)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if input.Image != restaurant.Image {
		restaurant.Image = uniqueFileName
	}

	if err := database.DB.Updates(&restaurant).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Restaurant updated", "data": nil})
}

func GetClientAdminOrder(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid ID format", "data": nil})
	}

	uintID, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		fmt.Println("Erreur lors de la conversion de l'ID:", err)
		return c.SendStatus(fiber.StatusBadRequest)
	}

	c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
		for {
			time.Sleep(2 * time.Second)
			var orders []entity.OrderClient
			if err := database.DB.Model(&model.Order{}).
				Select("orders.id, orders.identification_code, orders.status, restaurants.name as restaurant_name").
				Joins("left join restaurants on restaurants.id = orders.restaurant_id").
				Where("orders.client_id = ?", uintID).
				Order("orders.updated_at DESC").
				Find(&orders).Error; err != nil {
				log.Printf("Error querying orders for client %d: %v", uintID, err)
			}

			jsonData, _ := json.Marshal(orders)
			fmt.Fprintf(w, "data: %s\n\n", jsonData)
			if err := w.Flush(); err != nil {
				fmt.Printf("Error while flushing: %v. Closing http connection.\n", err)
				return
			}

		}
	}))

	return nil
}
