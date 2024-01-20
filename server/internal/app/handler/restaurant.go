package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
	"go-manger/internal/infrastructure/database"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllRestaurant(c *fiber.Ctx) error {
	var restaurants []model.Restaurant

	if result := database.DB.Select("id", "name", "description", "image").Where("deleted_at IS NULL").Find(&restaurants); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "Success", "message": "Restaurants Found", "data": &restaurants})
}

func AddRestaurant(c *fiber.Ctx) error {
	restaurant := new(model.Restaurant)
	if err := c.BodyParser(restaurant); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	var existingRestaurant model.Restaurant
	if err := database.DB.Where("name = ?", restaurant.Name).First(&existingRestaurant).Error; err == nil {
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

	if err := database.DB.Create(&newRestaurant).Error; err != nil {
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

	var user model.Restaurant

	if result := database.DB.First(&user, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}

func RegisterRestaurant(c *fiber.Ctx) error {
	user := new(entity.Auth)

	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	if !service.Valid(user.Email) {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid email", "data": nil})
	}

	var existingUser model.Restaurant

	if err := database.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
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

	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

	token, err := service.GenerateJWT(newUser.Email, newUser.ID, "restaurant")
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "User successfully created", "data": token})
}

func getRestaurantByEmail(email string) (*model.Restaurant, error) {
	var restaurant model.Restaurant
	err := database.DB.Where("email = ?", email).First(&restaurant).Error
	if err != nil {
		return nil, err
	}
	return &restaurant, nil
}

func DeleteRestaurant(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID format", "data": nil})
	}

	var restaurant model.Restaurant

	if result := database.DB.Delete(&restaurant, id); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Restaurant deleted", "data": nil})

}

func UpdateRestaurant(c *fiber.Ctx) error {
	id := c.Params("id")
	restaurant_input := new(model.Restaurant)

	if err := c.BodyParser(restaurant_input); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	var restaurant model.Restaurant
	database.DB.First(&restaurant, id)

	if restaurant_input.Name != restaurant.Name {
		restaurant.Name = restaurant_input.Name
	}

	if restaurant_input.Description != restaurant.Description {
		restaurant.Description = restaurant_input.Description
	}

	if restaurant_input.Image != restaurant.Image {
		restaurant.Image = restaurant_input.Image
	}

	database.DB.Updates(&restaurant)

	return c.JSON(fiber.Map{"status": "success", "message": "Restaurant updated", "data": nil})
}

func GetRestaurantMenu(c *fiber.Ctx) error {
	id := c.Params("id")

	if _, err := strconv.Atoi(id); err != nil {
		return c.JSON(fiber.Map{"status": "error", "message": "Invalid ID format", "data": nil})
	}

	var restaurantMenu []model.MenuItem

	if result := database.DB.Where("restaurant_Id = ?", id).Find(&restaurantMenu); result.Error != nil {
		return c.JSON(fiber.Map{"status": "error", "message": result.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Restaurant's menu found", "data": &restaurantMenu})
}
