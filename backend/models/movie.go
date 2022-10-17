package models

import "gorm.io/gorm"

type Movie struct {
	gorm.Model	
	Title		    string 	`gorm:"not null"`
	Description     string	`gorm:"not null"`
	Poster		    string	`gorm:"not null"`
}