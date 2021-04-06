package conn

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/joanob/temi-chat-app/server/message"
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
	userJson, _ := json.Marshal(u)
	contacts := u.GetContacts()
	contactsRequested := u.GetContactsRequested()
	contactRequests := u.GetContactRequests()
	messages := message.GetUserMesssages(u.Id)
	// Write all data
	data, _ := json.Marshal(struct {
		User              user.User         `json:"user"`
		Contacts          []user.User       `json:"contacts"`
		ContactsRequested []user.User       `json:"contactsRequested"`
		ContactRequests   []user.User       `json:"contactRequests"`
		Messages          []message.Message `json:"messages"`
	}{User: u, Contacts: contacts, ContactsRequested: contactsRequested, ContactRequests: contactRequests, Messages: messages})
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
				sendMessage(contact.Id, Message{Type: "NEW_CONTACT_REQUEST", Payload: userJson})
				c.WriteJSON(Message{Type: "NEW_CONTACT_REQUESTED", Payload: contactInfo})
			} else {
				// ERROR
				fmt.Println(err)
			}
		case "DELETE_CONTACT_REQUESTED":
			var contact user.User
			json.Unmarshal(msg.Payload, &contact)
			err = u.DeleteContactRequested(contact)
			if err == nil {
				sendMessage(contact.Id, Message{Type: "DELETED_CONTACT_REQUEST", Payload: userJson})
			} else {
				// There was an error. Notify user
			}
		case "ACCEPT_CONTACT_REQUEST":
			var contact user.User
			json.Unmarshal(msg.Payload, &contact)
			err = u.AcceptContactRequest(contact)
			if err == nil {
				sendMessage(contact.Id, Message{Type: "CONTACT_REQUEST_APROVED", Payload: userJson})
			} else {
				// There was an error. Notify user
			}
		case "REJECT_CONTACT_REQUEST":
			var contact user.User
			json.Unmarshal(msg.Payload, &contact)
			err = u.RejectContactRequest(contact)
			if err == nil {
				sendMessage(contact.Id, Message{Type: "CONTACT_REQUEST_REJECTED", Payload: userJson})
			} else {
				// There was an error. Notify user
			}
		case "SEND_MESSAGE":
			inMessage := struct {
				Text      string `json:"text"`
				ContactId int    `json:"contactId"`
			}{}
			json.Unmarshal(msg.Payload, &inMessage)
			if u.AreContacts(inMessage.ContactId) {
				m := message.Message{SenderId: u.Id, Text: inMessage.Text, ReceiverId: inMessage.ContactId, DateSended: time.Now()}
				m.AddMessage()
				if m.Id != 0 {
					msgJson, _ := json.Marshal(m)
					sendMessage(m.ReceiverId, Message{Type: "MESSAGE_RECEIVED", Payload: msgJson})
					c.WriteJSON(Message{Type: "MESSAGE_SENDED", Payload: msgJson})
				}
			}
		case "READ_MESSAGE":
			var m message.Message
			json.Unmarshal(msg.Payload, &m)
			m.ReadMessage()
		}
	}
}

func sendMessage(id int, msg Message) {
	for c, userId := range Clients {
		if userId == id {
			c.WriteJSON(msg)
			return
		}
	}
}
