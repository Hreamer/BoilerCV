import React, { useState } from "react";
import "./UserHub.css";
import NavBar from "../NavBar/NavBar";
import CreateResume from "../CreateResume/CreateResume";
import MyResumes from "../MyResumes/MyResumes";
import Preview from "../Preview/Preview";
import CreationWindow from "../CreationWindow/CreationWindow";

let resumeList = localStorage.getItem("resumes");
resumeList = resumeList ? JSON.parse(resumeList) : [];

const UserHub = () => {
  const [openedResume, setOpenedResume] = useState(null);
  const [showCreationWindow, setShowCreationWindow] = useState(false);

  const openCreationWindow = (templateID) => {
    setShowCreationWindow(true);
    localStorage.setItem("templateID", templateID);
    setOpenedResume(templateID);
  };

  const onCreate = (templateID) => {
    resumeList = localStorage.getItem("resumes");
    resumeList = resumeList ? JSON.parse(resumeList) : [];
    console.log(resumeList);
    var ResumeName = "";
    const username = localStorage.getItem("username");
    do {
      ResumeName = prompt("Enter a resume name:");
    } while (ResumeName === "")

    if (ResumeName !== null) {
      alert("Will name to " + ResumeName + "!");
    }
    resumeList.push(ResumeName);
    localStorage.setItem("resumes", JSON.stringify(resumeList));
    fetch("http://localhost:3333/createTemplate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, ResumeName }),
    })
    .then((response) => {
      if (response.ok) {
        // If the response is successful
        
      } else {
        // If there's an error response, set the error state
        
      }
    })
    .catch((error) => {
      // If there's a network error, set the error state
      
    });
    window.location.reload();
  };

  return (
    <div className="user-hub">
      <NavBar data-testid="navbar" />
      <div className="user-hub-content">
        <div className="column">
          <CreateResume onCreate={onCreate}/>
          <MyResumes onOpenResume={openCreationWindow} />
          {showCreationWindow && (
            <CreationWindow onClose={() => setShowCreationWindow(false)} />
          )}
        </div>
        <div className="preview-container">
          <Preview data-testid="preview" openedResume={openedResume} />
        </div>
      </div>
    </div>
  );
};

export default UserHub;
