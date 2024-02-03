package handler

import (
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"

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
