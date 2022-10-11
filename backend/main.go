package main

import (
	"net/http"
    "github.com/gorilla/mux"

	"github.com/pame17/Arqui-Disp/db"
	"github.com/pame17/Arqui-Disp/routes"
)

func main() {


	// database connection
	db.DBConnection()

	r := mux.NewRouter()

	//User Handler
    r.HandleFunc("/users", routes.GetUsers).Methods("GET")
    r.HandleFunc("/user/{id}", routes.GetUser).Methods("GET")
    r.HandleFunc("/user", routes.CreateUser).Methods("POST")
    r.HandleFunc("/user/{id}", routes.UpdateUser).Methods("PUT")
    r.HandleFunc("/user/{id}", routes.DeleteUser).Methods("DELETE")
	//Review Handler
	r.HandleFunc("/reviews", routes.GetReviews).Methods("GET")
    r.HandleFunc("/review/{id}", routes.GetReview).Methods("GET")
    r.HandleFunc("/review", routes.CreateReview).Methods("POST")
    r.HandleFunc("/review/{id}", routes.UpdateReview).Methods("PUT")
    r.HandleFunc("/review/{id}", routes.DeleteReview).Methods("DELETE")

	http.ListenAndServe(":8000", r)

}