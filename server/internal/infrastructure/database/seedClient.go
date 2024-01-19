package database

import (
	"go-manger/internal/domain/model"

	"golang.org/x/crypto/bcrypt"
)

func SeedClients() {
	var count int64
	DB.Model(&model.Client{}).Count(&count)

	if count == 0 {
		clients := []model.Client{
			{Name: "Client1", Email: "client1@example.com", Password: "password1"},
			{Name: "Client2", Email: "client2@example.com", Password: "password2"},
		}

		for _, client := range clients {
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(client.Password), bcrypt.DefaultCost)
			if err != nil {
				panic("Failed to hash a password")
			}

			client.Password = string(hashedPassword)
			DB.Create(&client)
		}
	}
}
