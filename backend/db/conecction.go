package db

import (
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/pame17/Arqui-Disp/models"
)
var DB *gorm.DB
var DSN = "host="+os.Getenv("DB_HOST")+" user="+os.Getenv("DB_USERNAME")+" password="+os.Getenv("DB_PASSWORD")+" dbname="+os.Getenv("DB_DATABASE")+" port="+os.Getenv("DB_PORT")+""

func DBConnection() {
	var error error
	DB, error = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if error != nil {
		log.Fatal(error)
		return
	}
	log.Println("Database connection successful")
	DB.AutoMigrate(models.User{}, models.Review{})

}