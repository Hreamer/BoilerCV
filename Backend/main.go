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

	//Write to the packet
	io.WriteString(writer, "<h1> Hello World <h1>")

	fmt.Println("Root request served")
}

func main() {
	//HTTP server handler functions
	http.HandleFunc("/", getRoot)

	//Start the server on the desired PORT
	http.ListenAndServe(":3333", nil)
}
