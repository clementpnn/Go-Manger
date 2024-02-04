package main

import (
	"go-manger/internal/app/router"
	"go-manger/internal/infrastructure/database"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Database()
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept, Content-Length, Accept-Language, Cache-Control, Accept-Encoding, Connection, Access-Control-Allow-Origin, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	path := "./uploads/"
	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.MkdirAll(path, os.ModePerm)
	}

	app.Static("/uploads", "./uploads")

	router.SetupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
