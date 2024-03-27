import React, { useRef, useState } from "react";
import "./CreationWindow.css";
import EducationInformation from "./Sections/EducationInformation";
import PersonalInformation from "./Sections/PersonalInformation";
import WorkInformation from "./Sections/WorkInformation";
import Projects from "./Sections/Projects";
import Skills from "./Sections/Skills";


const CreationWindow = ({ onClose, personalData, setPersonalData, educationData, setEducationData }) => {  
  const personalRef = useRef(null);
  const educationRef = useRef(null);
  const workRef = useRef(null);
  const projectRef = useRef(null);
  const skillsRef = useRef(null);

  const scrollToPersonalSection = () => {
    if (personalRef.current) {
      personalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const scrollToEducationSection = () => {
    if (educationRef.current) {
      educationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const scrollToWorkSection = () => {
    if (workRef.current) {
      workRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const scrollToProjectSection = () => {
    if (projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSkillsSection = () => {
    if (skillsRef.current) {
      skillsRef.current.scrollIntoView({ behavior: "smooth" });
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
            <li onClick={scrollToPersonalSection}>Personal Information</li>
            <li onClick={scrollToEducationSection}>Education Information</li>
            <li onClick={scrollToWorkSection}>Work Information</li>
            <li onClick={scrollToSkillsSection}>Skills Information</li>
            <li onClick={scrollToProjectSection}>Project Information</li>
          </ul>
        </div>
        <div className="sections-container">
          <PersonalInformation ref={personalRef} personalData={personalData} setPersonalData={setPersonalData} />
          <EducationInformation ref={educationRef} educationData={educationData} setEducationData={setEducationData}/>
          <WorkInformation ref={workRef} />
          <Skills ref={skillsRef} />
          <Projects ref={projectRef} />
        </div>
      </div>
    </div>
  );
};

export default CreationWindow;
