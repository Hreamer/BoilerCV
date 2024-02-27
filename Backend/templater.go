package main

import "net/http"

type Template1Info struct {
	Username     string
	FName        string
	LName        string
	Address      string
	PhoneNum     string
	UniName      string
	ExpectedGrad string
	Gpa          string
	CourseWork   string
	CompName1    string
	CompCity     string
	CompState    string
	ProjName     string
	ProjTech     string
	ProjDesc1    string
	ProjDesc2    string
	ProjDesc3    string
	Languages    string
	Technologies string
	Concepts     string
}

func createTemplate1(writer http.ResponseWriter, request *http.Request) {
	//Parse the JSON

	//Check that username is initiated in struct

	//Use struct to fill template

	//Take the result and turn to PDF

	//Send to the frontend

	writer.WriteHeader(http.StatusOK)
}
