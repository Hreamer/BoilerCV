import React, { useRef } from "react";
import "./CreationWindow.css";
import Section1 from "./Sections/Section1";

const CreationWindow = ({ onClose }) => {
  const lastSectionRef = useRef(null);

  const scrollToLastSection = () => {
    if (lastSectionRef.current) {
      lastSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="creation-window-overlay">
      <div className="creation-window">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="sidebar">
          <h2 className="menu-subtitle">Menu</h2>
          <ul className="section-list">
            <li onClick={scrollToLastSection}>Section 1</li>
            <li onClick={scrollToLastSection}>Section 2</li>
            <li onClick={scrollToLastSection}>Section 3</li>
          </ul>
        </div>
        <div className="sections-container">
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 />
          <Section1 ref={lastSectionRef} />
        </div>
      </div>
    </div>
  );
};

export default CreationWindow;
