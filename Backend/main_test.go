package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"testing"
	"text/template"
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

func TestTemplate1(t *testing.T) {
	tmpl1, err := template.New("T1.tmpl").ParseFiles("./templates/T1.tmpl")

	if err != nil {
		t.Error("Error parsing template 1")
		return
	}

	file, err2 := os.Create("TestTemplate1.txt")
	defer file.Close()
	if err2 != nil {
		t.Error("File creation failed")
		return
	}

	tmplInfo := Template1Info{
		TemplateNum:  0,
		Username:     "",
		UUID:         "",
		FName:        "Hudson",
		LName:        "Reamer",
		Address:      "8044 Heyward Dr",
		PhoneNum:     "317-727-1854",
		Email:        "thehappyhud@gmail.com",
		UniName:      "Purdue",
		UniCity:      "West Lafeyette",
		UniState:     "Indiana",
		ExpectedGrad: "May 2025",
		Gpa:          "3.0",
		CourseWork:   "Operating Systems, Compilers, 381",
		CompName1:    "Spaulding Ridge",
		CompCity:     "Chicago",
		CompState:    "Illinois",
		CompTitle:    "Consultant",
		CompLength:   "2020-2021",
		Description1: "Fixed things",
		Description2: "Talked to folks",
		Description3: "Had a good time :)",
		ProjName:     "",
		ProjTech:     "",
		ProjDesc1:    "",
		ProjDesc2:    "",
		ProjDesc3:    "",
		Languages:    "Rust, Go, Python, C++, C",
		Technologies: "Docker, Unix, VSCode",
		Concepts:     "Compilers, Operating Systems, Cloud Computing",
	}

	err = tmpl1.Execute(file, tmplInfo)
	if err != nil {
		t.Error("Error executing template\n")
		fmt.Println(err)
		return
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
