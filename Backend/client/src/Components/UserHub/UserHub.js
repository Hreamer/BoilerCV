import React, { useState } from "react";
import "./UserHub.css";
import NavBar from "../NavBar/NavBar";
import CreateResume from "../CreateResume/CreateResume";
import MyResumes from "../MyResumes/MyResumes";
import Preview from "../Preview/Preview";
import CreationWindow from "../CreationWindow/CreationWindow";

const UserHub = () => {
  const [openedResume, setOpenedResume] = useState(null);
  const [showCreationWindow, setShowCreationWindow] = useState(false);

  const openCreationWindow = (templateID) => {
    setShowCreationWindow(true);
    localStorage.setItem("templateID", templateID);
  };

  return (
    <div className="user-hub">
      <NavBar data-testid="navbar" />
      <div className="user-hub-content">
        <div className="column">
          <CreateResume onCreate={openCreationWindow}/>
          <MyResumes onOpenResume={setOpenedResume} />
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
