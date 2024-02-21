package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"testing"
)

func init() {
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
}

func TestEmail(t *testing.T) {
	info := EmailInfo{"thehappyhud@gmail.com", "dummy2.1dfb0ae3d6241abed86e.pdf"}

	err := useGoMail(info)

	if err != nil {
		t.Error("Failed to send email")
	}
}

func TestCreateAcc(t *testing.T) {
	creds := Credentials{"tester1234567", "tester12345"}

	err := addUserToDB(creds)

	if err != nil {
		t.Error("Account Creation Failed")
	}
}

func TestChangePassword(t *testing.T) {
	creds := Credentials{"tester1234567", "tester123"}

	err := changePassDB(creds)

	if err != nil {
		t.Error("changePass was unsuccessful")
	}
}

func TestLogin(t *testing.T) {
	creds := Credentials{"thebeast", "thebeast"}

	err := dbCheckLogin(creds)

	if err != nil {
		t.Error("Account Login Failed")
	}
}

func TestCreateAccDuplicateUsername(t *testing.T) {
	creds := Credentials{"tester1234567", "qwerty"}

	err := dbCheckUserNameTaken(creds)
	if err != nil {
		t.Error("Error occured during duplicate name checking")
	}
}

func TestCleanup(t *testing.T) {
	creds := Credentials{"tester1234567", "tester123"}

	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		t.Error("Database is down and cleanup could not be performed")
		return
	}

	//Code to cleanup test user
	tsql := fmt.Sprintf("DELETE FROM BoilerCVdb.dbo.users WHERE username=@USERNAME")

	// Execute non-query with named parameters
	_, err2 := db.ExecContext(ctx, tsql, sql.Named("USERNAME", creds.Username))
	if err2 != nil {
		t.Error("Cleanup Query had a problem")
		return
	}
}
