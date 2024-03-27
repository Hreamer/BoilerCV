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
    const resumeList = [];
    localStorage.setItem("resumes", JSON.stringify(resumeList));
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
          fetch("http://localhost:3333/getResumeList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
          ).then(response => {
            console.log(response);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
          }).then((resumeData) => {
            if (Object.keys(resumeData).length === 0 && resumeData.constructor === Object) {
              // Handle empty response
              console.log("No resumes found.");
            } else {
              for (const key in resumeData) {
                resumeList.push(resumeData[key]);
              }
            }
            localStorage.setItem("resumes", JSON.stringify(resumeList));
            const url = "/#/userhub";
            window.location = url;
            window.location.reload();
          }).catch((error) => {
            console.error('Error fetching data:', error);
            const url = "/#/userhub";
            // window.location = url;
            // window.location.reload();
          });
          
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
