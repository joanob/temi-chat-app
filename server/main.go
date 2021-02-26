package main

import (
	"log"

	"github.com/gorilla/mux"
	"github.com/joanob/temi-chat-app/server/conn"
	"github.com/joanob/temi-chat-app/server/user"
)

func main() {
	// Open database connection
	if err := conn.Open(); err != nil {
		log.Fatal(err.Error())
	}
	defer conn.Conn.Close()

	// Initialize router
	router := mux.NewRouter()

	// User functions
	router.HandleFunc("/login", user.LoginHandler).Methods("POST")
	router.HandleFunc("/signup", user.SignupHandler).Methods("POST")

	// WS function
	router.HandleFunc("/ws/{token}", conn.OpenWS)

}
