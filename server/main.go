package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/joanob/temi-chat-app/server/conn"
	"github.com/joanob/temi-chat-app/server/db"
	"github.com/joanob/temi-chat-app/server/user"
	"github.com/rs/cors"
)

func main() {
	// Open database connection
	if err := db.Open(); err != nil {
		fmt.Println(err.Error())
		return
	}
	defer db.Conn.Close()

	// Listen connections
	conn.ListenConnections()

	// Initialize router
	router := mux.NewRouter()

	// User functions
	router.HandleFunc("/login", user.LoginHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/signup", user.SignupHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/username/{username}", user.GetUserByUsernameHandler).Methods("GET", "OPTIONS")

	// WS function
	router.HandleFunc("/ws/{token}", conn.OpenWS)

	// Initialize server
	handler := cors.Default().Handler(router)
	http.ListenAndServe(":8080", handler)
}
