import React, { useState } from "react";
import "./Landing.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import GoogleSignInButton from "../GoogleLogin/GoogleSignIn";

const clientId = "262411179008-aasuqij7f6hamq93qbp7s9umsmtac3m7.apps.googleusercontent.com";

const Landing = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
  };

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
            <button className="login-button" onClick={openLogin}>
              Login
            </button>
            <button className="signup-button" onClick={openRegister}>
              Sign Up
            </button>
          </div>
          <GoogleSignInButton>
          </GoogleSignInButton>
        </div>
      </div>
      {isLoginOpen && <Login onClose={closeLogin} />}
      {isRegisterOpen && <Register onClose={closeRegister} />}
    </div>
  );
};

export default Landing;
