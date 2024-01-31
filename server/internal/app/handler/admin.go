package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"

	"github.com/gofiber/fiber/v2"
)

func GetAdmin(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't get user", "data": err})
	}

	var user model.Admin

	if result := database.DB.First(&user, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	response := entity.AdminProfile{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}

	if user.Email == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with ID", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": response})
}

func RegisterAdmin(c *fiber.Ctx) error {
	user := new(entity.Auth)

	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	if !service.Valid(user.Email) {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid email", "data": nil})
	}

	var existingUser model.Admin

	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Email already exists", "data": nil})
	}

	hash, err := service.HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	newUser := &model.Admin{
		Email:    user.Email,
		Password: hash,
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	token, err := service.GenerateJWT(newUser.Email, newUser.ID, "admin")
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User successfully created", "data": token})
}

func getAdminByEmail(email string) (*model.Admin, error) {
	var admin model.Admin
	err := database.DB.Where("email = ?", email).First(&admin).Error
	if err != nil {
		return nil, err
	}
	return &admin, nil
}

func UpdateAdmin(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't get user", "data": err})
	}
	admin_input := new(model.Admin)

	if err := c.BodyParser(admin_input); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	var admin model.Admin
	database.DB.First(&admin, id)

	if admin_input.Name != admin.Name {
		admin.Name = admin_input.Name
	}

	if admin_input.Email != admin.Email {
		admin.Email = admin_input.Email
	}

	if admin_input.Password != admin.Password {
		admin.Password = admin_input.Password
	}

	database.DB.Updates(&admin)

	return c.JSON(fiber.Map{"status": "success", "message": "Your admin profile is updated", "data": nil})
}
