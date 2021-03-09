package conn

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var Clients = make(map[*websocket.Conn]int)
var tokens = make(map[string]int)

func OpenWS(w http.ResponseWriter, r *http.Request) {
	token := mux.Vars(r)["token"]
	userID := tokens[token]
	if userID == 0 {
		w.WriteHeader(403)
		return
	}
	delete(tokens, token)
	// Upgrade connection
	upgrader := websocket.Upgrader{}
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer c.Close()
	// Listen messages
}

func AddToken(token string, id int) {
	tokens[token] = id
}
