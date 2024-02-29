import React, { useState } from "react";
import "./CreationWindow.css";

const CreationWindow = ({ onClose }) => {
  const [showGPA, setShowGPA] = useState(false);
  const [relevantCoursework, setRelevantCoursework] = useState("");
  const [honors, setHonors] = useState("");
  const [clubs, setClubs] = useState("");
  const [certifications, setCertifications] = useState("");
  
  return (
    <div className="creation-window-overlay">
      <div className="creation-window">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 style={{ color: "white" }}>This is the Creation Window!</h2>
        <p style={{ color: "white" }}>Editing tools will go here...</p>
        {/* Education Information */}
        <div className="education-information">
          <strong style={{ color: "white" }}>Education Information</strong>
          {/* Show GPA Toggle */}
          <div>
            <label style={{ color: "white" }}>
              Show GPA
              <input
                type="checkbox"
                checked={showGPA}
                onChange={() => setShowGPA(!showGPA)}
              />
            </label>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            {/* Relevant Coursework Textbox */}
            <div style={{marginRight: "10px"}}>
              <label style={{ color: "white" }}>
                Relevant Coursework
              </label>
              <input style={{ color: "black"}}
                  type="text"
                  value={relevantCoursework}
                  onChange={(e) => setRelevantCoursework(e.target.value)}
                />
            </div>

            {/* Honors and Scholarships Textbox */}
            <div style={{marginRight: "10px"}}>
              <label style={{ color: "white" }}>
                Honors and Scholarships
              </label>
              <input style={{ color: "black"}}
                  type="text"
                  value={honors}
                  onChange={(e) => setHonors(e.target.value)}
                />
            </div>

            {/* Clubs/Recreational Activities Textbox */}
            <div>
              <label style={{ color: "white" }}>
                Clubs and Recreational Activities
              </label>
              <input style={{ color: "black"}}
                  type="text"
                  value={clubs}
                  onChange={(e) => setClubs(e.target.value)}
                />
            </div>
          </div>

          

          {/* Certifications Textbox */}
          <div>
            <label style={{ color: "white" }}>
              Certifications
            </label>
            <input style={{ color: "black"}}
                type="text"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationWindow;
