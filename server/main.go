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
		AllowOrigins:     "http://localhost:5173",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	database.Database()

	router.SetupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
