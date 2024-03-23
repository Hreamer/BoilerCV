import React, { useState } from "react";
import "./NavBar.css";
import AccountInfo from "../AccountInfo/AccountInfo";

const NavBar = () => {
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);

  const openAccountInfo = () => {
    setIsAccountInfoOpen(true);
  }
  const closeAccountInfo = () => {
    setIsAccountInfoOpen(false);
  }
  const signOut = () => {
    localStorage.removeItem("username");
    const url = "/";
    window.location = url;
    localStorage.setItem("resumes", "[]");
  }

  return (
    <div className="navbar">
      <div className="title-text">BoilerCV</div>
      <div className="profilecontainer">
        <div className="profile" onClick={openAccountInfo}></div>
        <button className="sign-out" onClick={signOut}>Sign Out</button>
      </div>
      {isAccountInfoOpen && <AccountInfo onClose={closeAccountInfo} username={localStorage.getItem("username")} />}
    </div>
  );
};

export default NavBar;
