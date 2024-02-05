import React from 'react';
import './UserHub.css';
import NavBar from '../NavBar/NavBar';
import CreateResume from '../CreateResume/CreateResume';
import MyResumes from '../MyResumes/MyResumes';
import Preview from '../Preview/Preview';

const UserHub = () => {
  return (
    <div className="user-hub">
      <NavBar />
      <div className="user-hub-content">
        <div className="column">
          <CreateResume />
          <MyResumes />
        </div>
        <div className="preview-container">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default UserHub;
