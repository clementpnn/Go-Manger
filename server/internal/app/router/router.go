package router

import (
	"go-manger/internal/app/handler"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())
	api.Get("/", handler.Hello)

	auth := api.Group("/auth")
	auth.Post("/login", handler.ClientLogin)

	client := api.Group("/client")
	client.Get("/:id", handler.GetClient)
	client.Post("/", handler.CreateClient)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}
