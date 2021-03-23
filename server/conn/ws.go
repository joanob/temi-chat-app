package conn

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/joanob/temi-chat-app/server/user"
)

type Message struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

var Clients = make(map[*websocket.Conn]int)

func OpenWS(w http.ResponseWriter, r *http.Request) {
	token := mux.Vars(r)["token"]
	userID := user.Tokens[token]
	if userID == 0 {
		w.WriteHeader(403)
		return
	}
	delete(user.Tokens, token)
	// Upgrade connection
	upgrader := websocket.Upgrader{}
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer c.Close()
	Clients[c] = userID
	// Send user its information
	user, err := user.GetUserById(userID)
	if err != nil {
		c.Close()
		return
	}
	userJson, _ := json.Marshal(user)
	c.WriteJSON(Message{Type: "LOGGED_IN", Payload: userJson})
	// Listen messages
	for {
		var msg map[string]interface{}
		err := c.ReadJSON(msg)
		if err != nil {
			c.Close()
		}
		// Handle message
	}
}
