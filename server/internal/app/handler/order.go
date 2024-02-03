package handler

import (
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func AddOrder(c *fiber.Ctx) error {
	restaurantID := c.Params("id")
	userID, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Impossible de récupérer l'ID de l'utilisateur à partir du JWT", "data": err})
	}

	order := new(model.Order)
	if err := c.BodyParser(order); err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Vérifiez votre entrée", "data": err})
	}

	restaurantIDInt, err := strconv.Atoi(restaurantID)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "ID de restaurant invalide", "data": nil})
	}
	order.RestaurantID = uint(restaurantIDInt)
	order.ClientID = uint(userID)

	if err := database.DB.Create(&order).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Impossible de créer la commande", "data": err})
	}

	return c.JSON(fiber.Map{"message": "Commande créée avec succès", "data": order})

}

func GetOrder(c *fiber.Ctx) error {
	orderID := c.Params("id")

	orderIDInt, err := strconv.Atoi(orderID)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "ID de commande invalide", "data": nil})
	}

	order := model.Order{}
	if result := database.DB.Preload("OrderItems").First(&order, orderIDInt); result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Commande non trouvée", "data": nil})
	}

	return c.JSON(fiber.Map{"message": "Commande trouvée", "data": order})
}
