import React, { forwardRef, useState } from "react";
import "./PersonalInformation.css";

const PersonalInformation = forwardRef((props, ref) => {
  const { personalData, setPersonalData } = props;
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
      setPersonalData(prevState => {
        const updatedSocialMediaLinks = [...prevState.socialMediaLinks];
        updatedSocialMediaLinks.splice(index, 1);
        return {
          ...prevState,
          socialMediaLinks: updatedSocialMediaLinks
        };
      });
    }
  };

  const handleChange = (index, value, setState) => {
    setState((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
    if (setState === setSocialMedia) {
      setSocialMedia(prevSocialMedia => {
        const updatedSocialMedia = [...prevSocialMedia];
        updatedSocialMedia[index] = value;
  
        setPersonalData(prevState => ({
          ...prevState,
          socialMediaLinks: updatedSocialMedia
        }));
  
        return updatedSocialMedia;
      });
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setPersonalData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <div ref={ref} className="section-container">
      {/* Personal Information */}
      <h2>Personal Information</h2>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" style={{ marginRight: "10px" }} onChange={(e) => handleInputChange(e, 'name')} />
        </div>
        <div className="input-item">
          <label htmlFor="phone-number">Phone #:</label>
          <input type="text" id="phone-number" onChange={(e) => handleInputChange(e, 'phoneNumber')} />
        </div>
        <div className="input-item">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" style={{ marginRight: "10px" }} onChange={(e) => handleInputChange(e, 'city')} />
        </div>
      </div>
      <div className="input-group">
        <div className="input-item">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" style={{ marginRight: "10px" }} onChange={(e) => handleInputChange(e, 'state')} />
        </div>
        <div className="input-item" style={{ marginRight: "65px" }}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            style={{ width: "373px", marginRight: "9px" }}
            onChange={(e) => handleInputChange(e, 'address')}
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
            {socialMedia.length < 3 && (
              <button
                className="plus-button"
                onClick={() => addTextbox(setSocialMedia)}
              >
                +
              </button>
            )}
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
                onChange={(e) => handleInputChange(e, 'objectiveStatement')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PersonalInformation;
