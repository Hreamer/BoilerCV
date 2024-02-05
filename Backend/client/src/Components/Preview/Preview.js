import React from "react";
import "./Preview.css";
import targetPDF from "./dummy.pdf";

const Preview = () => {
  return (
    <div className="preview">
      <h1>Preview</h1>
      <iframe src={targetPDF} className="previewWindow" title="PDF Viewer"/>
    </div>
  );
};

export default Preview;
