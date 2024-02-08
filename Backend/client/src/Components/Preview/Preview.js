import React from "react";
import "./Preview.css";
import dummyPDF from "./dummy.pdf";
import dummy2PDF from "./dummy2.pdf";

const Preview = () => {
  const openedValue = localStorage.getItem("opened");

  const pdfFile = openedValue === "1" ? dummyPDF : dummy2PDF;

  return (
    <div className="preview">
      <h1>Preview</h1>
      <iframe src={pdfFile} className="previewWindow" title="PDF Viewer" />
    </div>
  );
};

export default Preview;
