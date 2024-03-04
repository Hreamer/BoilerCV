import React, { forwardRef, useState } from "react";
import "./EducationInformation.css";

const EducationInformation = forwardRef((props, ref) => {
  const [relevantCoursework, setRelevantCoursework] = useState([""]);
  const [honors, setHonors] = useState([""]);
  const [clubs, setClubs] = useState([""]);
  const [certifications, setCertifications] = useState([""]);

  const addTextbox = (setState) => {
    setState((prev) => [...prev, ""]);
  };

  const removeTextbox = (index, setState) => {
    if (index !== null) {
      setState((prev) => {
        if (prev.length > 0) {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        }
        return prev;
      });
    }
  };

  const handleChange = (index, value, setState) => {
    setState((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div className="section-container">
      {/* Education Information */}
      <h2 ref={ref}>Education Information</h2>
      <div className="input-group">
        {/* School Name */}
        <div className="input-item">
          <label htmlFor="school-name">School Name:</label>
          <input type="text" id="school-name" />
        </div>
        {/* Location */}
        <div className="input-item">
          <label htmlFor="school-name">Location:</label>
          <input type="text" id="school-name" />
        </div>
      </div>
      <div className="input-group">
        {/* Degree */}
        <div className="input-item">
          <label htmlFor="degree">Degree:</label>
          <input type="text" id="degree" />
        </div>
        {/* GPA */}
        <div className="input-item">
          <label htmlFor="gpa">GPA:</label>
          <input type="text" id="gpa" />
        </div>
      </div>
      <div className="education-information">
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Relevant Coursework Textbox */}
          <div>
            <label style={{ color: "black" }}>Relevant Coursework</label>
            {relevantCoursework.map((course, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <input
                  style={{ color: "black" }}
                  type="text"
                  value={course}
                  onChange={(e) =>
                    handleChange(index, e.target.value, setRelevantCoursework)
                  }
                />
              </div>
            ))}
            <button
              className="plus-button"
              onClick={() => addTextbox(setRelevantCoursework)}
            >
              +
            </button>
            {relevantCoursework.length > 1 && (
              <button
                className="minus-button"
                onClick={() =>
                  removeTextbox(
                    relevantCoursework.length - 1,
                    setRelevantCoursework
                  )
                }
              >
                -
              </button>
            )}
          </div>
          {/* Honors and Scholarships Textbox */}
          <div>
            <label style={{ color: "black" }}>Honors and Scholarships</label>
            {honors.map((course, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <input
                  style={{ color: "black" }}
                  type="text"
                  value={course}
                  onChange={(e) =>
                    handleChange(index, e.target.value, setHonors)
                  }
                />
              </div>
            ))}
            <button
              className="plus-button"
              onClick={() => addTextbox(setHonors)}
            >
              +
            </button>
            {honors.length > 1 && (
              <button
                className="minus-button"
                onClick={() => removeTextbox(honors.length - 1, setHonors)}
              >
                -
              </button>
            )}
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Certifications Textbox */}
          <div>
            <label style={{ color: "black" }}>Certifications</label>
            {certifications.map((course, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <input
                  style={{ color: "black" }}
                  type="text"
                  value={course}
                  onChange={(e) =>
                    handleChange(index, e.target.value, setCertifications)
                  }
                />
              </div>
            ))}
            <button
              className="plus-button"
              onClick={() => addTextbox(setCertifications)}
            >
              +
            </button>
            {certifications.length > 1 && (
              <button
                className="minus-button"
                onClick={() =>
                  removeTextbox(certifications.length - 1, setCertifications)
                }
              >
                -
              </button>
            )}
          </div>
          {/* Clubs/Recreational Activities Textbox */}
          <div>
            <label style={{ color: "black" }}>
              Clubs/Recreational Activities
            </label>
            {clubs.map((course, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <input
                  style={{ color: "black" }}
                  type="text"
                  value={course}
                  onChange={(e) =>
                    handleChange(index, e.target.value, setClubs)
                  }
                />
              </div>
            ))}
            <button
              className="plus-button"
              onClick={() => addTextbox(setClubs)}
            >
              +
            </button>
            {clubs.length > 1 && (
              <button
                className="minus-button"
                onClick={() => removeTextbox(clubs.length - 1, setClubs)}
              >
                -
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EducationInformation;
