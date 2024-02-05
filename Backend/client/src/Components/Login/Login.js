import React from "react";
import "./Login.css";

const Login = ({ onClose }) => {
  const handleLogin = () => {
    const url = "/#/userhub";
    window.location = url; // Redirect
  };

  return (
    <div className="login-popup">
      <div className="login-content">
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
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
