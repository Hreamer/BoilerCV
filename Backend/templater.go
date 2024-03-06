package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"text/template"
)

type Template1Info struct {
	TemplateNum  int
	Username     string
	UUID         string
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

var tmpl1 *template.Template

func createTemplate(writer http.ResponseWriter, request *http.Request) {
	var tmplInfo Template1Info

	//Parse the JSON
	err := json.NewDecoder(request.Body).Decode(&tmplInfo)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	//Check that username is initiated in struct
	//This is needed cause without the username we can't upload to the DB
	//Alternatively we could push this check back to the db step and skip the db step if it is missing
	if tmplInfo.Username == "" {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("Username was not present after parsing")
		return
	}

	//Use struct to fill template
	//For now we will use Std Out to verify results but this can and should be changed at a later date
	err = tmpl1.Execute(os.Stdout, tmplInfo)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("\nError Executing Template 1")
		return
	}

	//Take the result and turn to PDF

	//Send to DB

	//Send to the frontend

	writer.WriteHeader(http.StatusOK)
}
