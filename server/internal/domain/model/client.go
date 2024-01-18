package model

import (
	"gorm.io/gorm"
)

type Client struct {
	gorm.Model
	Name     string  `gorm:"not null" json:"name"`
	Email    string  `gorm:"uniqueIndex" json:"email"`
	Password string  `gorm:"not null" json:"password"`
	Orders   []Order `gorm:"foreignKey:ClientID" json:"orders"`
}
