import React, { forwardRef, useState } from "react";
import "./Skills.css";

const Skills = forwardRef((props, ref) => {
  const [skills, setSkills] = useState([{ title: "", list: "" }]);

  const addTextbox = () => {
    setSkills([...skills, { title: "", list: "" }]);
  };

  const removeTextbox = (index) => {
    if (index !== null) {
      setSkills((prev) => {
        if (prev.length > 1) {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        }
        return prev;
      });
    }
  };

  const handleChange = (index, field, value) => {
    setSkills((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  return (
    <div ref={ref} className="section-container">
      {/* Skills Information */}
      <h2>Skills Information</h2>
      <div className="education-information">
        {skills.map((skill, index) => (
          <div key={index}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              {/* Title Textbox */}
              <div>
                <label style={{ color: "black" }}>Title:</label>
                <input
                  style={{ color: "black" }}
                  type="text"
                  value={skill.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                />
              </div>
              {/* List Textbox */}
              <div>
                <label style={{ color: "black" }}>List of Skills:</label>
                <input
                  style={{ color: "black" }}
                  type="text"
                  value={skill.list}
                  onChange={(e) =>
                    handleChange(index, "list", e.target.value)
                  }
                />
              </div>
              {/* Remove button */}
              {skills.length > 1 && (
                <button
                  className="minus-button"
                  onClick={() => removeTextbox(index)}
                >
                  -
                </button>
              )}
            </div>
          </div>
        ))}
        <button style={{ marginTop: "5px",
              borderRadius: "5px",
              padding: "5px 10px",
              border: "1px solid #0e93c7",
              backgroundColor: "#0e93c7",
              width: "100px",
              marginTop: "-6px",
              color: "white" }} className="plus-button" onClick={addTextbox}>
          Add Section
        </button>
      </div>
    </div>
  );
});

export default Skills;
