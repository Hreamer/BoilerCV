import React, { forwardRef, useState } from "react";
import "./PersonalInformation.css";

const PersonalInformation = forwardRef((props, ref) => {
  const [socialMedia, setSocialMedia] = useState([""]);

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
    <div ref={ref} className="section-container">
      {/* Personal Information */}
      <h2>Personal Information</h2>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" style={{ marginRight: "10px" }} />
        </div>
        <div className="input-item">
          <label htmlFor="phone-number">Phone #:</label>
          <input type="text" id="phone-number" />
        </div>
        <div className="input-item">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" style={{ marginRight: "10px" }} />
        </div>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" style={{ marginRight: "10px" }} />
        </div>
        <div className="input-item" style={{ marginRight: "65px" }}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            style={{ width: "373px", marginRight: "9px" }}
          />
        </div>
      </div>
      <div className="personal-information">
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Social Media Textbox */}
          <div>
            <label style={{ color: "black" }}>Social Media Links</label>
            {socialMedia.map((course, index) => (
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
                    handleChange(index, e.target.value, setSocialMedia)
                  }
                />
              </div>
            ))}
            <button
              className="plus-button"
              onClick={() => addTextbox(setSocialMedia)}
            >
              +
            </button>
            {socialMedia.length > 1 && (
              <button
                className="minus-button"
                onClick={() =>
                  removeTextbox(socialMedia.length - 1, setSocialMedia)
                }
              >
                -
              </button>
            )}
          </div>
          {/* Objective Statement Textbox */}
          <div>
            <label style={{ color: "black" }}>Objective Statement</label>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                marginRight: "10px",
              }}
            >
              <input
                style={{ color: "black" }}
                type="text"
                id="obj-statement"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PersonalInformation;
