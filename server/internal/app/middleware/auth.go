package middleware

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func AuthMiddleware(allowedRoles ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenString := c.Get("Authorization")
		if tokenString == "" {
			tokenString = "Bearer " + c.Query("token")
		}

		token, err := validateToken(tokenString)
		if err != nil {

			return c.SendStatus(fiber.StatusUnauthorized)
		}

		c.Locals("user", token)
		claims := token.Claims.(jwt.MapClaims)
		role := claims["role"].(string)

		for _, allowedRole := range allowedRoles {
			if role == allowedRole {
				return c.Next()
			}
		}

		return c.SendStatus(fiber.StatusUnauthorized)
	}
}

func validateToken(tokenString string) (*jwt.Token, error) {
	splitToken := strings.Split(tokenString, "Bearer ")
	if len(splitToken) == 2 {
		tokenString = strings.TrimSpace(splitToken[1])
	} else {
		return nil, fmt.Errorf("mauvais format de jeton")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("méthode de signature JWT inattendue: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}
