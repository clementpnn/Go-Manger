package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
	"github.com/golang-jwt/jwt/v4"
)

func AuthMiddleware(allowedRoles ...string) fiber.Handler {
	validateJWT := jwtware.New(jwtware.Config{
		SigningKey:   []byte(os.Getenv("SECRET")),
		ErrorHandler: jwtError,
	})

	checkRole := func(c *fiber.Ctx) error {
		user := c.Locals("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		role := claims["role"].(string)

		for _, allowedRole := range allowedRoles {
			if role == allowedRole {
				return c.Next()
			}
		}

		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":  "error",
			"message": "Accès non autorisé pour le rôle de l'utilisateur",
		})
	}

	return func(c *fiber.Ctx) error {
		err := validateJWT(c)
		if err != nil {
			return err
		}

		return checkRole(c)
	}
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Missing or malformed JWT",
		})
	}
	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"status":  "error",
		"message": "Invalid or expired JWT",
	})
}
