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
	// // ? Lister tous les restaurants disponibles dans le food-court.
	// api.Get("/restaurant") // TODO: créé handler
	// // ? Voir le menu d’un restaurant.
	// api.Get("/restaurant/:id/menu") // TODO: créé handler

	auth := api.Group("/auth")

	register := auth.Group("/register")
	register.Post("/client", handler.RegisterClient)
	register.Post("/restaurant", middleware.AuthMiddleware("admin"), handler.RegisterRestaurant)
	register.Post("/admin", middleware.AuthMiddleware("admin"), handler.RegisterAdmin)

	login := auth.Group("/login")
	login.Post("/client", handler.LoginClient)
	login.Post("/restaurant", handler.LoginRestaurant)
	login.Post("/admin", handler.LoginAdmin)

	client := api.Group("/client", middleware.AuthMiddleware("client"))
	client.Get("/", handler.GetClient)
	// // ? Lister les commandes d'un client.
	// client.Get("/order") // TODO: créé handler
	// // ? Créer une commande.
	// client.Post("/order") // TODO: créé handler
	// // ? Voir une commande.
	// client.Get("/order/:id") // TODO: créé handler
	// // ? Modifier une commande.
	// client.Put("/order/:id") // TODO: créé handler
	// // ? Supprimer une commande.
	// client.Delete("/order/:id") // TODO: créé handler

	admin := api.Group("/admin", middleware.AuthMiddleware("admin"))
	admin.Get("/restaurant", handler.GetAllRestaurant)
	admin.Post("/restaurant", handler.AddRestaurant)
	admin.Put("/restaurant/:id", handler.UpdateRestaurant)
	admin.Delete("/restaurant/:id", handler.DeleteRestaurant)

	restaurant := api.Group("/restaurant", middleware.AuthMiddleware("restaurant"))
	restaurant.Get("/", handler.GetRestaurant)
	// // ? Lister toutes les commandes pour un restaurant.
	// restaurant.Get("/:id/order") // TODO: créé handler (SSE ou WebSockets)
	// // ? Mettre à jour le statut d'une commande.
	// restaurant.Put("/:id/order/:orderId") // TODO: créé handler
	// // ? Ajouter des items au menu.
	// restaurant.Post("/:id/menu") // TODO: créé handler
	// // ? Modifier un item du menu.
	// restaurant.Put("/:id/menu/:itemId") // TODO: créé handler
	// // ? Supprimer un item du menu.
	// restaurant.Delete("/:id/menu/:itemId") // TODO: créé handler

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}
