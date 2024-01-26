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

	io.WriteString(writer, "<h1> Hello World <h1>")

	fmt.Println("Root request served")
}

func main() {
	fmt.Println("Hello World")

	http.HandleFunc("/", getRoot)

	http.ListenAndServe(":3333", nil)
}
