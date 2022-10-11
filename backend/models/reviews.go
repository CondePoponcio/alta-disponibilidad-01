package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model	
	Title		    string 	`gorm:"not null"`
	Description     string	`gorm:"not null"`
	IdUser			uint	`gorm:"not null"`
}