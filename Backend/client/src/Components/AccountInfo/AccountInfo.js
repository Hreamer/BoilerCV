import React from 'react';
import './AccountInfo.css'; // Create a separate CSS file for styling

const AccountInfo = ({ onClose, currentUsername }) => {
  const handleLogin = () => {
    alert("Doing a Thing...");
    // Add code here to do the thing
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="account-popup">
    <div className="login-content" onClick={stopPropagation}>
      <button className="exit-button" onClick={onClose}>X</button>
      <div className="input-container">
      <div className="input-sub-container">
        <label htmlFor="username">Username:</label>
        <span id="username">{currentUsername}</span>
      </div>
      <div className="input-sub-container2">
        <label htmlFor="password">New Password:</label>
        <input type="password" id="password" />
      </div>
      </div>
      <button className="login-button" onClick={handleLogin}>Change Password</button>
    </div>
  </div>
  );
};

export default AccountInfo;