package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"path"

	_ "github.com/microsoft/go-mssqldb"
)

// DB Global Information
var db *sql.DB
var server = "boilercvdb.database.windows.net"
var dbPort = 1433
var dbUser = "CJ"
var dbPassword = "Dunsmore@2024"
var dbName = "BoilerCVdb"

func main() {
	//START DB CODE
	// Build connection string
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s;",
		server, dbUser, dbPassword, dbPort, dbName)
	var err error
	// Create connection pool
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	ctx := context.Background()
	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Printf("Connected to DB!\n")
	//END DB CODE

	//Start Server Code
	port := ":3333"

	//HTTP server handler functions
	buildPath := path.Clean("client/build")
	http.Handle("/", http.FileServer(http.Dir(buildPath)))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("client/build/static"))))

	//API endpoints
	http.HandleFunc("/checkLogin", checkLogin)
	http.HandleFunc("/createAcc", createAcc)
	http.HandleFunc("/changePassword", changePass)
	http.HandleFunc("/sendEmail", sendEmail)

	//Start the server on the desired PORT
	fmt.Println("Sever has started on Port " + port)
	http.ListenAndServe(port, nil)
}
