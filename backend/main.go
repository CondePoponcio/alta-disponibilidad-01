package main

import (
	"net/http"
    "github.com/gorilla/mux"

	"github.com/pame17/Arqui-Disp/db"
	"github.com/pame17/Arqui-Disp/routes"
	"github.com/pame17/Arqui-Disp/jwtController"
)

func main() {


	// Start Migrations
	db.InitDB()

	//Routes
	r := mux.NewRouter()
	//User Handler
	r.HandleFunc("/user", jwtController.ValidateJWT(routes.GetUser())).Methods("GET")
    r.HandleFunc("/users", jwtController.ValidateJWT(routes.GetUsers())).Methods("GET")
	r.HandleFunc("/login", routes.Login()).Methods("POST")
    r.HandleFunc("/register", routes.Register()).Methods("POST")
    r.HandleFunc("/user/{id}", jwtController.ValidateJWT(routes.UpdateUser())).Methods("PUT")
    r.HandleFunc("/user/{id}", jwtController.ValidateJWT(routes.DeleteUser())).Methods("DELETE")

	//Review Handler
	r.HandleFunc("/reviews", jwtController.ValidateJWT(routes.GetReviews())).Methods("GET")
    r.HandleFunc("/review/{id}", jwtController.ValidateJWT(routes.GetReview())).Methods("GET")
    r.HandleFunc("/review", jwtController.ValidateJWT(routes.CreateReview())).Methods("POST")
    r.HandleFunc("/review/{id}", jwtController.ValidateJWT(routes.UpdateReview())).Methods("PUT")
    r.HandleFunc("/review/{id}", jwtController.ValidateJWT(routes.DeleteReview())).Methods("DELETE")

	//Movie Handler
	r.HandleFunc("/movies", jwtController.ValidateJWT(routes.GetMovies())).Methods("GET")
	r.HandleFunc("/movie/{id}", jwtController.ValidateJWT(routes.GetMovie())).Methods("GET")
	r.HandleFunc("/movie", jwtController.ValidateJWT(routes.CreateMovie())).Methods("POST")
	r.HandleFunc("/movie/{id}", jwtController.ValidateJWT(routes.UpdateMovie())).Methods("PUT")
	r.HandleFunc("/movie/{id}", jwtController.ValidateJWT(routes.DeleteMovie())).Methods("DELETE")

	http.ListenAndServe(":8000", r)

}