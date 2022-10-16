package routes

import (
	"os"
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/pame17/Arqui-Disp/db"
	"github.com/pame17/Arqui-Disp/jwtController"
	"github.com/golang-jwt/jwt/v4"
    "github.com/pame17/Arqui-Disp/models"
)

func GetUsers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var users []models.User
		db.StartConnection()
		if err := db.DB.Find(&users); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		json.NewEncoder(w).Encode(&users)
		db.CloseConnection()
	}
}
func GetUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
		if err  := db.DB.Select("ID", "Username").First(&user, id); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		json.NewEncoder(w).Encode(&user)
	}
}
func Login() http.HandlerFunc {
	return func(w http.ResponseWriter, r*http.Request) {
		var checkUser models.User
		var user models.User
		if err := json.NewDecoder(r.Body).Decode(&checkUser); err != nil{
			fmt.Println(err)
			return
		}
		db.StartConnection()
		if err := db.DB.Where("username = ?", checkUser.Username).First(&user); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		if err := user.CheckPassword(checkUser.Password); err != nil{
			fmt.Println(err)
			return
		}
		Token, err := jwtController.CreateJWT(user.ID); if err != nil{
			fmt.Println(err)
			return
		}
		json.NewEncoder(w).Encode(&Token)
	}
}
func Register() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil{
			fmt.Println(err)
			return
		}
		if err := user.HashPassword(user.Password); err != nil{
			fmt.Println(err)
			return
		}
		db.StartConnection()
		if err := db.DB.Create(&user); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
		Token, err := jwtController.CreateJWT(user.ID); if err != nil{
			fmt.Println(err)
			return
		}
		json.NewEncoder(w).Encode(&Token)
	}
}
func UpdateUser() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var user models.User
		var newUser models.User
		db.StartConnection()
		if err := db.DB.First(&user, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		json.NewDecoder(r.Body).Decode(&newUser)
		if err := db.DB.Model(&user).Updates(&newUser); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
	}
}
func DeleteUser() http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		data := mux.Vars(r)
		var user models.User
		db.StartConnection()
		if err := db.DB.First(&user, data["id"]); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		if err := db.DB.Unscoped().Delete(&user); err.Error != nil{
			fmt.Println(err.Error.Error())
			db.CloseConnection()
			return
		}
		db.CloseConnection()
	}
}