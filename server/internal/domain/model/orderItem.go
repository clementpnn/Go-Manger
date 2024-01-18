package model

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model
	OrderID    uint `gorm:"not null" json:"orderId"`
	MenuItemID uint `gorm:"not null" json:"menuItemId"`
	Quantity   int  `gorm:"not null" json:"quantity"`
}
