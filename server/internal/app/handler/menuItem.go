package handler

import (
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func AddNewMenuItem(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't get user", "data": err})
	}

	input := new(model.MenuItem)
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on menu item request", "data": err})
	}

	newItem := &model.MenuItem{
		Name:         input.Name,
		Description:  input.Description,
		Available:    true,
		Type:         model.MenuItemType(input.Type),
		Price:        input.Price,
		RestaurantID: uint(id),
	}

	if result := database.DB.Create(&newItem); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create menu item", "data": err})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Menu item created", "data": nil})
}

func DeleteMenuItem(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID format", "data": nil})
	}

	var item model.MenuItem

	if result := database.DB.Delete(&item, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Menu item deleted", "data": nil})

}
