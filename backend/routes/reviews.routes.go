package routes

import (
	"net/http"
	"encoding/json"
	"fmt"
	"os"
	"github.com/gorilla/mux"
	"github.com/pame17/Arqui-Disp/db"
    "github.com/pame17/Arqui-Disp/models"
	"github.com/golang-jwt/jwt/v4"

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
		if err := db.DB.Where("id_movie = ?", data["id"]).Find(&review); err.Error != nil{
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
		var SECRET = []byte(os.Getenv("SECRET_KEY"))
		var user models.User
		claims := &models.Claims{}
		tknStr := r.Header["Token"][0]
		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
			return SECRET, nil
		})
		if err != nil {
			fmt.Println(err)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		var id = claims.IdUser
		db.StartConnection()
		if err  := db.DB.Select("Username").First(&user, id); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if err := db.DB.First(&review, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if review.Username != user.Username{
			fmt.Println("No coincide usuario con quien escribio review")
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
		var SECRET = []byte(os.Getenv("SECRET_KEY"))
		var user models.User
		claims := &models.Claims{}
		tknStr := r.Header["Token"][0]
		tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
			return SECRET, nil
		})
		if err != nil {
			fmt.Println(err)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		var id = claims.IdUser
		db.StartConnection()
		if err  := db.DB.Select("Username").First(&user, id); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if err := db.DB.First(&review, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if review.Username != user.Username{
			fmt.Println("No coincide usuario con quien escribio review")
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
