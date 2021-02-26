package user

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/joanob/temi-chat-app/server/conn"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id         int            `json="id"`
	Username   string         `json="username"`
	ProfilePic sql.NullString `json="profilePic"`
	ProfileBio sql.NullString `json="profileBio"`
	SignupDate string         `json="signupDate"`
}

// Use username and password to log user in. Write session key
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	userInfo := struct {
		Username string `json="username"`
		Password string `json="pass"`
	}{}
	if err := json.NewDecoder(r.Body).Decode(&userInfo); err != nil {
		w.WriteHeader(400)
		return
	}
	stmt, _ := conn.Conn.Prepare("SELECT (id, pass) FROM users WHERE username = ?")
	var pass string
	var id int
	stmt.QueryRow(userInfo.Username).Scan(&pass, &id)
	if bcrypt.CompareHashAndPassword([]byte(pass), []byte(userInfo.Password)) != nil {
		w.WriteHeader(401)
		return
	}
	// User logged in successfully
	token := uuid.New().String()
	conn.AddToken(token, id)
	json.NewEncoder(w).Encode(token)
}

// Use username and password to sign user up
func SignupHandler(w http.ResponseWriter, r *http.Request) {
	userInfo := struct {
		Username string `json="username"`
		Password string `json="pass"`
	}{}
	if err := json.NewDecoder(r.Body).Decode(&userInfo); err != nil {
		w.WriteHeader(400)
		return
	}
	cryptedPass, _ := bcrypt.GenerateFromPassword([]byte(userInfo.Password), bcrypt.DefaultCost)
	_, err := conn.Conn.Exec("INSERT INTO users (username, pass) VALUES(?, ?)", userInfo.Username, string(cryptedPass))
	if err == nil {
		w.WriteHeader(200)
	} else {
		w.WriteHeader(500)
	}

}
