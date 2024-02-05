import React, { useState } from "react";
import "./Register.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Register = ({ onClose }) => {
  const [error, setError] = useState(null);

  const handleRegister = () => {
    const password = "error";

    if (password === "register") {
      const url = "/#/userhub";
      window.location = url; // Redirect
    } else {
      setError("Error: Refused.");
    }
  };

  return (
    <div className="register-popup">
      <div className="register-content">
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
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
