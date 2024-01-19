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

func GetAllRestaurant(c *fiber.Ctx) error {
	db := database.DB
	var restaurants []model.Restaurant

	if result := db.Find(&restaurants); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Restaurants found", "data": &restaurants})
}

func AddRestaurant(c *fiber.Ctx) error {
	type NewRestaurant struct {
		Name string `json:"name"`
		Description string `json:"description"`
		Image string `json:"image"`
		Email string `json:"email"`
		Password string `json:"password"`
	}

	db := database.DB
	restaurant := new(NewRestaurant)
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
		Name: restaurant.Name,
		Description: restaurant.Description,
		Image: restaurant.Image,
		Email: restaurant.Email,
		Password: hash,
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
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID format", "data": nil})
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
	type NewUser struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	db := database.DB
	user := new(NewUser)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
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

func getRestaurantByEmail(e string) (*model.Restaurant, error) {
	db := database.DB
	var user model.Restaurant
	if err := db.Where(&model.Restaurant{Email: e}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func validRestaurant(id string, p string) bool {
	db := database.DB
	var user model.Restaurant
	db.First(&user, id)
	if user.Email == "" {
		return false
	}
	if !service.CheckPasswordHash(p, user.Password) {
		return false
	}
	return true
}
