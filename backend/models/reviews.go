package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model	
	Description     string	`gorm:"not null"`
	Puntaje		    uint	`gorm:"not null"`
	IdMovie			uint	`gorm:"not null"`
	Username		string	`gorm:"not null"`
}