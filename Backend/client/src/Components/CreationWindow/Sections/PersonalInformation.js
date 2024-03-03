import React, { forwardRef, useState } from "react";

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
        <div className="section-container">
            {/* Personal Information */}
            <h3 ref={ref}>
                Personal Information
            </h3>
            <div>
                <label style={{ color: "black" }}>
                Name:
                </label>
                <input type="text" id="name" style={{marginRight: "10px"}}/>
                <label style={{ color: "black" }}>
                Phone #:
                </label>
                <input type="text" id="phone-number" />
            </div>
            <div>
                <label style={{ color: "black" }}>
                City:
                </label>
                <input type="text" id="city" style={{marginRight: "10px"}} />
                <label style={{ color: "black" }}>
                State:
                </label>
                <input type="text" id="state" style={{marginRight: "10px"}} />
            </div>
            <div>
                <label style={{ color: "black" }}>
                Address:
                </label>
                <input type="text" id="address" style={{width: "400px", marginRight: "10px"}} />
            </div>
            <div className="personal-information">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                    {/* Social Media Textbox */}
                    <div>
                        <label style={{ color: "black" }}>
                        Social Media Links
                        </label>
                        {socialMedia.map((course, index) => (
                        <div key={index} style={{ display: "flex", marginBottom: "10px", marginRight: "10px" }}>
                            <input
                            style={{ color: "black" }}
                            type="text"
                            value={course}
                            onChange={(e) => handleChange(index, e.target.value, setSocialMedia)}
                            />
                        </div>
                        ))}
                        {socialMedia.length < 5 && (
                        <button onClick={() => addTextbox(setSocialMedia)}>+</button>
                        )}
                        {socialMedia.length > 1 && (
                        <button onClick={() => removeTextbox(socialMedia.length - 1, setSocialMedia)}>
                            -
                        </button>
                        )}
                    </div>
                    {/* Objective Statement Textbox */}
                    <div>
                        <label style={{ color: "black" }}>
                        Objective Statement
                        </label>
                        <div style={{ display: "flex", marginBottom: "10px", marginRight: "10px" }}>
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