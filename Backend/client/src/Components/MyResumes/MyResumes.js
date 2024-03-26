import React from "react";
import "./MyResumes.css";
import ResumeCard from "./ResumeCard";

const onRename = (oldName) => {
  let resumeList = localStorage.getItem("resumes");
  resumeList = resumeList ? JSON.parse(resumeList) : [];
  const confirmation = window.confirm("Rename resume?");
  if (confirmation) {
    var newName = "";
    do {
      newName = prompt("Enter a new name:");
    } while (newName === "")
    const index = resumeList.indexOf(oldName);
    if (index !== -1) {
      resumeList[index] = newName;
      localStorage.setItem("resumes", JSON.stringify(resumeList));
      if (newName !== null) {
        alert("Will rename to " + newName + "!");
      }
    } else {
      alert("Resume not found in the list.");
    }
    if (newName !== null) {
      alert("Will rename to " + newName + "!");
      window.location.reload();
    }
  } else {
    alert("Will not rename.");
  }
};

const MyResumes = ({ onOpenResume }) => {
  const [resumeList, setResumeList] = React.useState(JSON.parse(localStorage.getItem("resumes")) || []);

  const onDelete = (resumeID) => {
    const confirmation = window.confirm("Delete resume?");
    if (confirmation) {
      const updatedResumeList = resumeList.filter(name => name !== resumeID); // Remove the selected resume from the array
      setResumeList(updatedResumeList); // Update the state with the new resume list
      localStorage.setItem("resumes", JSON.stringify(updatedResumeList)); // Update localStorage
    } else {
      alert("Will not delete.");
    }
  };

  return (
    <div className="my-resumes">
      <h1>My Resumes</h1>
      <div className="icon-grid">
        {resumeList.length > 0 && resumeList.map(name => (
          <ResumeCard
            imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            key={name} // Using name as the key since it's unique
            resumeName={name}
            onOpen={() => onOpenResume(name)}
            onRename={() => onRename(name)}
            onDelete={() => onDelete(name)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyResumes;
