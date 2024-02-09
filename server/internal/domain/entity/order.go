package entity

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
