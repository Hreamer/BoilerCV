import React from "react";
import "./MyResumes.css";
import ResumeCard from "./ResumeCard";

const MyResumes = ({ onOpenResume }) => {
  return (
    <div className="my-resumes">
      <h1>My Resumes</h1>
      <div className="icon-grid">
        <ResumeCard
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          resumeName="Resume 1"
          onOpen={() => onOpenResume("1")}
        />
        <ResumeCard
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          resumeName="Resume 2"
          onOpen={() => onOpenResume("2")}
        />
      </div>
    </div>
  );
};

export default MyResumes;
