import React, { forwardRef, useState } from "react";
import "./Projects.css";

const Projects = forwardRef((props, ref) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      bullets: [{ id: 1, text: "" }],
    },
  ]);

  const addSection = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        id: Date.now(),
        name: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        bullets: [{ id: Date.now(), text: "" }],
      },
    ]);
  };

  const removeSection = (id) => {
    if (projects.length > 1) {
      setProjects((prevProjects) =>
        prevProjects.filter((experience) => experience.id !== id)
      );
    }
  };

  const handleChange = (sectionIndex, field, value) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[sectionIndex][field] = value;
      return updatedProjects;
    });
  };

  const addTextbox = (sectionIndex) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[sectionIndex].bullets.push({
        id: Date.now(),
        text: "",
      });
      return updatedProjects;
    });
  };

  const removeTextbox = (sectionIndex, bulletId) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      const bullets = updatedProjects[sectionIndex].bullets.filter(
        (bullet) => bullet.id !== bulletId
      );
      updatedProjects[sectionIndex].bullets = bullets;
      return updatedProjects;
    });
  };

  const handleBulletChange = (sectionIndex, bulletIndex, value) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[sectionIndex].bullets[bulletIndex].text = value;
      return updatedProjects;
    });
  };

  return (
    <div className="section-container">
      <h3 ref={ref}>Projects</h3>
      {projects.map((project, sectionIndex) => (
        <div key={project.id} className="project-experience">
          {/* Project Name */}
          <div className="input-group">
            <div className="input-item">
              <label
                style={{ marginRight: "0px" }}
                htmlFor={`project-${project.id}`}
              >
                Project Name:
              </label>
              <input
                type="text"
                id={`project-${project.id}`}
                value={project.name}
                onChange={(e) =>
                  handleChange(sectionIndex, "name", e.target.value)
                }
                style={{ width: "200px", marginRight: "45px" }}
              />
            </div>
          </div>
          {/* Start Date, End Date */}
          <div className="input-group">
            <div className="input-item">
              <label htmlFor={`start-date-${project.id}`}>Start Date:</label>
              <input
                type="date"
                id={`start-date-${project.id}`}
                value={project.startDate}
                onChange={(e) =>
                  handleChange(sectionIndex, "startDate", e.target.value)
                }
                style={{ marginRight: "10px" }}
              />
            </div>
            <div className="input-item" style={{ marginRight: "400px" }}>
              <label htmlFor={`end-date-${project.id}`}>End Date:</label>
              <input
                type="date"
                id={`end-date-${project.id}`}
                value={project.endDate}
                onChange={(e) =>
                  handleChange(sectionIndex, "endDate", e.target.value)
                }
              />
            </div>
          </div>
          {/* Project Description */}
          <div className="input-group">
            <div className="input-item">
              <label htmlFor={`start-date-${project.id}`}>Description:</label>
              <input
                type="text"
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) =>
                  handleChange(sectionIndex, "description", e.target.value)
                }
                style={{ width: "600px"}}
              />
            </div>
          </div>
          {/* Bullet Points */}
          <div className="projects">
            <label style={{ color: "black" }}>Bullet Points</label>
            {project.bullets.map((bullet, bulletIndex) => (
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
                {bulletIndex === project.bullets.length - 1 && (
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
            {projects.length > 1 && (
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
                onClick={() => removeSection(project.id)}
              >
                Remove Project
              </button>
            )}
          </div>
        </div>
      ))}
      {/* Add Section Button */}
      <div className="add-section-button">
        {projects.length < 5 && (
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
            Add Project
          </button>
        )}
      </div>
    </div>
  );
});

export default Projects;
