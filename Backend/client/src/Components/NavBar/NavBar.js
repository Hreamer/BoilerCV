import React from "react";
import "./NavBar.css";
import SettingsButton from "../SettingsButton/SettingsButton";
import ExportLatex from "../ExportLatex/ExportLatex";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="title-text">BoilerCV</div>
      <div className="profilecontainer">
        <div className="profile"></div>
      </div>
      <div className="settings">
        <SettingsButton />
      </div>
      <div className="export-latex">
        <ExportLatex />
      </div>
    </div>
  );
};

export default NavBar;
