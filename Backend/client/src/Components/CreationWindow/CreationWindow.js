import React from "react";
import "./CreationWindow.css";

const CreationWindow = ({ onClose }) => {
  return (
    <div className="creation-window-overlay">
      <div className="creation-window">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 style={{ color: "white" }}>This is the Creation Window!</h2>
        <p style={{ color: "white" }}>Editing tools will go here...</p>
      </div>
    </div>
  );
};

export default CreationWindow;
