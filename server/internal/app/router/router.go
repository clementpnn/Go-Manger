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
	client.Post("/order/:id", handler.AddOrder)
	client.Get("/order", handler.GetClientOrder)
	client.Get("/order/:id", handler.GetOrder)
	client.Put("/update", handler.ClientUpdate)
	client.Delete("/delete", handler.DeleteClient)

	admin := api.Group("/admin", middleware.AuthMiddleware(string(entity.AdminType)))
	admin.Get(("/order"), handler.GetRestaurantsOrders)
	admin.Get(("/order/:id"), handler.GetOrder)
	admin.Get("/restaurant", handler.GetAllRestaurant)
	admin.Post("/restaurant", handler.RegisterRestaurant)
	admin.Put("/restaurant/:id", handler.UpdateRestaurantById)
	admin.Delete("/restaurant/:id", handler.DeleteRestaurantAdmin)
	admin.Delete("/client/:id", handler.DeleteClientAdmin)
	admin.Get("/profile", handler.GetAdmin)
	admin.Put("/profile", handler.UpdateAdmin)
	admin.Get("/client", handler.GetAllClient)
	admin.Get("/client/:id", handler.GetClientAdmin)
	admin.Get("/client/order/:id", handler.GetClientAdminOrder)
	admin.Put("/client/:id", handler.ClientUpdateAdmin)
	admin.Put("/client/order/:id", handler.UpdateOrderRestaurant)

	restaurant := api.Group("/restaurant", middleware.AuthMiddleware(string(entity.RestaurantType)))
	restaurant.Get("/me", handler.GetRestaurant)
	restaurant.Put("/me/update", handler.UpdateRestaurant)
	restaurant.Delete("/me", handler.DeleteRestaurant)
	restaurant.Get("/order", handler.GetRestaurantOrder)
	restaurant.Get("/order/:id", handler.GetOrder)
	restaurant.Put("/order/:id", handler.UpdateOrderRestaurant)
	restaurant.Get("/menu", handler.GetMenuItemByRestaurant)
	restaurant.Post("/menu/add", handler.AddNewMenuItem)
	restaurant.Put("/menu/:id", handler.UpdateMenuItem)
	restaurant.Delete("/menu/:id", handler.DeleteMenuItem)

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})
}
