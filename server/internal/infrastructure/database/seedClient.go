package database

import (
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
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
			hashedPassword, _ := service.HashPassword(client.Password)

			client.Password = string(hashedPassword)
			DB.Create(&client)
		}
	}
}
