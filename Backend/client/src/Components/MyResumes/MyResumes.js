import React from "react";
import "./MyResumes.css";
import ResumeCard from "./ResumeCard";

const onRename = (resumeID) => {
  const confirmation = window.confirm("Rename resume?");
  if (confirmation) {
    var newName = "";
    do {
      newName = prompt("Enter a new name:");
    } while (newName === "")

    if (newName !== null) {
      alert("Will rename to " + newName + "!");
    }
  } else {
    alert("Will not rename.");
  }
};

const onDelete = (resumeID) => {
  const confirmation = window.confirm("Delete resume?");
  if (confirmation) {
    alert("Will delete.");
  } else {
    alert("Will not delete.");
  }
};

const MyResumes = ({ onOpenResume }) => {
  return (
    <div className="my-resumes">
      <h1>My Resumes</h1>
      <div className="icon-grid">
        <ResumeCard
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          resumeName="Resume 1"
          onOpen={() => onOpenResume("1")}
          onRename={() => onRename()}
          onDelete={() => onDelete()}
        />
        <ResumeCard
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          resumeName="Resume 2"
          onOpen={() => onOpenResume("2")}
          onRename={() => onRename()}
          onDelete={() => onDelete()}
        />
      </div>
    </div>
  );
};

export default MyResumes;
