package main

import "net/http"

type Template1Info struct {
	Username string
	Name     string
	Address  string
	PhoneNum string
}

func template1(writer http.ResponseWriter, request *http.Request) {

}
