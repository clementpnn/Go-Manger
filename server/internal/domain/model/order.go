package model

import (
	"gorm.io/gorm"
)

type OrderStatus string

const (
	OrderStarted OrderStatus = "started"
	OrderPending OrderStatus = "pending"
	OrderRefused OrderStatus = "refused"
	OrderReady   OrderStatus = "ready"
	OrderSent    OrderStatus = "sent"
)

type Order struct {
	gorm.Model
	ClientID           uint        `gorm:"not null" json:"clientId"`
	RestaurantID       uint        `gorm:"not null" json:"restaurantId"`
	OrderItems         []OrderItem `gorm:"foreignKey:OrderID" json:"orderItems"`
	IdentificationCode string      `gorm:"not null" json:"identificationCode"`
	Status             OrderStatus `gorm:"type:varchar(20);check:status IN ('started', 'pending', 'refused', 'ready', 'sent')" json:"status"`
}
