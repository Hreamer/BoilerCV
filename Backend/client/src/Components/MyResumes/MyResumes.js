import React from "react";
import "./MyResumes.css";
import ResumeCard from "./ResumeCard";

const onRename = (oldName) => {
  let resumeList = localStorage.getItem("resumes");
  resumeList = resumeList ? JSON.parse(resumeList) : [];
  const confirmation = window.confirm("Rename resume?");
  if (confirmation) {
    var newName = "";
    let index = -1;
    do {
      newName = prompt("Enter a new name:");
      index = resumeList.indexOf(newName);
      if (index !== -1) {
        alert("There is already a Resume with that name!");
      }
    } while (newName === "" || index !== -1)
    index = resumeList.indexOf(oldName);
    resumeList[index] = newName;
    localStorage.setItem("resumes", JSON.stringify(resumeList));
    if (newName !== null) {
      alert("Will rename to " + newName + "!");
    }
    const username = localStorage.getItem("username");
    fetch("http://localhost:3333/renameResume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, oldName, newName }),
    }).then((response) => {
      if (response.ok) {
        // If the response is successful
        console.log("Rename was sucessfull in the DB");
      } else {
        // If there's an error response, set the error state
        throw new Error('Network response was not ok');
      }
      //window.location.reload();
    }).catch((error) => {
      // If there's a network error, set the error state
      console.error('Error Renaming Resume:', error);
    });
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
      const username = localStorage.getItem("username");
      const name = resumeID;
      fetch("http://localhost:3333/deleteResume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name }),
      }).then((response) => {
        if (response.ok) {
          // If the response is successful
          console.log("Deletion was sucessfull in the DB");
        } else {
          // If there's an error response, set the error state
          throw new Error('Network response was not ok');
        }
      }).catch((error) => {
        // If there's a network error, set the error state
        console.error('Error Deleting Resume:', error);
      });
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
