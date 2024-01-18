package model

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name     string `gorm:"not null" json:"name"`
	Email    string `gorm:"uniqueIndex" json:"email"`
	Password string `gorm:"not null" json:"password"`
}
