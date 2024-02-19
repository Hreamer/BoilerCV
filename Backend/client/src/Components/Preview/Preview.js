import React from "react";
import "./Preview.css";
import ExportLatex from "../ExportLatex/ExportLatex";
import ExportDocx from "../ExportDocx/ExportDocx";
import SendEmail from "../SendEmail/SendEmail";
import dummyPDF from "./dummy.pdf";
import dummy2PDF from "./dummy2.pdf";

const Preview = ({ openedResume }) => {
  const pdfFile = openedResume === "1" ? dummyPDF : dummy2PDF;

  return (
    <div className="preview">
      <h1>Preview</h1>
      <iframe src={pdfFile} className="previewWindow" title="PDF Viewer" />
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
          <button className="update-button">Update Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
