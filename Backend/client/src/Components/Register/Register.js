import React from "react";
import "./Register.css";

const Register = ({ onClose }) => {
  const handleRegister = () => {
    const url = "userhub";
    window.location = url; // Redirect
  };

  return (
    <div className="register-popup">
      <div className="register-content">
        <button className="exit-button" onClick={onClose}>
          X
        </button>
        <div className="input-container">
          <div className="input-sub-container">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />
          </div>
          <div className="input-sub-container2">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
        </div>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
