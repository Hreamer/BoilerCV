package main

import (
	"testing"
)

func TestEmail(t *testing.T) {

}

func TestChangePassword(t *testing.T) {
	creds := Credentials{"test12345", "tester"}

	err := changePassDB(creds)

	if err != nil {
		t.Error("changePass was unsuccessful")
	}
}

func TestCreateAcc(t *testing.T) {

}

func TestLogin(t *testing.T) {

}
