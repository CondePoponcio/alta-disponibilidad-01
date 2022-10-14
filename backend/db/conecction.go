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

func StartConnection(){
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		return
	}
	log.Println("Database connection successful")

}
func CloseConnection(){
	sqlDB, err := DB.DB()
	if err != nil{
		log.Fatal(err)
		return
	}
	sqlDB.Close()
	log.Println("Database connection ended")
}
func InitDB(){
	StartConnection()
	DB.Migrator().DropTable(models.User{}, models.Review{}, models.Movie{})
	DB.AutoMigrate(models.User{}, models.Review{}, models.Movie{})

	user:= models.User{Username: "pame", Password: "1234"}
	user.HashPassword(user.Password)
	movie1:= models.Movie{Title: "movie1", Description: "description1", Gender: "gender1"}
	movie2:= models.Movie{Title: "movie2", Description: "description2", Gender: "gender2"}
	movie3:= models.Movie{Title: "movie3", Description: "description2", Gender: "gender3"}
	review1:= models.Review{Title: "review", Description: "review1", IdMovie: 1, IdUser: 1}

	DB.Create(&user)
	DB.Create(&movie1)
	DB.Create(&movie2)
	DB.Create(&movie3)
	DB.Create(&review1)

	CloseConnection()
}