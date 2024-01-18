package model

import (
	"gorm.io/gorm"
)

type MenuItemType string

const (
	MenuItemStarter MenuItemType = "starter"
	MenuItemDish    MenuItemType = "dish"
	MenuItemDessert MenuItemType = "dessert"
	MenuItemDrink   MenuItemType = "drink"
)

type MenuItem struct {
	gorm.Model
	Name         string       `gorm:"not null" json:"name"`
	Description  string       `gorm:"not null" json:"description"`
	Available    bool         `gorm:"not null" json:"available"`
	Type         MenuItemType `gorm:"type:varchar(20);check:status IN ('starter', 'dish', 'dessert', 'drink')" json:"type"`
	Price        float64      `gorm:"not null" json:"price"`
	RestaurantID uint         `gorm:"not null" json:"restaurantId"`
}
