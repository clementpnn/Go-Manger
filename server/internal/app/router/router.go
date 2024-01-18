package router

import (
	"go-manger/internal/app/handler"
	"go-manger/internal/app/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())
	api.Get("/", handler.Hello)

	auth := api.Group("/auth")
	auth.Post("/clientLogin", handler.ClientLogin)
	auth.Post("/clientCreate", handler.CreateClient)

	client := api.Group("/client", middleware.AuthMiddleware("client"))
	client.Get("/:id", handler.GetClient)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}
