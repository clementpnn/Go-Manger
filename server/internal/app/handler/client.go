package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetClient(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't get user", "data": err})
	}

	var user model.Client

	if result := database.DB.Where("deleted_at IS NULL").Find(&user, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	response := entity.Client{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": response})
}

func RegisterClient(c *fiber.Ctx) error {
	user := new(entity.Auth)

	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	if !service.Valid(user.Email) {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid email", "data": nil})
	}

	var existingUser model.Client

	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Email already exists", "data": nil})
	}

	hash, err := service.HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	newUser := &model.Client{
		Email:    user.Email,
		Password: hash,
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	token, err := service.GenerateJWT(newUser.Email, newUser.ID, "client")
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User successfully created", "data": token})
}

func getClientByEmail(email string) (*model.Client, error) {
	db := database.DB
	var client model.Client
	err := db.Where("email = ?", email).First(&client).Error
	if err != nil {
		return nil, err
	}
	return &client, nil
}

func DeleteOrder(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.JSON(fiber.Map{"status": "error", "message": "Invalid ID format", "data": nil})
	}

	var order model.Order

	if result := database.DB.Delete(&order, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Order deleted", "data": nil})

}

func UpdateClient(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't get user", "data": err})
	}
	client_input := new(model.Client)

	if err := c.BodyParser(client_input); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	var client model.Client

	hash, err := service.HashPassword(client_input.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	database.DB.First(&client, id)

	if client_input.Name != client.Name {
		client.Name = client_input.Name
	}

	if client_input.Email != client.Email {
		client.Email = client_input.Email
	}

	if client_input.Password != client.Password {
		client.Password = hash
	}

	database.DB.Updates(&client)

	return c.JSON(fiber.Map{"status": "success", "message": "Your client profile is updated", "data": nil})
}
