package entity

import "go-manger/internal/domain/model"

type Restaurant struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

type RestaurantMenuItem struct {
	ID          uint               `json:"id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Price       float64            `json:"price"`
	Available   bool               `json:"available"`
	Type        model.MenuItemType `json:"type"`
}

type RestaurantWithMenu struct {
	ID          uint                 `json:"id"`
	Name        string               `json:"name"`
	Description string               `json:"description"`
	Image       string               `json:"image"`
	MenuItems   []RestaurantMenuItem `json:"menuItems"`
}
