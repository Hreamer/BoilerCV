import React from "react";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="overlay">
        <div className="panel">
          <div className="title-container">
            <div className="title">
              <p>BoilerCV</p>
            </div>
          </div>
          <div className="logo-container">
            <div className="logo"></div>
          </div>
          <div className="button-container">
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
