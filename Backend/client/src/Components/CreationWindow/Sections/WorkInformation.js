import React, { forwardRef, useState } from "react";
import "./WorkInformation.css";

const WorkInformation = forwardRef((props, ref) => {
  const { workData, setWorkData } = props;
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [{ id: 1, text: "" }],
    },
  ]);

  const addSection = () => {
    setWorkExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: Date.now(),
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        bullets: [{ id: Date.now(), text: "" }],
      },
    ]);
  };

  const removeSection = (id) => {
    if (workExperiences.length > 1) {
      setWorkExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience.id !== id)
      );
    }
  };

  const handleChange = (sectionIndex, field, value) => {
  setWorkExperiences((prevExperiences) => {
    const updatedExperiences = [...prevExperiences];
    updatedExperiences[sectionIndex][field] = value;
    setWorkData(updatedExperiences); // Update workData with the latest experiences
    return updatedExperiences;
  });
};

const addTextbox = (sectionIndex) => {
  setWorkExperiences((prevExperiences) => {
    const updatedExperiences = [...prevExperiences];
    updatedExperiences[sectionIndex].bullets.push(""); // Push an empty string as bullet
    setWorkData(updatedExperiences); // Update workData with the latest experiences
    return updatedExperiences;
  });
};

const removeTextbox = (sectionIndex, bulletIndex) => {
  setWorkExperiences((prevExperiences) => {
    const updatedExperiences = [...prevExperiences];
    updatedExperiences[sectionIndex].bullets.splice(bulletIndex, 1); 
    setWorkData(updatedExperiences); 
    return updatedExperiences;
  });
};

const handleBulletChange = (sectionIndex, bulletIndex, value) => {
  setWorkExperiences((prevExperiences) => {
    const updatedExperiences = [...prevExperiences];
    updatedExperiences[sectionIndex].bullets[bulletIndex] = value;
    setWorkData(updatedExperiences); 
    return updatedExperiences;
  });
};


  return (
    <div ref={ref} className="section-container">
      <h2>Work Information</h2>
      {workExperiences.map((work, sectionIndex) => (
        <div key={work.id} className="work-experience">
          {/* Company, Role, Location */}
          <div className="input-group">
            <div className="input-item">
              <label
                style={{ marginRight: "0px" }}
                htmlFor={`company-${work.id}`}
              >
                Company:
              </label>
              <input
                type="text"
                id={`company-${work.id}`}
                value={work.company}
                onChange={(e) =>
                  handleChange(sectionIndex, "company", e.target.value)
                }
                style={{ width: "200px", marginRight: "45px" }}
              />
            </div>
            <div className="input-item">
              <label htmlFor={`role-${work.id}`}>Role:</label>
              <input
                type="text"
                id={`role-${work.id}`}
                value={work.role}
                onChange={(e) =>
                  handleChange(sectionIndex, "role", e.target.value)
                }
                style={{ marginRight: "20px" }}
              />
            </div>
            <div className="input-item">
              <label htmlFor={`location-${work.id}`}>Location:</label>
              <input
                type="text"
                id={`location-${work.id}`}
                value={work.location}
                onChange={(e) =>
                  handleChange(sectionIndex, "location", e.target.value)
                }
                style={{ marginRight: "10px", width: "100px" }}
              />
            </div>
          </div>
          {/* Start Date, End Date */}
          <div className="input-group">
            <div className="input-item">
              <label htmlFor={`start-date-${work.id}`}>Start Date:</label>
              <input
                type="date"
                id={`start-date-${work.id}`}
                value={work.startDate}
                onChange={(e) =>
                  handleChange(sectionIndex, "startDate", e.target.value)
                }
                style={{ marginRight: "10px" }}
              />
            </div>
            <div className="input-item" style={{ marginRight: "400px" }}>
              <label htmlFor={`end-date-${work.id}`}>End Date:</label>
              <input
                type="date"
                id={`end-date-${work.id}`}
                value={work.endDate}
                onChange={(e) =>
                  handleChange(sectionIndex, "endDate", e.target.value)
                }
              />
            </div>
          </div>
          {/* Bullet Points */}
          <div className="work-information">
            <label style={{ color: "black" }}>Bullet Points</label>
            {work.bullets.map((bullet, bulletIndex) => (
              <div key={bullet.id} className="bullet">
                <input
                  type="text"
                  value={bullet.text}
                  onChange={(e) =>
                    handleBulletChange(
                      sectionIndex,
                      bulletIndex,
                      e.target.value
                    )
                  }
                  style={{marginRight: "5px"}}
                />
                {bulletIndex === work.bullets.length - 1 && (
                  <button
                    style={{ marginRight: "5px" }}
                    className="plus-button"
                    onClick={() => addTextbox(sectionIndex)}
                  >
                    +
                  </button>
                )}
                {bulletIndex > 0 && (
                  <button
                    className="minus-button"
                    onClick={() => removeTextbox(sectionIndex, bullet.id)}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Remove Section Button */}
          <div className="remove-section-button">
            {workExperiences.length > 1 && (
              <button
                style={{
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "red",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  border: "none",
                  color: "white",
                }}
                onClick={() => removeSection(work.id)}
              >
                Remove Work Experience
              </button>
            )}
          </div>
        </div>
      ))}
      {/* Add Section Button */}
      <div className="add-section-button">
        {workExperiences.length < 5 && (
          <button
            style={{
              marginTop: "5px",
              borderRadius: "5px",
              padding: "5px 10px",
              border: "1px solid #0e93c7",
              backgroundColor: "#0e93c7",
              color: "white",
            }}
            onClick={addSection}
          >
            Add Work Experience
          </button>
        )}
      </div>
    </div>
  );
});

export default WorkInformation;
