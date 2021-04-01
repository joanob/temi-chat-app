package message

import (
	"database/sql"
	"time"

	"github.com/joanob/temi-chat-app/server/db"
)

type Message struct {
	Id           int          `json:"id"`
	Text         string       `json:"text"`
	SenderId     int          `json:"senderId"`
	ReceiverId   int          `json:"receiverId"`
	DateSended   time.Time    `json:"dateSended"`
	DateReceived sql.NullTime `json:"dateReceived"`
}

// Add message and set message id
func (m *Message) AddMessage() {
	stmt, _ := db.Conn.Prepare("INSERT INTO messages (message_text, sender_id, receiver_id, dateSended) VALUES (?, ?, ?, ?")
	defer stmt.Close()
	res, err := stmt.Exec(m.Text, m.SenderId, m.ReceiverId, m.DateSended)
	id, err := res.LastInsertId()
	if err == nil {
		m.Id = int(id)
	}
}

// Read message sets received date of message. Returns error
func (m Message) ReadMessage() error {
	stmt, _ := db.Conn.Prepare("UPDATE messages SET dateReceived = NOW() WHERE messageId = ?")
	defer stmt.Close()
	_, err := stmt.Exec(m.Id)
	return err
}
