package user

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/joanob/temi-chat-app/server/db"
	"golang.org/x/crypto/bcrypt"
)

var tokens = make(map[string]int)

// Use username and password to log user in. Write session key
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	userInfo := struct {
		Username string `json:"username"`
		Password string `json:"pass"`
	}{}
	if err := json.NewDecoder(r.Body).Decode(&userInfo); err != nil {
		w.WriteHeader(400)
		return
	}
	stmt, _ := db.Conn.Prepare("SELECT id, pass FROM users WHERE username = ?")
	var pass string
	var id int
	stmt.QueryRow(userInfo.Username).Scan(&id, &pass)
	stmt.Close()
	if bcrypt.CompareHashAndPassword([]byte(pass), []byte(userInfo.Password)) != nil {
		w.WriteHeader(401)
		return
	}
	// User logged in successfully
	token := uuid.New().String()
	tokens[token] = id
	json.NewEncoder(w).Encode(token)
}

// Use username and password to sign user up
func SignupHandler(w http.ResponseWriter, r *http.Request) {
	userInfo := struct {
		Username string `json:"username"`
		Password string `json:"pass"`
	}{}
	if err := json.NewDecoder(r.Body).Decode(&userInfo); err != nil {
		w.WriteHeader(400)
		return
	}
	cryptedPass, _ := bcrypt.GenerateFromPassword([]byte(userInfo.Password), bcrypt.DefaultCost)
	_, err := db.Conn.Exec("INSERT INTO users (username, pass, signupDate) VALUES(?, ?, CURDATE())", userInfo.Username, string(cryptedPass))
	if err == nil {
		w.WriteHeader(200)
	} else {
		w.WriteHeader(500)
	}

}

func GetUserByUsernameHandler(w http.ResponseWriter, r *http.Request) {
	username := mux.Vars(r)["username"]
	if username == "" {
		w.WriteHeader(400)
	}
	user, err := GetUserByUsername(username)
	if err == sql.ErrNoRows {
		w.WriteHeader(400)
		return
	}
	user.SignupDate = ""
	json.NewEncoder(w).Encode(user)
}

func AuthUser(token string) int {
	id := tokens[token]
	if id == 0 {
		delete(tokens, token)
		return 0
	}
	return id
}
