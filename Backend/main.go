package main

import (
	"fmt"
	"io"
	"net/http"
)

// Function takes in a ResponseWriter and the incoming request
// Function is intended to be used to serve all "/" or root requests
func getRoot(writer http.ResponseWriter, request *http.Request) {

	fmt.Println("Received \"/\" request")

	//Write to the response packet
	io.WriteString(writer, "<h1> Hello World <h1>")

	fmt.Println("Root request served")
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

	//Start the server on the desired PORT
	http.ListenAndServe(":3333", nil)
}
