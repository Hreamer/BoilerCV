import React from "react";
import "./Preview.css";
import targetPDF from "./dummy.pdf";
import ExportLatex from "../ExportLatex/ExportLatex";
import ExportDocx from "../ExportDocx/ExportDocx";

const Preview = () => {
  return (
    <div className="preview">
      <h1>Preview</h1>
      <iframe src={targetPDF} className="previewWindow" title="PDF Viewer"/>
      <div className="top-button-box">
        <div className="export-latex">
          <ExportLatex />
        </div>
        <div className="export-docx">
          <ExportDocx suggestedFilename="myDocument.docx"
            docxContent={{
              "title": 'Dynamic Document',
              "paragraph": 'This document is dynamically generated.',
            }}/>
        </div>
      </div>
    </div>
  );
};

export default Preview;
