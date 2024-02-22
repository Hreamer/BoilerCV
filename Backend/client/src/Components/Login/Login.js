import React, { useState, useEffect } from "react";
import "./Login.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GoogleSignInButton from "../GoogleLogin/GoogleSignIn";
import { gapi } from 'gapi-script';

const clientId = "262411179008-aasuqij7f6hamq93qbp7s9umsmtac3m7.apps.googleusercontent.com";

const Login = ({ onClose }) => {
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    fetch("http://localhost:3333/checkLogin", {
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
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

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
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default Login;
