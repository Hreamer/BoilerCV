package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"path"

	_ "github.com/microsoft/go-mssqldb"
	"gopkg.in/gomail.v2"
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

// Struct for storing email sending information given by client
type EmailInfo struct {
	toEmail  string
	fileName string
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

func dbCheckLogin(creds Credentials) error {

	//database code to check login
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return errors.New("dbCheckLogin: Could not ping db")
	}

	tsql := fmt.Sprintf("SELECT username, password FROM BoilerCVdb.dbo.users WHERE username=@USERNAME AND password=@PASSWORD;")

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

	//depending on the result return all good or error
	var check Credentials
	err2 := row.Scan(&check.Username, &check.Password)
	if err2 == sql.ErrNoRows {
		return errors.New("No users with those credentials exist")
	}
	return nil
}

func checkLogin(writer http.ResponseWriter, request *http.Request) {
	//grabbing the credentials
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		// fmt.Println("Could not decode")
		// fmt.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//check that the credentials are valid
	err2 := dbCheckLogin(creds)
	if err2 != nil {
		// fmt.Println("Could not login")
		// fmt.Println(err2)
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	//If we get here all is good
	writer.WriteHeader(http.StatusOK)
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

func sendEmail(writer http.ResponseWriter, request *http.Request) {
	var info EmailInfo

	err := json.NewDecoder(request.Body).Decode(&info)
	if err != nil {
		fmt.Println("Failed to decode")
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println(info.fileName)
	fmt.Println(info.toEmail)

	err = useGoMail(info)
	if err != nil {
		fmt.Println("Failed to send email")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func useGoMail(info EmailInfo) error {

	//get an empty mail object
	message := gomail.NewMessage()

	//set up our empty message with what we want
	message.SetHeader("From", "reamer.hudson@gmail.com")
	message.SetHeader("To", info.fileName)
	message.SetHeader("Subject", "My Cool New Resume")
	message.SetBody("text/html", "Check out my cool new resume I created on BoilerCV! :)")
	message.Attach("./client/build" + info.fileName)

	d := gomail.NewDialer("smtp.gmail.com", 587, "reamer.hudson@gmail.com", "")

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(message); err != nil {
		fmt.Println(err)
		return errors.New("Couldn't send the email :(")
	}

	return nil
}

func changePass(writer http.ResponseWriter, request *http.Request) {
	//Note that the creds struct will be the username and NEW password
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err2 := changePassDB(creds)
	if err2 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func changePassDB(creds Credentials) error {
	//database code to check login
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return errors.New("dbCheckLogin: Could not ping db")
	}

	tsql := fmt.Sprintf("UPDATE BoilerCVdb.dbo.users SET password = @PASSWORD WHERE username = @USERNAME")

	// Execute non-query with named parameters
	_, err2 := db.ExecContext(
		ctx,
		tsql,
		sql.Named("PASSWORD", creds.Password),
		sql.Named("USERNAME", "test12345"))
	if err2 != nil {
		return err2
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
