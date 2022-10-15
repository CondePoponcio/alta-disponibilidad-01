package models

import (
	"gorm.io/gorm"
    "golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v4"
)

type User struct {
	gorm.Model	
	Username     string  `gorm:"not null;uniqueIndex"`
	Password     string  `gorm:"not null"`
}

type Claims struct {
	IdUser uint 
	jwt.StandardClaims
}

func (user *User) HashPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}
func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}
	return nil
}