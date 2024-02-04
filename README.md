# BoilerCV
An online resume creation tool that allows you to produce beautiful looking LaTeX resumes with no experience 

### Sprint 1   
- [ ] As a user, I would like to create/login using my BoilerCV account  
- [ ] As a user, I want to be able to login to BoilerCV with my Google account  
- [ ] As a user, I would like to be able to change my password to my BoilerCV account  
- [ ] As a user, I would like to be able to choose from different resume templates  
- [ ] As a user, I would like to export my resume to a PDF    
- [ ] As a user, I would like to export my resume to a LaTeX file  
- [ ] As a user, I would like to export my resume to a doc file  
- [ ] As a user, I’d like the ability to “express export” and share my resume via mail  
- [ ] As a user, I would like to be able to open a saved resume in BoilerCV  
- [ ] As a user, I want to see updates to my resume through a preview window  

### How to test  
To test the app simply `cd` into the Backend folder and run `go run main.go`. This will start the backend service on the port 3333(Port number could change but for now it works).  
For the Frontend team. To develop your project just cd into the client folder and run `npm start`. If you want to test using the backend inside the client folder run 'npm run build'. This will bundle your work in a folder called build. From there `cd ..` back into the backend folder and run 'go run main.go'. This will start the server on local host port 3333.