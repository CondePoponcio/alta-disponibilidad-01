package main

import (
	"net/http"
    "github.com/gorilla/mux"

	"github.com/pame17/Arqui-Disp/db"
	"github.com/pame17/Arqui-Disp/routes"
	"github.com/pame17/Arqui-Disp/jwt"
)

func main() {


	// Start Migrations
	db.InitDB()

	//Routes
	r := mux.NewRouter()
	//User Handler
    r.HandleFunc("/users", jwt.ValidateJWT(routes.GetUsers())).Methods("GET")
	r.HandleFunc("/login", routes.Login()).Methods("POST")
    r.HandleFunc("/register", routes.Register()).Methods("POST")
    r.HandleFunc("/user/{id}", routes.UpdateUser()).Methods("PUT")
    r.HandleFunc("/user/{id}", routes.DeleteUser()).Methods("DELETE")

	//Review Handler
	r.HandleFunc("/reviews", jwt.ValidateJWT(routes.GetReviews())).Methods("GET")
    r.HandleFunc("/review/{id}", jwt.ValidateJWT(routes.GetReview())).Methods("GET")
    r.HandleFunc("/review", jwt.ValidateJWT(routes.CreateReview())).Methods("POST")
    r.HandleFunc("/review/{id}", jwt.ValidateJWT(routes.UpdateReview())).Methods("PUT")
    r.HandleFunc("/review/{id}", jwt.ValidateJWT(routes.DeleteReview())).Methods("DELETE")

	//Movie Handler
	r.HandleFunc("/movies", jwt.ValidateJWT(routes.GetMovies())).Methods("GET")
	r.HandleFunc("/movie/{id}", jwt.ValidateJWT(routes.GetMovie())).Methods("GET")
	r.HandleFunc("/movie", jwt.ValidateJWT(routes.CreateMovie())).Methods("POST")
	r.HandleFunc("/movie/{id}", jwt.ValidateJWT(routes.UpdateMovie())).Methods("PUT")
	r.HandleFunc("/movie/{id}", jwt.ValidateJWT(routes.DeleteMovie())).Methods("DELETE")

	http.ListenAndServe(":8000", r)

}