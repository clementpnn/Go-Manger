package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"strconv"

	"github.com/gofiber/fiber/v2"
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
	var clinet []model.Client
	if result := database.DB.Find(&clinet); result.Error != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	response := make([]entity.Client, len(clinet))
	for i, r := range clinet {
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

	var orders []entity.Order
	if result := database.DB.Model(&model.Order{}).
		Select("orders.id, orders.identification_code, orders.status, restaurants.name as restaurant_name, orders.restaurant_id").
		Joins("left join restaurants on restaurants.id = orders.restaurant_id").
		Where("orders.client_id = ?", id).
		Find(&orders).Error; result != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	return c.JSON(fiber.Map{"message": "Client's found", "data": fiber.Map{"id": client.ID, "name": client.Name, "email": client.Email, "order": orders}})
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
