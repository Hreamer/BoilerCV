import React, {useState} from 'react';
import './AccountInfo.css';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SuccessMessage from "../SuccessMessage/SuccessMessage"

const AccountInfo = ({ onClose, username }) => {
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  const handleChangePassword = () => {
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3333/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, redirect to userhub
          const url = "/#/userhub";
          window.location = url;
          setSuccess("Password has been changed");
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
      {success && (
          <SuccessMessage message={success} onClose={() => setSuccess(null)} />
      )}
      <label htmlFor="username">Username:</label>
        <span id="username">{username}</span>
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