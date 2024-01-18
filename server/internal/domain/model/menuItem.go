package model

import (
	"gorm.io/gorm"
)

type MenuItem struct {
	gorm.Model
	Name         string  `gorm:"not null" json:"name"`
	Description  string  `gorm:"not null" json:"description"`
	Image        string  `gorm:"not null" json:"image"`
	Price        float64 `gorm:"not null" json:"price"`
	RestaurantID uint    `gorm:"not null" json:"restaurantId"`
}
