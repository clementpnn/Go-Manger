package service

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func GetUserIDFromJWT(c *fiber.Ctx) (float64, error) {
	user := c.Locals("user")
	token := user.(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	userID := claims["user_id"].(float64)

	return userID, nil
}
