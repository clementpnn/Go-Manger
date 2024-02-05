package router

import (
	"go-manger/internal/app/handler"
	"go-manger/internal/app/middleware"
	"go-manger/internal/domain/entity"

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
	register.Post("/restaurant", middleware.AuthMiddleware(string(entity.AdminType)), handler.RegisterRestaurant)
	register.Post("/admin", middleware.AuthMiddleware(string(entity.AdminType)), handler.RegisterAdmin)

	login := auth.Group("/login")
	login.Post("/client", handler.LoginClient)
	login.Post("/restaurant", handler.LoginRestaurant)
	login.Post("/admin", handler.LoginAdmin)

	client := api.Group("/client", middleware.AuthMiddleware(string(entity.ClientType)))
	client.Get("/", handler.GetClient)
	client.Post("/order/:id", handler.AddOrder) // TODO: supprimer restaurant id
	client.Get("/order/:id", handler.GetOrder)
	client.Put("/update", handler.ClientUpdate)
	client.Delete("/delete", handler.DeleteClient)

	admin := api.Group("/admin", middleware.AuthMiddleware(string(entity.AdminType)))
	admin.Get("/restaurant", handler.GetAllRestaurant)
	admin.Post("/restaurant", handler.RegisterRestaurant)
	admin.Put("/restaurant/:id", handler.UpdateRestaurant)
	admin.Delete("/restaurant/:id", handler.DeleteRestaurantAdmin)
	admin.Delete("/client/:id", handler.DeleteClientAdmin)
	admin.Get("/profile", handler.GetAdmin)
	admin.Put("/profile", handler.UpdateAdmin)
	admin.Get("/client", handler.GetAllClient)
	admin.Get("/client/:id", handler.GetClientAdmin)

	restaurant := api.Group("/restaurant", middleware.AuthMiddleware(string(entity.RestaurantType)))
	restaurant.Get("/me", handler.GetRestaurant)
	restaurant.Delete("/me", handler.DeleteRestaurant)
	restaurant.Get("/order", handler.GetRestaurantOrder)
	// // ? Mettre à jour le statut d'une commande.
	// restaurant.Put("/:id/order/:orderId") // TODO: créé handler
	restaurant.Post("/menu", handler.AddNewMenuItem)
	restaurant.Put("/menu/:id", handler.UpdateMenuItem)
	restaurant.Delete("/menu/:id", handler.DeleteMenuItem)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}
