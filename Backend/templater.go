package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"text/template"
)

type Template1Info struct {
	TemplateNum  int
	TemplateName string
	Username     string
	UUID         string
	Name         string
	Address      string
	PhoneNum     string
	Email        string

	//Education Info
	UniName      string
	UniCity      string
	UniState     string
	ExpectedGrad string
	Gpa          string
	CourseWork   string
	Honors1      string
	Honors2      string
	Honors3      string
	Cert1        string
	Cert2        string
	Cert3        string
	Club1        string
	Club2        string
	Club3        string

	//Work Information
	CompName1         string
	CompCity          string
	CompState         string
	CompTitle         string
	CompLength        string
	Comp1Description1 string
	Comp1Description2 string
	Comp1Description3 string

	CompName2         string
	CompCity2         string
	CompState2        string
	CompTitle2        string
	CompLength2       string
	Comp2Description1 string
	Comp2Description2 string
	Comp2Description3 string

	CompName3         string
	CompCity3         string
	CompState3        string
	CompTitle3        string
	CompLength3       string
	Comp3Description1 string
	Comp3Description2 string
	Comp3Description3 string

	//Skills
	Title1     string
	SkillDesc1 string
	Title2     string
	SkillDesc2 string
	Title3     string
	SkillDesc3 string

	//Project Information
	Proj1Name    string
	Proj1Start   string
	Proj1End     string
	Proj1Desc    string
	Proj1Bullet1 string
	Proj1Bullet2 string
	Proj1Bullet3 string

	Proj2Name    string
	Proj2Start   string
	Proj2End     string
	Proj2Desc    string
	Proj2Bullet1 string
	Proj2Bullet2 string
	Proj2Bullet3 string

	Proj3Name    string
	Proj3Start   string
	Proj3End     string
	Proj3Desc    string
	Proj3Bullet1 string
	Proj3Bullet2 string
	Proj3Bullet3 string

	Languages    string
	Technologies string
	Concepts     string
}

var tmpl1 *template.Template

func updatePreview(writer http.ResponseWriter, request *http.Request) {
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

	//open/create file with name of UUID + .tex
	fileName := fmt.Sprintf("./userTempls/%s-%s.tex", tmplInfo.Username, tmplInfo.TemplateName)
	file, err2 := os.Create(fileName)
	defer file.Close()
	if err2 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("Could not create file for user")
		return
	}

	//Use struct to fill template
	//For now we will use Std Out to verify results but this can and should be changed at a later date
	err = tmpl1.Execute(file, tmplInfo)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("\nError Executing Template 1")
		return
	}

	//Take the result and turn to PDF
	//pdflatex -output-directory="./userTempls" -jobname="username-templname" filename
	jobName := fmt.Sprintf("-jobname=%s-%s", tmplInfo.Username, tmplInfo.TemplateName)
	fmt.Println(fmt.Sprintf("-output-directory=./userTempls"))
	fmt.Println(fileName)
	fmt.Println(jobName)
	cmd := exec.Command("pdflatex", "-output-directory=./userTempls", jobName, fileName)
	_, err = cmd.Output()
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("\nError Compiling Template")
		return
	}

	//Send to DB
	dbUpdateResumeInfo(tmplInfo)

	//return status to frontend
	writer.WriteHeader(http.StatusOK)
}

func createTemplate(writer http.ResponseWriter, request *http.Request) {
	//grab the new template info(Name, Username)
	var tmplInfo ResumeInfo

	//Parse the JSON
	err := json.NewDecoder(request.Body).Decode(&tmplInfo)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	//Create a new resume entry
	dbCreateResume(tmplInfo)

	writer.WriteHeader(http.StatusOK)
}

// This function is for when the client wants to open a users resume and display
// the info to the user to edit
func getResumeInfo(writer http.ResponseWriter, request *http.Request) {
	//grab the new template info(Name, Username)
	var tmplInfo ResumeInfo

	//Parse the JSON
	err := json.NewDecoder(request.Body).Decode(&tmplInfo)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	info, err2 := dbGetResumeInfo(tmplInfo)
	if err2 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	//marshall JSON into the packet and return
	payload, err3 := json.Marshal(info)
	if err3 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
	writer.Write(payload)
}
