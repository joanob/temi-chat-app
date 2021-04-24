package conn

import (
	"encoding/json"

	"github.com/joanob/temi-chat-app/server/user"
)

func newContactRequested(u *user.User, payload []byte) user.User {
	var msg struct {
		ContactName string `json:"contactName"`
	}
	err := json.Unmarshal(payload, &msg)
	if err != nil {
		return user.User{}
	}
	var contact user.User
	contact, _ = u.RequestContact(msg.ContactName)
	return contact
}

func deleteContactRequested(u *user.User, payload []byte) int {
	var contact user.User
	json.Unmarshal(payload, &contact)
	err := u.DeleteContactRequested(contact)
	if err == nil {
		return contact.Id
	}
	return 0
}

func acceptContactRequest(u *user.User, payload []byte) int {
	var contact user.User
	json.Unmarshal(payload, &contact)
	err := u.AcceptContactRequest(contact)
	if err == nil {
		return contact.Id
	}
	return 0
}

func rejectContactRequest(u *user.User, payload []byte) int {
	var contact user.User
	json.Unmarshal(payload, &contact)
	err := u.RejectContactRequest(contact)
	if err == nil {
		return contact.Id
	}
	return 0
}
