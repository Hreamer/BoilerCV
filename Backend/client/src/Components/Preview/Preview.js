import React from "react";
import "./Preview.css";
import ExportLatex from "../ExportLatex/ExportLatex";
import ExportDocx from "../ExportDocx/ExportDocx";
import SendEmail from "../SendEmail/SendEmail";
import dummyPDF from "./dummy.pdf";
import dummy2PDF from "./dummy2.pdf";


const Preview = ({ openedResume, personalData  }) => {
  const pdfFile = openedResume === "1" ? dummyPDF : dummy2PDF;

  const handleUpdate = () => {
      const Username = localStorage.getItem("username");
      const ResumeName = localStorage.getItem("templateID");
      console.log(personalData);
      fetch("http://localhost:3333/updatePreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username, ResumeName }),
      })
      .then((response) => {
          if (response.ok) {
            // If the response is successful
            
          } else {
            // If there's an error response, set the error state
            
          }
        })
        .catch((error) => {
          // If there's a network error, set the error state
          
      });
  };

  return (
    <div className="preview">
      <h1>Preview</h1>
      <iframe src="http://localhost:3333/userTempls/plswork.pdf" className="previewWindow" title="PDF Viewer" />
      <div className="button-grid">
        <div className="button-item">
          <ExportLatex />
        </div>
        <div className="button-item">
          <ExportDocx
            suggestedFilename="myDocument.docx"
            docxContent={{
              title: "Dynamic Document",
              paragraph: "This document is dynamically generated.",
            }}
          />
        </div>
        <div className="button-item">
          <SendEmail className="email-button" pdf={pdfFile} />
        </div>
        <div className="button-item">
          <button className="update-button" onClick={handleUpdate}>Update Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
