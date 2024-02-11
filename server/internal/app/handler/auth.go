package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"log"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func LoginAdmin(c *fiber.Ctx) error {
	input := new(entity.Auth)
	if err := c.BodyParser(&input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if !service.Valid(input.Email) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	user := new(model.Admin)
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	if !service.CheckPasswordHash(input.Password, user.Password) {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	token, err := service.GenerateJWT(user.Email, user.ID, string(entity.AdminType))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Success login", "data": token})
}

func LoginClient(c *fiber.Ctx) error {
	input := new(entity.Auth)
	if err := c.BodyParser(&input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if !service.Valid(input.Email) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	user := new(model.Client)
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	if !service.CheckPasswordHash(input.Password, user.Password) {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	token, err := service.GenerateJWT(user.Email, user.ID, string(entity.ClientType))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Success login", "data": token})
}

func LoginRestaurant(c *fiber.Ctx) error {
	input := new(entity.Auth)
	if err := c.BodyParser(&input); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if !service.Valid(input.Email) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	user := new(model.Restaurant)
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}

	if !service.CheckPasswordHash(input.Password, user.Password) {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	token, err := service.GenerateJWT(user.Email, user.ID, string(entity.RestaurantType))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "Success login", "data": token})
}

func RegisterAdmin(c *fiber.Ctx) error {
	user := new(model.Admin)
	if err := c.BodyParser(user); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if !service.Valid(user.Email) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var existingUser model.Admin
	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.SendStatus(fiber.StatusConflict)
	}

	password := service.GeneratePassword()
	hash, err := service.HashPassword(password)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	user.Password = hash

	if err := database.DB.Create(&user).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	token, err := service.GenerateJWT(user.Email, user.ID, string(entity.AdminType))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	to := user.Email
	subject := "Bienvenue sur Go Manger!"

	err = service.SendEmail(to, subject, password)
	if err != nil {
		log.Fatalf("Failed to send email: %v", err)
	}

	return c.JSON(fiber.Map{"message": "Admin created", "data": token})
}

func RegisterClient(c *fiber.Ctx) error {
	user := new(model.Client)
	if err := c.BodyParser(user); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if !service.Valid(user.Email) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var existingUser model.Client
	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.SendStatus(fiber.StatusConflict)
	}

	hash, err := service.HashPassword(user.Password)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	user.Password = hash

	if err := database.DB.Create(&user).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	token, err := service.GenerateJWT(user.Email, user.ID, string(entity.ClientType))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"message": "User created", "data": token})
}

func RegisterRestaurant(c *fiber.Ctx) error {
	user := new(entity.AddRestaurant)
	if err := c.BodyParser(user); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if !service.Valid(user.Email) {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	var existingUser model.Restaurant
	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.SendStatus(fiber.StatusConflict)
	}

	password := service.GeneratePassword()
	hash, err := service.HashPassword(password)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
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

	newUser := &model.Restaurant{
		Name:        user.Name,
		Description: user.Description,
		Image:       uniqueFileName,
		Email:       user.Email,
		Password:    hash,
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	to := newUser.Email
	subject := "Bienvenue sur Go Manger!"

	err = service.SendEmail(to, subject, password)
	if err != nil {
		log.Fatalf("Failed to send email: %v", err)
	}

	return c.JSON(fiber.Map{"message": "Restaurant created", "data": nil})
}
