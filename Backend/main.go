package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"path"
	"text/template"

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
	//START DB CONNECTION CODE
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
	//END DB CONNECTION CODE

	//Start Template Parsing Code
	err = nil
	tmpl1, err = template.New("T1.tmpl").ParseFiles("./templates/T1.tmpl")
	if err != nil {
		log.Fatal("Error parsing T1.tmpl: ", err.Error())
	}
	fmt.Println("All templates were parsed correctly!")

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
	http.HandleFunc("/createTemplate", createTemplate)
	http.HandleFunc("/editTemplate", editTemplate)

	//Start the server on the desired PORT
	fmt.Println("Sever has started on Port " + port)
	http.ListenAndServe(port, nil)
}
