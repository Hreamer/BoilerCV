import React from "react";
import "./ExportLatex.css";

const ExportLatex = ({ sugestedFilename, latexContent }) => {
  const downloadLatexFile = (filename, content) => {
    const latexContent = `
      \\documentclass{article}
      \\begin{document}
      Hello, this is a simple LaTeX document.
      \\end{document}
    `;

    const blob = new Blob([latexContent], { type: "application/x-latex" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename || "document.tex";
    link.click();
  };

  return (
    <button className="latex-button" onClick={downloadLatexFile}>
      Export LaTeX File
    </button>
  );
};

export default ExportLatex;
