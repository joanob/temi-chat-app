package user

import (
	"database/sql"

	"github.com/joanob/temi-chat-app/server/db"
)

type User struct {
	Id         int            `json:"id"`
	Username   string         `json:"username"`
	ProfilePic sql.NullString `json:"profilePic"`
	ProfileBio sql.NullString `json:"profileBio"`
	SignupDate string         `json:"signupDate"`
}

func GetUserById(id int) (User, error) {
	var user User
	stmt, err := db.Conn.Prepare("SELECT id, username, profilePic, profileBio, signupDate FROM users WHERE id = ?")
	err = stmt.QueryRow(id).Scan(&user.Id, &user.Username, &user.ProfilePic, &user.ProfileBio, &user.SignupDate)
	stmt.Close()
	return user, err
}

func GetUserByUsername(username string) (User, error) {
	var user User
	stmt, _ := db.Conn.Prepare("SELECT id, username, profilePic, profileBio, signupDate FROM users WHERE username = ?")
	err := stmt.QueryRow(username).Scan(&user.Id, &user.Username, &user.ProfilePic, &user.ProfileBio, &user.SignupDate)
	stmt.Close()
	return user, err
}

func (u User) AreContacts(contactId int) bool {
	stmt, _ := db.Conn.Prepare("SELECT relationship FROM contacts WHERE user_id = ? AND contact_id = ? AND relationship = 1")
	defer stmt.Close()
	_, err := stmt.Exec(u.Id, contactId)
	return err == nil
}
