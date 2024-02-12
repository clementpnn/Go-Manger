package database

import (
	"go-manger/internal/domain/model"
	"go-manger/internal/domain/service"
)

func SeedAdmins() {
	var count int64
	DB.Model(&model.Admin{}).Count(&count)

	if count == 0 {
		admins := []model.Admin{
			{Name: "Vico", Email: "admin1@example.com", Password: "password1"},
			{Name: "Vito", Email: "admin2@example.com", Password: "password2"},
		}

		for _, admin := range admins {
			hashedPassword, _ := service.HashPassword(admin.Password)

			admin.Password = string(hashedPassword)
			DB.Create(&admin)
		}
	}
}
