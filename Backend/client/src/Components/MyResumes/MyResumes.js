import React from "react";
import "./MyResumes.css";
import ResumeCard from "./ResumeCard";

const onRename = (resumeID) => {
  alert("Rename!");
};

const onDelete = (resumeID) => {
  alert("Delete!");
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
