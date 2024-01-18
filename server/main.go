package main

import (
	"go-manger/internal/app/router"
	"go-manger/internal/infrastructure/database"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	database.Database()

	router.SetupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
