package conn

import (
	"encoding/json"
	"time"

	"github.com/joanob/temi-chat-app/server/message"
	"github.com/joanob/temi-chat-app/server/user"
)

func inMessage(u *user.User, payload []byte) (int, []byte) {
	inMessage := struct {
		Text      string `json:"text"`
		ContactId int    `json:"contactId"`
	}{}
	json.Unmarshal(payload, &inMessage)
	if u.AreContacts(inMessage.ContactId) {
		m := message.Message{SenderId: u.Id, Text: inMessage.Text, ReceiverId: inMessage.ContactId, DateSended: time.Now()}
		m.AddMessage()
		if m.Id != 0 {
			msgJSON, _ := json.Marshal(m)
			return inMessage.ContactId, msgJSON
		}
	}
	return 0, nil
}
