package conn

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"

	"github.com/joanob/temi-chat-app/server/message"
	"github.com/joanob/temi-chat-app/server/user"
)

type Message struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

var Clients = make(map[int]*websocket.Conn)

func OpenWS(w http.ResponseWriter, r *http.Request) {
	// Auth user
	userId := user.AuthUser(mux.Vars(r)["token"])
	if userId == 0 {
		w.WriteHeader(403)
		return
	}

	// Upgrade connection
	upgrader := websocket.Upgrader{}
	// SECURITY ISSUE: CHECK ORIGIN
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer conn.Close()

	// User is connected
	Clients[userId] = conn
	u, _ := user.GetUserById(userId)
	userJSON, _ := json.Marshal(u)

	// Send user all information
	userData := u.GetAllUserInformation()
	conn.WriteJSON(Message{Type: "LOGGED_IN", Payload: userData})

	// Listen messages
	go func() {
		// Read messages
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			// Connection was closed
			delete(Clients, userId)
			conn.Close()
			return
		}

		// Process messages
		switch msg.Type {
		case "NEW_CONTACT_REQUESTED":
			contact := newContactRequested(&u, msg.Payload)
			contactInfo, _ := json.Marshal(contact)
			sendMessage(contact.Id, Message{Type: "NEW_CONTACT_REQUEST", Payload: userJSON})
			conn.WriteJSON(Message{Type: "NEW_CONTACT_REQUESTED", Payload: contactInfo})
		case "DELETE_CONTACT_REQUESTED":
			contactId := deleteContactRequested(&u, msg.Payload)
			if contactId != 0 {
				sendMessage(contactId, Message{Type: "DELETED_CONTACT_REQUEST", Payload: userJSON})
			}
		case "ACCEPT_CONTACT_REQUEST":
			contactId := acceptContactRequest(&u, msg.Payload)
			if contactId != 0 {
				sendMessage(contactId, Message{Type: "CONTACT_REQUEST_APROVED", Payload: userJSON})
			}
		case "REJECT_CONTACT_REQUEST":
			contactId := rejectContactRequest(&u, msg.Payload)
			if contactId != 0 {
				sendMessage(contactId, Message{Type: "CONTACT_REQUEST_REJECTED", Payload: userJSON})
			}
		case "SEND_MESSAGE":
			contactId, msgJSON := inMessage(&u, msg.Payload)
			sendMessage(contactId, Message{Type: "MESSAGE_RECEIVED", Payload: msgJSON})
			conn.WriteJSON(Message{Type: "MESSAGE_SENDED", Payload: msgJSON})
		case "READ_MESSAGE":
			var m message.Message
			json.Unmarshal(msg.Payload, &m)
			m.ReadMessage()
		}
	}()
}

func sendMessage(id int, msg Message) {
	c := Clients[id]
	if c != nil {
		c.WriteJSON(msg)
	}
}
