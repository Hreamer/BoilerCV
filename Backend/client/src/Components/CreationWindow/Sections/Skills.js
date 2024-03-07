import React, { forwardRef, useState } from "react";
import "./Skills.css";

const Skills = forwardRef((props, ref) => {
  const [title, setTitle] = useState([""]);
  const [list, setList] = useState([""]);

  const addTextbox = (setState1, setState2) => {
    setState1((prev) => [...prev, ""]);
    setState2((prev) => [...prev, ""]);
  };

  const removeTextbox = (index, setState1, setState2) => {
    if (index !== null) {
      setState1((prev) => {
        if (prev.length > 0) {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        }
        return prev;
      });
      setState2((prev) => {
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
    <div ref={ref} className="section-container">
      {/* Skills Information */}
      <h2>Skills Information</h2>
      <div className="education-information">
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Title Textbox */}
          <div>
            <label style={{ color: "black" }}>Title:</label>
            {title.map((course, index) => (
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
                    handleChange(index, e.target.value, setTitle)
                  }
                />
              </div>
            ))}
            <button
              className="plus-button"
              onClick={() => addTextbox(setTitle, setList)}
            >
              +
            </button>
            {title.length > 1 && (
              <button
                className="minus-button"
                onClick={() =>
                  removeTextbox(title.length - 1, setTitle, setList)
                }
              >
                -
              </button>
            )}
          </div>
          {/* List Textbox */}
          <div>
            <label style={{ color: "black" }}>
              List of Skills:
            </label>
            {list.map((course, index) => (
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
                    handleChange(index, e.target.value, setList)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Skills;
