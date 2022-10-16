package routes

import (
	"net/http"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/pame17/Arqui-Disp/db"
    "github.com/pame17/Arqui-Disp/models"

)

func GetReviews() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		var reviews []models.Review
		db.StartConnection()
		if err := db.DB.Find(&reviews); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&reviews)
	}
}

func GetReview() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var review []models.Review
		db.StartConnection()
		if err := db.DB.First(&review, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&review)
	}
}
func CreateReview() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var review models.Review
		if err := json.NewDecoder(r.Body).Decode(&review); err != nil{
			fmt.Println(err)
			return
		}
		db.StartConnection()
		if err := db.DB.Create(&review); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&review)
	}
}
func UpdateReview() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var review models.Review
		var newReview models.Review
		db.StartConnection()
		if err := db.DB.First(&review, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		json.NewDecoder(r.Body).Decode(&newReview)
		if err := db.DB.Model(&review).Updates(&newReview); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
	}
}
func DeleteReview() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var review models.Review
		db.StartConnection()
		if err := db.DB.First(&review, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if err := db.DB.Unscoped().Delete(&review); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
	}
}
