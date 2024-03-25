package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"gopkg.in/gomail.v2"
)

// Struct for storing email sending information given by client
type EmailInfo struct {
	ToEmail  string
	FileName string
}

func sendEmail(writer http.ResponseWriter, request *http.Request) {
	var info EmailInfo

	err := json.NewDecoder(request.Body).Decode(&info)
	if err != nil {
		fmt.Println("Failed to decode")
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err = useGoMail(info)
	if err != nil {
		fmt.Println("Failed to send email")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func useGoMail(info EmailInfo) error {

	//get an empty mail object
	message := gomail.NewMessage()

	//set up our empty message with what we want
	message.SetHeader("From", "reamer.hudson@gmail.com")
	message.SetHeader("To", info.ToEmail)
	message.SetHeader("Subject", "My Cool New Resume")
	message.SetBody("text/html", "Check out my cool new resume I created on BoilerCV! :)")
	message.Attach("./client/build/static/media/" + info.FileName)

	d := gomail.NewDialer("smtp.gmail.com", 587, "reamer.hudson@gmail.com", "dpim qtqj iwqe iupi")

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(message); err != nil {
		fmt.Println(err)
		return errors.New("Couldn't send the email :(")
	}

	return nil
}
