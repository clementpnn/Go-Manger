package entity

type User struct {
	ID       uint   `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserType string

const (
	ClientType     UserType = "Client"
	AdminType      UserType = "Admin"
	RestaurantType UserType = "Restaurant"
)
