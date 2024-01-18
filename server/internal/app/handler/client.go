package handler

import (
	"errors"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetClient(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID format", "data": nil})
	}

	db := database.DB
	var user model.Client

	if result := db.First(&user, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	if user.Email == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with ID", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

func CreateClient(c *fiber.Ctx) error {
	type NewUser struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	db := database.DB
	user := new(NewUser)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	var existingUser model.Client
	if err := db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
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

	if err := db.Create(&newUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	token, err := service.GenerateJWT(newUser.Email, newUser.ID)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User successfully created", "data": token})
}

func getClientByEmail(e string) (*model.Client, error) {
	db := database.DB
	var user model.Client
	if err := db.Where(&model.Client{Email: e}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func validClient(id string, p string) bool {
	db := database.DB
	var user model.Client
	db.First(&user, id)
	if user.Email == "" {
		return false
	}
	if !service.CheckPasswordHash(p, user.Password) {
		return false
	}
	return true
}
