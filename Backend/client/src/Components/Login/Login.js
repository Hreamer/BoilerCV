import React, { useState } from "react";
import "./Login.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Login = ({ onClose }) => {
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const password = "login";

    if (password === "login") {
      const url = "/#/userhub";
      window.location = url; // Redirect
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-popup">
      <div className="login-content">
        <button className="exit-button" onClick={onClose}>
          X
        </button>
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}
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
