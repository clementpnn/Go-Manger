package database

import (
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
)

func SeedRestaurants() {
	var count int64
	DB.Model(&model.Restaurant{}).Count(&count)

	if count == 0 {
		restaurants := []model.Restaurant{
			{
				Name:        "Restaurant 1",
				Description: "Description for Restaurant 1",
				Image:       "image-url-1",
				Email:       "contact@restaurant1.com",
				Password:    "password1",
				MenuItems: []model.MenuItem{
					{
						Name:         "Starter 1",
						Description:  "Description for Starter 1",
						Available:    true,
						Type:         model.MenuItemStarter,
						Price:        10.5,
						RestaurantID: 1,
					},
					{
						Name:         "Dish 1",
						Description:  "Description for Dish 1",
						Available:    true,
						Type:         model.MenuItemDish,
						Price:        15.5,
						RestaurantID: 1,
					},
					{
						Name:         "Dessert 1",
						Description:  "Description for Dessert 1",
						Available:    true,
						Type:         model.MenuItemDessert,
						Price:        5.5,
						RestaurantID: 1,
					},
					{
						Name:         "Drink 1",
						Description:  "Description for Drink 1",
						Available:    true,
						Type:         model.MenuItemDrink,
						Price:        2.5,
						RestaurantID: 1,
					},
				},
			},
			{
				Name:        "Restaurant 2",
				Description: "Description for Restaurant 2",
				Image:       "image-url-2",
				Email:       "contact@restaurant2.com",
				Password:    "password2",
				MenuItems: []model.MenuItem{
					{
						Name:         "Starter 2",
						Description:  "Description for Starter 2",
						Available:    true,
						Type:         model.MenuItemStarter,
						Price:        10.5,
						RestaurantID: 2,
					},
					{
						Name:         "Dish 2",
						Description:  "Description for Dish 2",
						Available:    true,
						Type:         model.MenuItemDish,
						Price:        15.5,
						RestaurantID: 2,
					},
					{
						Name:         "Dessert 2",
						Description:  "Description for Dessert 2",
						Available:    true,
						Type:         model.MenuItemDessert,
						Price:        5.5,
						RestaurantID: 2,
					},
					{
						Name:         "Drink 2",
						Description:  "Description for Drink 2",
						Available:    true,
						Type:         model.MenuItemDrink,
						Price:        2.5,
						RestaurantID: 2,
					},
				},
			},
		}

		for _, restaurant := range restaurants {
			hashedPassword, _ := service.HashPassword(restaurant.Password)

			restaurant.Password = string(hashedPassword)
			DB.Create(&restaurant)
		}
	}
}
