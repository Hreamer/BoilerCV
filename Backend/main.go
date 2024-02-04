package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"
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

func createAcc(writer http.ResponseWriter, request *http.Request) {
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}
}

func template1(writer http.ResponseWriter, request *http.Request) {
	//step 1 unmarshall the JSON into the template info struct

	//step 2 use the struct to template the LaTeX

	//write the templated LaTeX to the response packet
}

func main() {
	//HTTP server handler functions
	buildPath := path.Clean("client/build")
	fmt.Printf("/%s/", buildPath)
	http.Handle("/", http.FileServer(http.Dir(buildPath)))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("client/build/static"))))

	http.HandleFunc("/template1", template1)
	http.HandleFunc("/login", checkLogin)
	http.HandleFunc("/createacc", createAcc)

	//Start the server on the desired PORT
	http.ListenAndServe(":3333", nil)
}
