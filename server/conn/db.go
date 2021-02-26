package conn

import "database/sql"

var Conn *sql.DB

// Open connection to database
func Open() (err error) {
	Conn, err = sql.Open("mysql", "admin:admin@tcp(127.0.0.1:3306)/temi")
	return err
}
