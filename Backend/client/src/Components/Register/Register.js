import React, { useState } from "react";
import "./Register.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Register = ({ onClose }) => {
  const [error, setError] = useState(null);

  const handleRegister = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3333/createAcc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, redirect to userhub
          localStorage.setItem("username", username);
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
