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
	// Get user information
	u, err := user.GetUserById(userID)
	if err != nil {
		c.Close()
		return
	}
	contacts := u.GetContacts()
	contactsRequested := u.GetContactsRequested()
	contactRequests := u.GetContactRequests()
	// Write all data
	data, _ := json.Marshal(struct {
		User              user.User   `json:"user"`
		Contacts          []user.User `json:"contacts"`
		ContactsRequested []user.User `json:"contactsRequested"`
		ContactRequests   []user.User `json:"contactRequests"`
	}{User: u, Contacts: contacts, ContactsRequested: contactsRequested, ContactRequests: contactRequests})
	c.WriteJSON(Message{Type: "LOGGED_IN", Payload: data})
	// Listen messages
	for {
		var msg Message
		err := c.ReadJSON(&msg)
		if err != nil {
			fmt.Println(err)
			c.Close()
			break
		}
		switch msg.Type {
		case "NEW_CONTACT_REQUESTED":
			var contact user.User
			// Remove quotes from beggining and end
			contactUsername := string(msg.Payload)
			contact, err = u.RequestContact(contactUsername[1 : len(contactUsername)-1])
			if err == nil {
				contactInfo, _ := json.Marshal(contact)
				c.WriteJSON(Message{Type: "NEW_CONTACT_REQUESTED", Payload: contactInfo})
			} else {
				// ERROR
				fmt.Println(err)
			}
		case "ACCEPT_CONTACT_REQUEST":
			var contact user.User
			json.Unmarshal(msg.Payload, &contact)
			err = u.AcceptContactRequest(contact)
			if err != nil {
				// There was an error. Notify user
			}
		}
	}
}
