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

type connection struct {
	userId int
	ws     *websocket.Conn
}

type outcomingMessage struct {
	userId int
	msg    Message
}

var clients = make(map[int]*websocket.Conn)
var newConnection = make(chan connection)
var newMessage = make(chan outcomingMessage)
var disconnecting = make(chan int)

func ListenConnections() {
	go func() {
		for {
			select {
			case conn := <-newConnection:
				clients[conn.userId] = conn.ws
			case msg := <-newMessage:
				c := clients[msg.userId]
				if c != nil {
					c.WriteJSON(msg.msg)
				}
			case userId := <-disconnecting:
				delete(clients, userId)
			}
		}
	}()
}

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

	// User is connected
	newConnection <- connection{userId, conn}
	u, _ := user.GetUserById(userId)
	userJSON, _ := json.Marshal(u)

	// Send user all information
	userData := u.GetAllUserInformation()
	conn.WriteJSON(Message{Type: "LOGGED_IN", Payload: userData})

	// Listen messages
	go func() {
		for {
			// Read messages
			var msg Message
			err := conn.ReadJSON(&msg)
			if err != nil {
				// Connection was closed
				disconnecting <- userId
				conn.Close()
				return
			}

			// Process messages
			switch msg.Type {

			// CONTACT REQUESTS
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

			// MESSAGING
			case "SEND_MESSAGE":
				contactId, msgJSON := inMessage(&u, msg.Payload)
				sendMessage(contactId, Message{Type: "MESSAGE_RECEIVED", Payload: msgJSON})
				conn.WriteJSON(Message{Type: "MESSAGE_SENDED", Payload: msgJSON})
			case "READ_MESSAGE":
				m := struct {
					Id        int `json="id"`
					ContactId int `json="contactId"`
				}{}
				json.Unmarshal(msg.Payload, &m)
				var msg message.Message
				msg.Id = m.Id
				msg.ReadMessage()
			}
		}
	}()
}

func sendMessage(id int, msg Message) {
	newMessage <- outcomingMessage{userId: id, msg: msg}
}
