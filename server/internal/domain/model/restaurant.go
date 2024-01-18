package model

import (
	"gorm.io/gorm"
)

type Restaurant struct {
	gorm.Model
	Name        string     `gorm:"not null" json:"name"`
	Description string     `gorm:"not null" json:"description"`
	Image       string     `gorm:"not null" json:"image"`
	Email       string     `gorm:"uniqueIndex" json:"email"`
	Password    string     `gorm:"not null" json:"password"`
	MenuItems   []MenuItem `gorm:"foreignKey:RestaurantID" json:"menuItems"`
}
