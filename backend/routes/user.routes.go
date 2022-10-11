package routes

import (
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/pame17/Arqui-Disp/db"
    "github.com/pame17/Arqui-Disp/models"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	result := db.DB.Find(&users)
	if result.Error != nil{
		w.Write([]byte(result.Error.Error()))
		return
	}
	json.NewEncoder(w).Encode(&users)
}
func GetUser(w http.ResponseWriter, r *http.Request) {
	data := mux.Vars(r)
	var user models.User
	result := db.DB.First(&user, data["id"])
	if result.Error != nil{
		w.Write([]byte(result.Error.Error()))
		return
	}
	json.NewEncoder(w).Encode(&user)
}
func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil{
		log.Println(err)
		return
	}
	result := db.DB.Create(&user)
	if result.Error != nil{
		w.Write([]byte(result.Error.Error()))
		return
	}
	json.NewEncoder(w).Encode(&user)
}
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	data := mux.Vars(r)
	var user models.User
	var newUser models.User
	result := db.DB.First(&user, data["id"])
	if result.Error != nil{
		w.Write([]byte(result.Error.Error()))
		return
	}
	json.NewDecoder(r.Body).Decode(&newUser)
	result2 := db.DB.Model(&user).Updates(&newUser)
	if result2.Error != nil{
		w.Write([]byte(result.Error.Error()))
	}
}
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	data := mux.Vars(r)
	var user models.User
	result := db.DB.First(&user, data["id"])
	if result.Error != nil{
		w.Write([]byte(result.Error.Error()))
		return
	}
	result2 := db.DB.Unscoped().Delete(&user)
	if result2.Error != nil{
		w.Write([]byte(result.Error.Error()))
	}
}