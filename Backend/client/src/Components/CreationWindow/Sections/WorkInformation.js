import React, { forwardRef, useState } from "react";

const WorkInformation = forwardRef((props, ref) => {
    const [workExperiences, setWorkExperiences] = useState([
        { id: 1, company: "", role: "", location: "", startDate: "", endDate: "", bullets: [{ id: 1, text: "" }] },
    ]);

    const addSection = () => {
        setWorkExperiences((prevExperiences) => [
          ...prevExperiences,
          { id: Date.now(), company: "", role: "", location: "", startDate: "", endDate: "", bullets: [{ id: Date.now(), text: "" }] },
        ]);
    };
    
    const removeSection = (id) => {
        if (workExperiences.length > 1) {
            setWorkExperiences(prevExperiences => prevExperiences.filter(experience => experience.id !== id));
        }
    };
    
    const handleChange = (sectionIndex, field, value) => {
        setWorkExperiences(prevExperiences => {
            const updatedExperiences = [...prevExperiences];
            updatedExperiences[sectionIndex][field] = value;
            return updatedExperiences;
        });
    };

    const addTextbox = (sectionIndex) => {
        setWorkExperiences(prevExperiences => {
            const updatedExperiences = [...prevExperiences];
            updatedExperiences[sectionIndex].bullets.push({ id: Date.now(), text: "" });
            return updatedExperiences;
        });
    };

    const removeTextbox = (sectionIndex, bulletId) => {
        setWorkExperiences(prevExperiences => {
            const updatedExperiences = [...prevExperiences];
            const bullets = updatedExperiences[sectionIndex].bullets.filter(bullet => bullet.id !== bulletId);
            updatedExperiences[sectionIndex].bullets = bullets;
            return updatedExperiences;
        });
    };

    const handleBulletChange = (sectionIndex, bulletIndex, value) => {
        setWorkExperiences(prevExperiences => {
            const updatedExperiences = [...prevExperiences];
            updatedExperiences[sectionIndex].bullets[bulletIndex].text = value;
            return updatedExperiences;
        });
    };

    return (
        <div className="section-container">
            <h3 ref={ref}>
                Work Information
            </h3>
            {workExperiences.map((work, sectionIndex) => (
            <div key={work.id}>
                <div>
                    <label style={{ color: "black" }}>Company:</label>
                    <input
                    type="text"
                    value={work.company}
                    onChange={(e) => handleChange(sectionIndex, "company", e.target.value)}
                    style={{ width: "300px", marginRight: "10px" }}
                    />
                </div>
                <div>
                    <label style={{ color: "black" }}>Role:</label>
                    <input
                    type="text"
                    value={work.role}
                    onChange={(e) => handleChange(sectionIndex, "role", e.target.value)}
                    style={{ marginRight: "10px" }}
                    />
                    <label style={{ color: "black" }}>Location:</label>
                    <input
                    type="text"
                    value={work.location}
                    onChange={(e) => handleChange(sectionIndex, "location", e.target.value)}
                    style={{ marginRight: "10px" }}
                    />
                </div>
                <div>
                    <label style={{ color: "black" }}>Start Date:</label>
                    <input
                    type="date"
                    value={work.startDate}
                    onChange={(e) => handleChange(sectionIndex, "startDate", e.target.value)}
                    style={{ marginRight: "10px" }}
                    />
                    <label style={{ color: "black" }}>End Date:</label>
                    <input
                    type="date"
                    value={work.endDate}
                    onChange={(e) => handleChange(sectionIndex, "endDate", e.target.value)}
                    />
                </div>
                <div className="work-information">
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                        <div>
                            <label style={{ color: "black" }}>
                                Bullet Points
                            </label>
                            {work.bullets.map((bullet, bulletIndex) => (
                                <div key={bullet.id} style={{ display: "flex", marginBottom: "10px", marginRight: "10px" }}>
                                    <input
                                        style={{ color: "black" }}
                                        type="text"
                                        value={bullet.text}
                                        onChange={(e) => handleBulletChange(sectionIndex, bulletIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                            {work.bullets.length < 5 && (
                                <button onClick={() => addTextbox(sectionIndex)}>+</button>
                            )}
                            {work.bullets.length > 1 && (
                                <button onClick={() => removeTextbox(sectionIndex, work.bullets[work.bullets.length - 1].id)}>-</button>
                            )}
                        </div>
                    </div>
                    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                        {workExperiences.length > 1 && (
                            <button style={{ background: "pink", color: "Red", border: "none" }}
                            onClick={() => removeSection(work.id)}>Remove Work Experience</button>
                        )}
                    </div>
                    <hr style={{ color: "blue", width: "100%", marginTop: "5px", borderTop: "1px solid #0e93c7" }} />
                </div>
            </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
            {workExperiences.length < 5 && (
                <button style={{ background: "white", color: "#0e93c7", border: "dotted" }}
                onClick={addSection}>+ Add Work Experience</button>
            )} 
            </div> 
        </div>
      );
});

export default WorkInformation;