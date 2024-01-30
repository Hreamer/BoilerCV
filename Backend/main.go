package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

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

// Function takes in a ResponseWriter and the incoming request
// Function is intended to be used to serve all "/" or root requests
func getRoot(writer http.ResponseWriter, request *http.Request) {

	fmt.Println("Received \"/\" request")

	//Write to the response packet
	io.WriteString(writer, "<h1> Hello World <h1>")

	fmt.Println("Root request served")
}

func checkLogin(writer http.ResponseWriter, request *http.Request) {
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//now that we have the credentials we query the database

	//Check the database response and return appropiatly
}

func template1(writer http.ResponseWriter, request *http.Request) {
	//step 1 unmarshall the JSON into the template info struct

	//step 2 use the struct to template the LaTeX

	//write the templated LaTeX to the response packet
}

func main() {
	//HTTP server handler functions
	http.HandleFunc("/", getRoot)
	http.HandleFunc("/template1", template1)
	http.HandleFunc("/login", checkLogin)

	//Start the server on the desired PORT
	http.ListenAndServe(":3333", nil)
}
