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

func GetAllRestaurant(c *fiber.Ctx) error {
	var restaurants []model.Restaurant
	if result := database.DB.Find(&restaurants); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	response := make([]entity.Restaurant, len(restaurants))
	for i, r := range restaurants {
		response[i] = entity.Restaurant{
			ID:          r.ID,
			Name:        r.Name,
			Description: r.Description,
			Image:       r.Image,
		}
	}

	return c.JSON(fiber.Map{"message": "Restaurants Found", "data": response})
}

func GetRestaurant(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	var user model.Restaurant
	if result := database.DB.Find(&user, id); result.Error != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(fiber.Map{"message": "Restaurant found", "data": fiber.Map{"id": user.ID, "name": user.Name, "description": user.Description, "image": user.Image}})
}

func DeleteRestaurant(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var restaurant model.Restaurant
	if result := database.DB.Delete(&restaurant, id); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Restaurant deleted", "data": nil})

}

func UpdateRestaurant(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
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

func GetRestaurantMenu(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var restaurant model.Restaurant
	if result := database.DB.Preload("MenuItems").Where("id = ?", id).First(&restaurant).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	menuItems := make([]entity.RestaurantMenuItem, len(restaurant.MenuItems))
	for i, r := range restaurant.MenuItems {
		menuItems[i] = entity.RestaurantMenuItem{
			ID:          r.ID,
			Name:        r.Name,
			Description: r.Description,
			Price:       r.Price,
			Available:   r.Available,
			Type:        r.Type,
		}
	}

	return c.JSON(fiber.Map{"message": "Restaurant's menu found", "data": fiber.Map{"id": restaurant.ID, "name": restaurant.Name, "description": restaurant.Description, "image": restaurant.Image, "menuItems": menuItems}})
}

func GetRestaurantOrder(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
		for {
			time.Sleep(2 * time.Second)
			var orders []entity.OrderData
			if err := database.DB.Model(&model.Order{}).
				Select("orders.id, orders.identification_code, orders.status, clients.name as client_name").
				Joins("left join clients on clients.id = orders.client_id").
				Where("orders.restaurant_id = ?", id).
				Order("orders.updated_at DESC").
				Find(&orders).Error; err != nil {
				log.Printf("Error querying orders for restaurant %d: %v", int(id), err)

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

func UpdateOrderRestaurant(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := strconv.Atoi(id); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	input := new(model.OrderStatus)
	if err := c.BodyParser(input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var order model.Order
	if result := database.DB.First(&order, id).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	order.Status = *input
	if err := database.DB.Updates(&order).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Order update", "data": nil})
}
