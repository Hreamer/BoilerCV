package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

// Struct for storing login information
type Credentials struct {
	Username string
	Password string
}

type ResumeInfo struct {
	Username string
	Name     string
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

	//enforce that all usernames must be unique
	err2 := dbCheckUserNameTaken(creds)
	if err2 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	//if the username is not taken than user credentials
	err3 := addUserToDB(creds)
	if err3 != nil {
		writer.WriteHeader(http.StatusBadRequest)
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

func changePass(writer http.ResponseWriter, request *http.Request) {
	//Note that the creds struct will be the username and NEW password
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err3 := dbCheckLogin(creds)
	if err3 == nil {
		writer.WriteHeader(http.StatusConflict)
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
		sql.Named("USERNAME", creds.Username))
	if err2 != nil {
		return err2
	}

	return nil
}

func dbCheckUserNameTaken(creds Credentials) error {
	//database code to check login
	ctx := context.Background()

	//SQL Query
	tsql := fmt.Sprintf("SELECT username FROM BoilerCVdb.dbo.users WHERE username=@USERNAME")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("USERNAME", creds.Username))

	//depending on the result return all good or error
	var check string
	err2 := row.Scan(&check)
	if err2 == sql.ErrNoRows {
		return nil
	}
	return errors.New("User with that username already exists")
}

func getResumeList(writer http.ResponseWriter, request *http.Request) {

	payload, err3 := json.Marshal([]string{"Test 1", "Test 2", "Pls Work"})
	if err3 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
	writer.Write(payload)
}

// Takes in a ResumeInfo struct which contains information needed
// and creates a DB entry for the resume tied to the user who made it
func dbCreateResume(template ResumeInfo) error {

	//Create Resume in Database will all empty fields

	return nil
}

// Takes a resume name and username and returns the resume from that user with that name's info
func dbGetResumeInfo(info ResumeInfo) (Template1Info, error) {
	var targetInfo Template1Info

	return targetInfo, nil
}

// updates the template specified by Template1Info with the new information entered
func dbUpdateResumeInfo(info Template1Info) error {

	return nil
}
