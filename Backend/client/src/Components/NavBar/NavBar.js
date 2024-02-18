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

  return (
    <div className="navbar">
      <div className="title-text">BoilerCV</div>
      <div className="profilecontainer">
        <div className="profile" onClick={openAccountInfo}></div>
      </div>
      {isAccountInfoOpen && <AccountInfo onClose={closeAccountInfo} currentUsername={localStorage.getItem("username")} />}
    </div>
  );
};

export default NavBar;
