package router

import (
	"go-manger/internal/app/handler"
	"go-manger/internal/app/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())
	api.Get("/hello", handler.Hello)
	api.Get("/home", handler.GetAllRestaurant)
	api.Get("/search/:id", handler.GetRestaurantMenu)

	auth := api.Group("/auth")

	register := auth.Group("/register")
	register.Post("/client", handler.RegisterClient)
	register.Post("/restaurant", middleware.AuthMiddleware("admin"), handler.RegisterRestaurant)
	register.Post("/admin", middleware.AuthMiddleware("admin"), handler.RegisterAdmin)

	login := auth.Group("/login")
	// vérifier si le user n'est pas supprimé
	login.Post("/client", handler.LoginClient)
	login.Post("/restaurant", handler.LoginRestaurant)
	login.Post("/admin", handler.LoginAdmin)

	client := api.Group("/client", middleware.AuthMiddleware("client"))
	client.Get("/", handler.GetClient)
	client.Post("/order/:id", handler.AddOrder) // TODO: supprimer restaurant id
	client.Get("/order/:id", handler.GetOrder)
	// // ? Modifier une commande.
	// client.Put("/order/:id") // TODO: créé handler
	// client.Delete("/order/:id", handler.DeleteOrder) // TODO: à supprimer

	admin := api.Group("/admin", middleware.AuthMiddleware("admin"))
	admin.Get("/restaurant", handler.GetAllRestaurant)
	admin.Post("/restaurant", handler.AddRestaurant)
	admin.Put("/restaurant/:id", handler.UpdateRestaurant)
	admin.Delete("/restaurant/:id", handler.DeleteRestaurant)

	restaurant := api.Group("/restaurant", middleware.AuthMiddleware("restaurant"))
	restaurant.Get("/me", handler.GetRestaurant)
	// // ? Lister toutes les commandes pour un restaurant.
	// restaurant.Get("/:id/order") // TODO: créé handler (SSE ou WebSockets)
	// // ? Mettre à jour le statut d'une commande.
	// restaurant.Put("/:id/order/:orderId") // TODO: créé handler
	restaurant.Post("/menu", handler.AddNewMenuItem)
	restaurant.Put("/menu/:id", handler.UpdateMenuItem)
	restaurant.Delete("/menu/:id", handler.DeleteMenuItem)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}
