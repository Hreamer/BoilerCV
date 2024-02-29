import React, { forwardRef, useState } from "react";

const EducationInformation = forwardRef((props, ref) => {
  const [showGPA, setShowGPA] = useState(false);
  const [relevantCoursework, setRelevantCoursework] = useState("");
  const [honors, setHonors] = useState("");
  const [clubs, setClubs] = useState("");
  const [certifications, setCertifications] = useState("");
  return (
    <div className="section-container">
      <h3 ref={ref}>
        Education Information
      </h3>
      {/* Education Information */}
      <div className="education-information">
        
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Relevant Coursework Textbox */}
          <div style={{marginRight: "10px"}}>
            <label style={{ color: "black" }}>
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
            <label style={{ color: "black" }}>
              Honors and Scholarships
            </label>
            <input style={{ color: "black"}}
                type="text"
                value={honors}
                onChange={(e) => setHonors(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Certifications Textbox */}
          <div style={{marginRight: "10px"}}>
            <label style={{ color: "black" }}>
              Certifications
            </label>
            <input style={{ color: "black"}}
                type="text"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
              />
          </div>
          {/* Clubs/Recreational Activities Textbox */}
          <div>
            <label style={{ color: "black" }}>
              Clubs and Recreational Activities
            </label>
            <input style={{ color: "black"}}
                type="text"
                value={clubs}
                onChange={(e) => setClubs(e.target.value)}
              />
          </div>
        </div>
        {/* Show GPA Toggle */}
        <div>
          <label style={{ color: "Black" }}>
            Show GPA
            <input
              type="checkbox"
              checked={showGPA}
              onChange={() => setShowGPA(!showGPA)}
            />
          </label>
        </div>
      </div>
    </div>
  );
});

export default EducationInformation;
