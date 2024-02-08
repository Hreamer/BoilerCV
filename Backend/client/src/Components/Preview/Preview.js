import React from "react";
import "./Preview.css";
import ExportLatex from "../ExportLatex/ExportLatex";
import ExportDocx from "../ExportDocx/ExportDocx";
import dummyPDF from "./dummy.pdf";
import dummy2PDF from "./dummy2.pdf";

const Preview = ({ openedResume }) => {
  const pdfFile = openedResume === "1" ? dummyPDF : dummy2PDF;

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
      <iframe src={pdfFile} className="previewWindow" title="PDF Viewer" />\
    </div>
  );
};

export default Preview;
