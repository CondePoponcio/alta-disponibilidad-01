package routes

import (
	"net/http"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/pame17/Arqui-Disp/db"
    "github.com/pame17/Arqui-Disp/models"

)

func GetMovies() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var movie []models.Movie
		db.StartConnection()
		if err := db.DB.Find(&movie); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&movie)
	}
}

func GetMovie() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var movie models.Movie
		db.StartConnection()
		if err := db.DB.First(&movie, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&movie)
	}
}
func CreateMovie() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var movie models.Movie
		if err := json.NewDecoder(r.Body).Decode(&movie); err != nil{
			fmt.Println(err)
			return
		}
		db.StartConnection()
		if err := db.DB.Create(&movie); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&movie)
	}
}
func UpdateMovie() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var movie models.Movie
		var newMovie models.Movie
		db.StartConnection()
		if err := db.DB.First(&movie, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		json.NewDecoder(r.Body).Decode(&newMovie)
		if err := db.DB.Model(&movie).Updates(&newMovie); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
	}
}
func DeleteMovie() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var movie models.Movie
		db.StartConnection()
		if err := db.DB.First(&movie, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if err := db.DB.Unscoped().Delete(&movie); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
	}
}