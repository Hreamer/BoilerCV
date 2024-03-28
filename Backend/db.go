package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

// Struct for storing login information
type Credentials struct {
	Username string
	Password string
}

type ResumeInfo struct {
	Username string
	Name     string
}

type RenameInfo struct {
	Username string
	OldName  string
	NewName  string
}

func dbCheckLogin(creds Credentials) error {

	//database code to check login
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return errors.New("dbCheckLogin: Could not ping db")
	}

	tsql := fmt.Sprintf("SELECT username, password FROM BoilerCVdb.dbo.users WHERE username=@USERNAME AND password=@PASSWORD;")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("USERNAME", creds.Username),
		sql.Named("PASSWORD", creds.Password))

	//depending on the result return all good or error
	var check Credentials
	err2 := row.Scan(&check.Username, &check.Password)
	if err2 == sql.ErrNoRows {
		return errors.New("No users with those credentials exist")
	}
	return nil
}

func checkLogin(writer http.ResponseWriter, request *http.Request) {
	//grabbing the credentials
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		// fmt.Println("Could not decode")
		// fmt.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//check that the credentials are valid
	err2 := dbCheckLogin(creds)
	if err2 != nil {
		// fmt.Println("Could not login")
		// fmt.Println(err2)
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	//If we get here all is good
	writer.WriteHeader(http.StatusOK)
}

func createAcc(writer http.ResponseWriter, request *http.Request) {
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//enforce that all usernames must be unique
	err2 := dbCheckUserNameTaken(creds)
	if err2 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	//if the username is not taken than user credentials
	err3 := addUserToDB(creds)
	if err3 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func addUserToDB(creds Credentials) error {
	ctx := context.Background()
	var err error

	//check if database is initialized
	if db == nil {
		err = errors.New("addUserToDB: db is null")
		return err
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return err
	}

	tsql := `
		INSERT INTO BoilerCVdb.dbo.users (id, username, email, PIN, password) VALUES (NEWID(), @USERNAME, '', 0, @PASSWORD);
		select isNull(SCOPE_IDENTITY(), -1);
		`
	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("USERNAME", creds.Username),
		sql.Named("PASSWORD", creds.Password))

	//Check the returned row for name
	var test string
	err = row.Scan(&test)
	if err != nil {
		return errors.New("AddUsertoDB failed")
	}

	return nil
}

func changePass(writer http.ResponseWriter, request *http.Request) {
	//Note that the creds struct will be the username and NEW password
	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	err3 := dbCheckLogin(creds)
	if err3 == nil {
		writer.WriteHeader(http.StatusConflict)
		return
	}

	err2 := changePassDB(creds)
	if err2 != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func changePassDB(creds Credentials) error {
	//database code to check login
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return errors.New("dbCheckLogin: Could not ping db")
	}

	tsql := fmt.Sprintf("UPDATE BoilerCVdb.dbo.users SET password = @PASSWORD WHERE username = @USERNAME")

	// Execute non-query with named parameters
	_, err2 := db.ExecContext(
		ctx,
		tsql,
		sql.Named("PASSWORD", creds.Password),
		sql.Named("USERNAME", creds.Username))
	if err2 != nil {
		return err2
	}

	return nil
}

func dbCheckUserNameTaken(creds Credentials) error {
	//database code to check login
	ctx := context.Background()

	//SQL Query
	tsql := fmt.Sprintf("SELECT username FROM BoilerCVdb.dbo.users WHERE username=@USERNAME")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("USERNAME", creds.Username))

	//depending on the result return all good or error
	var check string
	err2 := row.Scan(&check)
	if err2 == sql.ErrNoRows {
		return nil
	}
	return errors.New("User with that username already exists")
}

func getResumeList(writer http.ResponseWriter, request *http.Request) {

	var creds Credentials

	err := json.NewDecoder(request.Body).Decode(&creds)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
	}
	//database code to check login
	ctx := context.Background()

	//SQL Query
	tsql := fmt.Sprintf("SELECT TemplateName FROM BoilerCVdb.dbo.resume WHERE username=@USERNAME")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	defer stmt.Close()

	//executing the call
	rows, err := stmt.QueryContext(
		ctx,
		sql.Named("USERNAME", creds.Username))
	if err != nil {
		fmt.Println("Failed to get resume list")
		fmt.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//depending on the result return all good or error

	names := []string{}
	for rows.Next() {
		var r string
		err = rows.Scan(&r)
		names = append(names, r)
	}

	payload, err3 := json.Marshal(names)
	if err3 != nil {
		fmt.Println("Failed to marshall the resume list")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	fmt.Println(payload)
	writer.WriteHeader(http.StatusOK)
	writer.Write(payload)
}

// Takes in a ResumeInfo struct which contains information needed
// and creates a DB entry for the resume tied to the user who made it
func dbCreateResume(template ResumeInfo) error {

	//Create Resume in Database will all empty fields
	ctx := context.Background()
	var err error

	//check if database is initialized
	if db == nil {
		err = errors.New("dbCreateResume: db is null")
		return err
	}

	// Check if database is alive.
	err = db.PingContext(ctx)
	if err != nil {
		return err
	}

	tsql := `
		INSERT INTO BoilerCVdb.dbo.resume (TemplateName, Username, UUID) VALUES (@TEMPLATENAME, @USERNAME, NEWID());
		select isNull(SCOPE_IDENTITY(), -1);
		`
	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("TEMPLATENAME", template.Name),
		sql.Named("USERNAME", template.Username))

	//Check the returned row for name
	var test string
	err = row.Scan(&test)
	if err != nil {
		return errors.New("dbCreateResume failed")
	}

	return nil
}

// Takes a resume name and username and returns the resume from that user with that name's info
func dbGetResumeInfo(info ResumeInfo) (Template1Info, error) {
	var targetInfo Template1Info

	//database code to get resume info
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return targetInfo, errors.New("dbGetResumeInfo: Could not ping db")
	}

	//Query
	tsql := fmt.Sprintf("SELECT * FROM BoilerCVdb.dbo.resume WHERE TemplateName=@TEMPLATENAME AND Username=@USERNAME;")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		return targetInfo, err
	}
	defer stmt.Close()

	//executing the call
	row := stmt.QueryRowContext(
		ctx,
		sql.Named("TEMPLATENAME", info.Name),
		sql.Named("USERNAME", info.Username))

	//depending on the result return all good or error
	//var check ResumeInfo
	err2 := row.Scan(&targetInfo.TemplateNum, &targetInfo.TemplateName, &targetInfo.Username, &targetInfo.UUID, &targetInfo.Name,
		&targetInfo.Address, &targetInfo.PhoneNum, &targetInfo.Email, &targetInfo.UniName, &targetInfo.UniCity, &targetInfo.UniState,
		&targetInfo.ExpectedGrad, &targetInfo.Gpa, &targetInfo.CourseWork, &targetInfo.Honors1, &targetInfo.Honors2, &targetInfo.Honors3,
		&targetInfo.Cert1, &targetInfo.Cert2, &targetInfo.Cert3, &targetInfo.Club1, &targetInfo.Club2, &targetInfo.Club3, &targetInfo.CompName1,
		&targetInfo.CompCity, &targetInfo.CompState, &targetInfo.CompTitle, &targetInfo.CompLength, &targetInfo.Comp1Description1, &targetInfo.Comp1Description2,
		&targetInfo.Comp1Description3, &targetInfo.CompName2, &targetInfo.CompCity2, &targetInfo.CompState2, &targetInfo.CompTitle2, &targetInfo.CompLength2,
		&targetInfo.Comp2Description1, &targetInfo.Comp2Description2, &targetInfo.Comp2Description3, &targetInfo.CompName3, &targetInfo.CompCity3, &targetInfo.CompCity3,
		&targetInfo.CompState3, &targetInfo.CompTitle3, &targetInfo.CompLength3, &targetInfo.Comp3Description1, &targetInfo.Comp3Description2, &targetInfo.Comp3Description3,
		&targetInfo.Title1, &targetInfo.SkillDesc1, &targetInfo.Title2, &targetInfo.SkillDesc2, &targetInfo.Title3, &targetInfo.SkillDesc3, &targetInfo.Proj1Name, &targetInfo.Proj1Start,
		&targetInfo.Proj1End, &targetInfo.Proj1Desc, &targetInfo.Proj1Bullet1, &targetInfo.Proj1Bullet2, &targetInfo.Proj1Bullet3, &targetInfo.Proj2Name, &targetInfo.Proj2Start,
		&targetInfo.Proj2End, &targetInfo.Proj2Desc, &targetInfo.Proj2Bullet1, &targetInfo.Proj2Bullet2, &targetInfo.Proj2Bullet3, &targetInfo.Proj3Name, &targetInfo.Proj3Start,
		&targetInfo.Proj3End, &targetInfo.Proj3Desc, &targetInfo.Proj3Bullet1, &targetInfo.Proj3Bullet2, &targetInfo.Proj3Bullet3)

	if err2 == sql.ErrNoRows {
		return targetInfo, errors.New("No resumes with those credentials exist")
	}
	return targetInfo, nil
}

// updates the template specified by Template1Info with the new information entered
func dbUpdateResumeInfo(info Template1Info) error {

	//database code to check login
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return errors.New("dbUpdateResumeInfo: Could not ping db")
	}

	tsql := fmt.Sprintf(`UPDATE BoilerCVdb.dbo.resume 
	SET TemplateNum=@TEMPLATENUM, Name=@NAME, Address=@ADDRESS, PhoneNum=@PHONENUM, Email=@EMAIL, UniName=@UNINAME, UniCity=@UNICITY, UniState=@UNISTATE, ExpectedGrad=@EXPECTEDGRAD, Gpa=@GPA,
	CourseWork=@COURSEWORK, Honors1=@HONORS1, Honors2=@HONORS2, Honors3=@HONORS3, Cert1=@CERT1, Cert2=@CERT2, Cert3=@CERT3, Club1=@CLUB1, Club2=@CLUB2, Club3=@CLUB3, CompName1=@COMPNAME1,
	CompCity=@COMPCITY, CompState=@COMPSTATE, CompTitle=@COMPTITLE, CompLength=@COMPLENGTH, Comp1Description1=@COMP1DESCRIPTION1, Comp1Description2=@COMP1DESCRIPTION2, Comp1Description3=COMP1DESCRIPTION3,
	CompName2=@COMPNAME2, CompCity2=@COMPCITY2, CompState2=@COMPSTATE2, CompTitle2=@COMPTITLE2, CompLength2=@COMPLENGTH2, Comp2Description1=@COMP2DESCRIPTION1, Comp2Description2=@COMP2DESCRIPTION2,
	Comp2Description3=@COMP2DESCRIPTION3, CompName3=@COMPNAME3, CompCity3=@COMPCITY3, CompState3=@COMPSTATE3, CompTitle3=@COMPTITLE3, CompLength3=@COMPLENGTH3, Comp3Description1=@COMP3DESCRIPTION1,
	Comp3Description2=@COMP3DESCRIPTION2, Comp3Description3=@COMP3DESCRIPTION3, Title1=@TITLE1, SkillDesc1=@SKILLDESC1, Title2=@TITLE2, SkillDesc2=@SKILLDESC2, Title3=@TITLE3, SkillDesc3=@SKILLDESC3,
	Proj1Name=@PROJ1NAME, Proj1Start=@PROJ1START, Proj1End=@PROJ1END, Proj1Desc=@PROJ1DESC, Proj1Bullet1=@PROJ1BULLET1, Proj1Bullet2=@PROJ1BULLET2, Proj1Bullet3=@PROJ1BULLET3,
	Proj2Name=@PROJ2NAME, Proj2Start=@PROJ2START, Proj2End=@PROJ2END, Proj2Desc=@PROJ2DESC, Proj2Bullet1=@PROJ2BULLET1, Proj2Bullet2=@PROJ2BULLET2, Proj2Bullet3=@PROJ2BULLET3,
	Proj3Name=@PROJ3NAME, Proj3Start=@PROJ3START, Proj3End=@PROJ3END, Proj3Desc=@PROJ3DESC, Proj3Bullet1=@PROJ3BULLET1, Proj3Bullet2=@PROJ3BULLET2, Proj3Bullet3=@PROJ3BULLET3
	WHERE Username=@USERNAME AND TemplateName=@TEMPLATENAME;`)

	// Execute non-query with named parameters
	_, err2 := db.ExecContext(
		ctx,
		tsql,
		sql.Named("TEMPLATENAME", info.TemplateName),
		sql.Named("USERNAME", info.Username),
		sql.Named("TEMPLATENUM", info.TemplateNum),
		sql.Named("NAME", info.Name),
		sql.Named("ADDRESS", info.Address),
		sql.Named("PHONENUM", info.PhoneNum),
		sql.Named("EMAIL", info.Email),
		sql.Named("UNINAME", info.UniName),
		sql.Named("UNICITY", info.UniCity),
		sql.Named("UNISTATE", info.UniState),
		sql.Named("EXPECTEDGRAD", info.ExpectedGrad),
		sql.Named("GPA", info.Gpa),
		sql.Named("COURSEWORK", info.CourseWork),
		sql.Named("HONORS1", info.Honors1),
		sql.Named("HONORS2", info.Honors2),
		sql.Named("HONORS3", info.Honors3),
		sql.Named("CERT1", info.Cert1),
		sql.Named("CERT2", info.Cert2),
		sql.Named("CERT3", info.Cert3),
		sql.Named("CLUB1", info.Club1),
		sql.Named("CLUB2", info.Club2),
		sql.Named("CLUB3", info.Club3),
		sql.Named("COMPNAME1", info.CompName1),
		sql.Named("COMPCITY", info.CompCity),
		sql.Named("COMPSTATE", info.CompState),
		sql.Named("COMPTITLE", info.CompTitle),
		sql.Named("COMPLENGTH", info.CompLength),
		sql.Named("COMP1DESCRIPTION1", info.Comp1Description1),
		sql.Named("COMP1DESCRIPTION2", info.Comp1Description2),
		sql.Named("COMP1DESCRIPTION3", info.Comp1Description3),
		sql.Named("COMPNAME2", info.CompName2),
		sql.Named("COMPCITY2", info.CompCity2),
		sql.Named("COMPSTATE2", info.CompState2),
		sql.Named("COMPTITLE2", info.CompTitle2),
		sql.Named("COMPLENGTH2", info.CompLength2),
		sql.Named("COMP2DESCRIPTION1", info.Comp2Description1),
		sql.Named("COMP2DESCRIPTION2", info.Comp2Description2),
		sql.Named("COMP2DESCRIPTION3", info.Comp2Description3),
		sql.Named("COMPNAME3", info.CompName3),
		sql.Named("COMPCITY3", info.CompCity3),
		sql.Named("COMPSTATE3", info.CompState3),
		sql.Named("COMPTITLE3", info.CompTitle3),
		sql.Named("COMPLENGTH3", info.CompLength3),
		sql.Named("COMP3DESCRIPTION1", info.Comp3Description1),
		sql.Named("COMP3DESCRIPTION2", info.Comp3Description2),
		sql.Named("COMP3DESCRIPTION3", info.Comp3Description3),
		sql.Named("TITLE1", info.Title1),
		sql.Named("SKILLDESC1", info.SkillDesc1),
		sql.Named("TITLE2", info.Title2),
		sql.Named("SKILLDESC2", info.SkillDesc2),
		sql.Named("TITLE3", info.Title3),
		sql.Named("SKILLDESC3", info.SkillDesc3),
		sql.Named("PROJ1NAME", info.Proj1Name),
		sql.Named("PROJ1START", info.Proj1Start),
		sql.Named("PROJ1END", info.Proj1End),
		sql.Named("PROJ1DESC", info.Proj1Desc),
		sql.Named("PROJ1BULLET1", info.Proj1Bullet1),
		sql.Named("PROJ1BULLET2", info.Proj1Bullet2),
		sql.Named("PROJ1BULLET3", info.Proj1Bullet3),
		sql.Named("PROJ2NAME", info.Proj2Name),
		sql.Named("PROJ2START", info.Proj2Start),
		sql.Named("PROJ2END", info.Proj2End),
		sql.Named("PROJ2DESC", info.Proj2Desc),
		sql.Named("PROJ2BULLET1", info.Proj2Bullet1),
		sql.Named("PROJ2BULLET2", info.Proj2Bullet2),
		sql.Named("PROJ2BULLET3", info.Proj2Bullet3),
		sql.Named("PROJ3NAME", info.Proj3Name),
		sql.Named("PROJ3START", info.Proj3Start),
		sql.Named("PROJ3END", info.Proj3End),
		sql.Named("PROJ3DESC", info.Proj3Desc),
		sql.Named("PROJ3BULLET1", info.Proj3Bullet1),
		sql.Named("PROJ3BULLET2", info.Proj3Bullet2),
		sql.Named("PROJ3BULLET3", info.Proj3Bullet3))

	if err2 != nil {
		return err2
	}

	return nil
}

// Deletes the resume given the information passed
func deleteResumeDB(writer http.ResponseWriter, request *http.Request) {

	var info ResumeInfo

	err := json.NewDecoder(request.Body).Decode(&info)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}
	//database code to delete resume
	ctx := context.Background()
	err2 := db.PingContext(ctx)
	if err2 != nil {
		return
	}

	//SQL Query
	tsql := fmt.Sprintf("DELETE FROM BoilerCVdb.dbo.resume WHERE Username=@USERNAME AND TemplateName=@TEMPLATENAME;")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer stmt.Close()

	//executing the call
	_, err3 := stmt.ExecContext(
		ctx,
		sql.Named("USERNAME", info.Username),
		sql.Named("TEMPLATENAME", info.Name))
	if err3 != nil {
		fmt.Println("Failed to delete resume")
		fmt.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//depending on the result return all good or error
	writer.WriteHeader(http.StatusOK)
}

// Renames the resume passed with the new name passed
func renameResumeDB(writer http.ResponseWriter, request *http.Request) {

	var info RenameInfo

	err := json.NewDecoder(request.Body).Decode(&info)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}
	//database code to rename resume
	ctx := context.Background()
	err2 := db.PingContext(ctx)
	if err2 != nil {
		return
	}

	//SQL Query
	tsql := fmt.Sprintf("UPDATE FROM BoilerCVdb.dbo.resume SET TemplateName=@NEWTEMPLATENAME WHERE Username=@USERNAME AND TemplateName=@OLDTEMPLATENAME;")

	//getting the query ready to be edited via the call
	stmt, err := db.Prepare(tsql)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer stmt.Close()

	//executing the call
	_, err3 := stmt.ExecContext(
		ctx,
		sql.Named("USERNAME", info.Username),
		sql.Named("NEWTEMPLATENAME", info.NewName),
		sql.Named("OLDTEMPLATENAME", info.OldName))
	if err3 != nil {
		fmt.Println("Failed to rename resume")
		fmt.Println(err)
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	//return all good if rename correct
	writer.WriteHeader(http.StatusOK)
}
