import React, { useState } from 'react';
import './UserHub.css';
import NavBar from '../NavBar/NavBar';
import CreateResume from '../CreateResume/CreateResume';
import MyResumes from '../MyResumes/MyResumes';
import Preview from '../Preview/Preview';

const UserHub = () => {
  const [openedResume, setOpenedResume] = useState(null);

  return (
    <div className="user-hub">
      <NavBar data-testid="navbar"/>
      <div className="user-hub-content">
        <div className="column">
          <CreateResume />
          <MyResumes onOpenResume={setOpenedResume} />
        </div>
        <div className="preview-container">
          <Preview data-testid="preview" openedResume={openedResume} />
        </div>
      </div>
    </div>
  );
};

export default UserHub;
