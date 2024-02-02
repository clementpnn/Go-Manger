package entity

import (
	"go-manger/internal/domain/model"
	"mime/multipart"
)

type Restaurant struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

type AddRestaurant struct {
	Name        string                `json:"name"`
	Email       string                `json:"email"`
	Description string                `json:"description"`
	Image       *multipart.FileHeader `json:"image"`
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
