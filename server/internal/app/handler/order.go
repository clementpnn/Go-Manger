package handler

import (
	"go-manger/internal/domain/entity"
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

	code := service.GenerateCode()
	order.RestaurantID = uint(restaurantIDInt)
	order.ClientID = uint(userID)
	order.IdentificationCode = code

	if err := database.DB.Create(&order).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Impossible de créer la commande", "data": err})
	}

	return c.JSON(fiber.Map{"message": "Commande créée avec succès", "data": order})

}

func GetOrder(c *fiber.Ctx) error {
	orderID := c.Params("id")
	orderIDInt, err := strconv.Atoi(orderID)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "ID de commande invalide"})
	}

	var order model.Order
	if err := database.DB.Preload("OrderItems").
		First(&order, orderIDInt).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Commande non trouvée"})
	}

	var client model.Client
	if err := database.DB.First(&client, order.ClientID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Client non trouvée"})
	}

	orderResponse := entity.OrderResponse{
		ID:                 order.ID,
		IdentificationCode: order.IdentificationCode,
		Status:             order.Status,
		ClientName:         client.Name,
	}

	for _, item := range order.OrderItems {
		var items model.MenuItem
		if err := database.DB.First(&items, item.MenuItemID).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{"message": "Item non trouvée"})
		}
		orderItemResponse := entity.OrderItemResponse{
			Name:     items.Name,
			Quantity: item.Quantity,
		}
		orderResponse.OrderItems = append(orderResponse.OrderItems, orderItemResponse)
	}

	return c.JSON(fiber.Map{"message": "Commande trouvée", "data": orderResponse})
}
