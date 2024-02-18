import React, {useState} from 'react';
import './AccountInfo.css';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const AccountInfo = ({ onClose, currentUsername }) => {
  const [error, setError] = useState(null);

  const handleChangePassword = () => {
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3333/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUsername, password }),
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, redirect to userhub
          const url = "/#/userhub";
          window.location = url;
        } else {
          // If there's an error response, set the error state
          setError("Error: Refused.");
        }
      })
      .catch((error) => {
        // If there's a network error, set the error state
        setError("Error: Network error.");
      });
  };

  return (
    <div className="account-popup">
    <div className="profile-content">
      <button className="exit-button" onClick={onClose}>X</button>
      {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
      )}
      <label htmlFor="username">Username:</label>
        <span id="username">{currentUsername}</span>
      <div className="input-container">
      <div className="input-sub-container2">
        <label htmlFor="password">New Password:</label>
        <input type="password" id="password" />
      </div>
      </div>
      <button className="change-password-button" onClick={handleChangePassword}>Change Password</button>
    </div>
  </div>
  );
};

export default AccountInfo;