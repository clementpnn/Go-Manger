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
		return c.Status(500).JSON(fiber.Map{"message": "Couldn't get user", "data": err})
	}

	input := new(model.MenuItem)
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error on menu item request", "data": err})
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
		return c.Status(500).JSON(fiber.Map{"message": "Couldn't create menu item", "data": err})
	}

	return c.JSON(fiber.Map{"message": "Menu item created", "data": nil})
}

func DeleteMenuItem(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid ID format", "data": nil})
	}

	var item model.MenuItem

	if result := database.DB.Delete(&item, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"message": "Menu item deleted", "data": nil})

}

func UpdateMenuItem(c *fiber.Ctx) error {
	id := c.Params("id")
	menuItempInput := new(model.MenuItem)

	if err := c.BodyParser(menuItempInput); err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Review your input", "data": err})
	}

	var menuItem model.MenuItem
	if result := database.DB.First(&menuItem, id); result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Menu item not found", "data": result.Error})
	}

	if menuItempInput.Name != menuItem.Name {
		menuItem.Name = menuItempInput.Name
	}

	if menuItempInput.Description != menuItem.Description {
		menuItem.Description = menuItempInput.Description
	}

	if menuItempInput.Available != menuItem.Available {
		menuItem.Available = menuItempInput.Available
	}

	if menuItempInput.Type != menuItem.Type {
		menuItem.Type = menuItempInput.Type
	}

	if menuItempInput.Price != menuItem.Price {
		menuItem.Price = menuItempInput.Price
	}

	database.DB.Updates(&menuItem)

	return c.JSON(fiber.Map{"message": "Menu item updated", "data": nil})
}
