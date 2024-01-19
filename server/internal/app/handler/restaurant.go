package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"

	"github.com/gofiber/fiber/v2"
)

func GetAllRestaurant(c *fiber.Ctx) error {
	db := database.DB
	var restaurants []model.Restaurant

	if result := db.Find(&restaurants); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Restaurants found", "data": &restaurants})
}

func AddRestaurant(c *fiber.Ctx) error {
	db := database.DB
	restaurant := new(model.Restaurant)
	if err := c.BodyParser(restaurant); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	var existingRestaurant model.Restaurant
	if err := db.Where("name = ?", restaurant.Name).First(&existingRestaurant).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Restaurant already exists", "data": nil})
	}

	hash, err := service.HashPassword(restaurant.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	newRestaurant := &model.Restaurant{
		Name:        restaurant.Name,
		Description: restaurant.Description,
		Image:       restaurant.Image,
		Email:       restaurant.Email,
		Password:    hash,
	}

	if err := db.Create(&newRestaurant).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	token, err := service.GenerateJWT(newRestaurant.Email, newRestaurant.ID, "restaurant")
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Restaurant successfully created", "data": token})
}

func GetRestaurant(c *fiber.Ctx) error {
	id, err := service.GetUserIDFromJWT(c)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't get user", "data": err})
	}

	db := database.DB
	var user model.Restaurant

	if result := db.First(&user, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	if user.Email == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with ID", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

func RegisterRestaurant(c *fiber.Ctx) error {
	db := database.DB
	user := new(entity.Auth)

	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	if !service.Valid(user.Email) {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid email", "data": nil})
	}

	var existingUser model.Restaurant

	if err := db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Email already exists", "data": nil})
	}

	hash, err := service.HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	newUser := &model.Restaurant{
		Email:    user.Email,
		Password: hash,
	}

	if err := db.Create(&newUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	token, err := service.GenerateJWT(newUser.Email, newUser.ID, "restaurant")
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User successfully created", "data": token})
}

func getRestaurantByEmail(email string) (*model.Restaurant, error) {
	db := database.DB
	var restaurant model.Restaurant
	err := db.Where("email = ?", email).First(&restaurant).Error
	if err != nil {
		return nil, err
	}
	return &restaurant, nil
}
