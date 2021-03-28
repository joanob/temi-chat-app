package user

import (
	"github.com/joanob/temi-chat-app/server/db"
)

// Get all aproved contacts. Returns User slice
func (user User) GetContacts() []User {
	var contacts []User
	// Check on both user_id and contact_id
	stmt, _ := db.Conn.Prepare("SELECT user_id, contact_id FROM contacts WHERE (user_id = ? OR contact_id = ?) AND relationship = 1")
	rows, _ := stmt.Query(user.Id, user.Id)
	var contactIds []int
	for rows.Next() {
		var userId, contactId int
		rows.Scan(&userId, &contactId)
		if user.Id == userId {
			contactIds = append(contactIds, contactId)
		} else {
			contactIds = append(contactIds, userId)
		}
	}
	rows.Close()
	stmt.Close()
	for _, id := range contactIds {
		c, _ := GetUserById(id)
		contacts = append(contacts, c)
	}
	return contacts
}

// Get all contacts requested. Returns User slice
func (user User) GetContactsRequested() []User {
	var contacts []User
	stmt, _ := db.Conn.Prepare("SELECT contact_id FROM contacts WHERE user_id = ? AND relationship = 2")
	rows, _ := stmt.Query(user.Id)
	var contactIds []int
	for rows.Next() {
		var contactId int
		rows.Scan(&contactId)
		contactIds = append(contactIds, contactId)
	}
	rows.Close()
	stmt.Close()
	for _, id := range contactIds {
		c, _ := GetUserById(id)
		contacts = append(contacts, c)
	}
	return contacts
}

// Get all contact requests. Returns User slice
func (user User) GetContactRequests() []User {
	var contacts []User
	stmt, _ := db.Conn.Prepare("SELECT user_id FROM contacts WHERE contact_id = ? AND relationship = 2")
	rows, _ := stmt.Query(user.Id)
	var contactIds []int
	for rows.Next() {
		var contactId int
		rows.Scan(&contactId)
		contactIds = append(contactIds, contactId)
	}
	rows.Close()
	stmt.Close()
	for _, id := range contactIds {
		c, _ := GetUserById(id)
		contacts = append(contacts, c)
	}
	return contacts
}

// Uses username to get contactID and add contact request
// Returns User or error. Error user not found or already requested
func (user User) RequestContact(username string) (User, error) {
	contact, err := GetUserByUsername(username)
	if err != nil {
		return User{}, err
	}
	stmt, _ := db.Conn.Prepare("INSERT INTO contacts(user_id, contact_id, requestedDate) VALUES(?, ?, CURDATE())")
	_, err = stmt.Exec(user.Id, contact.Id)
	stmt.Close()
	return contact, err
}

// Deletes contact request. Return error
func (user User) DeleteContactRequested(contact User) error {
	stmt, _ := db.Conn.Prepare("DELETE FROM contacts WHERE user_id = ? AND contact_id = ? AND relationship = 2")
	_, err := stmt.Exec(user.Id, contact.Id)
	stmt.Close()
	return err
}

// Accept contact request. Returns error
func (user User) AcceptContactRequest(contact User) error {
	stmt, _ := db.Conn.Prepare("UPDATE contacts SET relationship = 1 WHERE user_id = ? AND contact_id = ?")
	_, err := stmt.Exec(contact.Id, user.Id)
	return err
}

// Reject contact request. Returns error
func (user User) RejectContactRequest(contact User) error {
	stmt, _ := db.Conn.Prepare("UPDATE contacts SET relationship = 3 WHERE user_id = ? AND contact_id = ?")
	_, err := stmt.Exec(contact.Id, user.Id)
	return err
}
