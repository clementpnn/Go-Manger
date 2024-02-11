package entity

import "go-manger/internal/domain/model"

type OrderData struct {
	ID                 uint   `json:"id"`
	IdentificationCode string `json:"identificationCode"`
	Status             string `json:"status"`
	ClientName         string `json:"clientName"`
}

type OrderClient struct {
	ID                 uint   `json:"id"`
	IdentificationCode string `json:"identificationCode"`
	Status             string `json:"status"`
	RestaurantName     string `json:"restaurantName"`
}

type Order struct {
	ID                 uint   `json:"id"`
	IdentificationCode string `json:"identificationCode"`
	Status             string `json:"status"`
	RestaurantName     string `json:"restaurantName"`
	RestaurantID       uint   `json:"restaurantId"`
}

type OrderItemResponse struct {
	Name     string `json:"name"`
	Quantity int    `json:"quantity"`
}

type OrderResponse struct {
	ID                 uint                `json:"id"`
	IdentificationCode string              `json:"identificationCode"`
	Status             model.OrderStatus   `json:"status"`
	OrderItems         []OrderItemResponse `json:"orderItems"`
}
