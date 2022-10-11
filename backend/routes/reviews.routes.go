package routes

import (
	"net/http"
	"encoding/json"
	"log"
	"github.com/gorilla/mux"
	"github.com/pame17/Arqui-Disp/db"
    "github.com/pame17/Arqui-Disp/models"

)

func GetReviews(w http.ResponseWriter, r *http.Request) {
	var reviews []models.Review
	db.DB.Find(&reviews)
	json.NewEncoder(w).Encode(&reviews)
}

func GetReview(w http.ResponseWriter, r *http.Request) {
	data := mux.Vars(r)
	var user models.User
	db.DB.First(&user, data["id"])
	json.NewEncoder(w).Encode(&user)
	log.Println("Información del usuario "+data["id"]+" enviada")
}
func CreateReview(w http.ResponseWriter, r *http.Request) {
	var user models.User
	json.NewDecoder(r.Body).Decode(&user)
	db.DB.Create(&user)
	json.NewEncoder(w).Encode(&user)
	log.Println("Usuario creado con exito")
}
func UpdateReview(w http.ResponseWriter, r *http.Request) {
	data := mux.Vars(r)
	var user models.User
	var newUser models.User
	db.DB.First(&user, data["id"])
	json.NewDecoder(r.Body).Decode(&newUser)
	db.DB.Model(&user).Updates(&newUser)
	log.Println("Usuario actualizado con exito")
}
func DeleteReview(w http.ResponseWriter, r *http.Request) {
	data := mux.Vars(r)
	var user models.User
	db.DB.First(&user, data["id"])
	db.DB.Unscoped().Delete(&user)
	log.Println("Usuario eliminado con exito")
}
