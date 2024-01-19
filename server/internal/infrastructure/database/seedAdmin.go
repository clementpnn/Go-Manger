package database

import (
	"go-manger/internal/domain/model"

	"golang.org/x/crypto/bcrypt"
)

func SeedAdmins() {
	var count int64
	DB.Model(&model.Admin{}).Count(&count)

	if count == 0 {
		admins := []model.Admin{
			{Name: "Admin1", Email: "admin1@example.com", Password: "password1"},
			{Name: "Admin2", Email: "admin2@example.com", Password: "password2"},
		}

		for _, admin := range admins {
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Password), bcrypt.DefaultCost)
			if err != nil {
				panic("Failed to hash a password")
			}

			admin.Password = string(hashedPassword)
			DB.Create(&admin)
		}
	}
}
