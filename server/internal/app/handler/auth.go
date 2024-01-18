package handler

import (
	"go-manger/internal/domain/entity"
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"

	"github.com/gofiber/fiber/v2"
)

func ClientLogin(c *fiber.Ctx) error {
	input := new(entity.Auth)
	var ud entity.User

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	identity := input.Identity
	pass := input.Password
	user, email, err := new(model.Client), new(model.Client), *new(error)

	if service.Valid(identity) {
		email, err = getClientByEmail(identity)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Error on email", "data": err})
		}
	}

	if email == nil && user == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "User not found", "data": err})
	}

	if email != nil {
		ud = entity.User{
			ID:       email.ID,
			Email:    email.Email,
			Password: email.Password,
		}

	}

	if user != nil {
		ud = entity.User{
			ID:       user.ID,
			Email:    user.Email,
			Password: user.Password,
		}
	}

	if !service.CheckPasswordHash(pass, ud.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid password", "data": nil})
	}

	token, err := service.GenerateJWT(ud.Email, ud.ID)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Success login", "data": token})
}

func RestaurantLogin(c *fiber.Ctx) error {
	input := new(entity.Auth)
	var ud entity.User

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	identity := input.Identity
	pass := input.Password
	user, email, err := new(model.Restaurant), new(model.Restaurant), *new(error)

	if service.Valid(identity) {
		email, err = getRestaurantByEmail(identity)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Error on email", "data": err})
		}
	}

	if email == nil && user == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "User not found", "data": err})
	}

	if email != nil {
		ud = entity.User{
			ID:       email.ID,
			Email:    email.Email,
			Password: email.Password,
		}

	}

	if user != nil {
		ud = entity.User{
			ID:       user.ID,
			Email:    user.Email,
			Password: user.Password,
		}
	}

	if !service.CheckPasswordHash(pass, ud.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid password", "data": nil})
	}

	token, err := service.GenerateJWT(ud.Email, ud.ID)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Success login", "data": token})
}

func AdminLogin(c *fiber.Ctx) error {
	input := new(entity.Auth)
	var ud entity.User

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	identity := input.Identity
	pass := input.Password
	user, email, err := new(model.Admin), new(model.Admin), *new(error)

	if service.Valid(identity) {
		email, err = getAdminByEmail(identity)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Error on email", "data": err})
		}
	}

	if email == nil && user == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "User not found", "data": err})
	}

	if email != nil {
		ud = entity.User{
			ID:       email.ID,
			Email:    email.Email,
			Password: email.Password,
		}

	}

	if user != nil {
		ud = entity.User{
			ID:       user.ID,
			Email:    user.Email,
			Password: user.Password,
		}
	}

	if !service.CheckPasswordHash(pass, ud.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid password", "data": nil})
	}

	token, err := service.GenerateJWT(ud.Email, ud.ID)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Success login", "data": token})
}
