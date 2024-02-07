package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os/exec"
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

// Struct for storing login information
type Credentials struct {
	Username string
	Password string
}

// Structure to store resume information for templating library
type ResumeInfo struct {
	//Personal Information
	Name    string
	PNumber string
	Address string
	City    string
	State   string
}

func checkLogin(writer http.ResponseWriter, request *http.Request) {
	//grabbing the credentials
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//check that the credentials are valid

	//now that we have the credentials we query the database

	//Check the database response and return appropiatly
}

func createAcc(writer http.ResponseWriter, request *http.Request) {
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err2 := addUserToDB(creds)
	if err2 != nil {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func template1(writer http.ResponseWriter, request *http.Request) {
	//step 1 unmarshall the JSON into the template info struct

	//step 2 use the struct to template the LaTeX

	//write the templated LaTeX to the response packet
}

func examplePDF(writer http.ResponseWriter, request *http.Request) {
	//exec LaTeX to PDF
	exec.Command("pandoc", "./templates/Example.Tex", "-s", "-o", "Example.pdf")

	//transfer the file
}

func addUserToDB(creds Credentials) error {
	ctx := context.Background()
	var err error

	//check if database is initialized
	if db == nil {
		err = errors.New("addUserToDB: db is null")
		return err
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return err
	}

	tsql := `
		INSERT INTO BoilerCVdb.dbo.users (id, username, email, PIN, password) VALUES (NEWID(), @USERNAME, '', 0, @PASSWORD);
		select isNull(SCOPE_IDENTITY(), -1);
		`
	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("USERNAME", creds.Username),
		sql.Named("PASSWORD", creds.Password))

	//Check the returned row for name
	var test string
	err = row.Scan(&test)
	if err != nil {
		return errors.New("AddUsertoDB failed")
	}

	return nil
}

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

	//DB
	port := ":3333"

	//HTTP server handler functions
	buildPath := path.Clean("client/build")
	http.Handle("/", http.FileServer(http.Dir(buildPath)))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("client/build/static"))))

	//API endpoints
	http.HandleFunc("/template1", template1)
	http.HandleFunc("/checkLogin", checkLogin)
	http.HandleFunc("/createAcc", createAcc)
	http.HandleFunc("/examplePDF", examplePDF)

	//Start the server on the desired PORT
	fmt.Println("Sever has started on Port " + port)
	http.ListenAndServe(port, nil)
}
