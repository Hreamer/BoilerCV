import React from 'react';
import "./ExportDocx.css";
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';

const ExportDocx = ({ suggestedFilename, docxContent }) => {
    const downloadDocxFile = (filename, content) => {
        const exampleContent = {
            title: 'Dynamic Document',
            paragraph: 'This document is dynamically generated.',
            items: ['Item 1', 'Item 2', 'Item 3'],
        };
        fetch("/template.docx").then((response) => {
            response.blob().then((blob) => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "testFile.docx";
            a.click();
            });
        });
    };
    /*
    const downloadDocxFile = (filename, content) => {
        // Create a new Docxtemplater instance
        const doc = new Docxtemplater();
        // Fetch the template.docx from the public folder
        fetch("/template.docx")
          .then((response) => response.blob())
          .then((templateBlob) => {
            const reader = new FileReader();
            reader.onload = () => {
                const templateBuffer = reader.result;
                // Load the template into docxtemplater
                doc.loadZip(templateBuffer);
        
                // Set the data in the template using dynamic content
                doc.setData(content);
        
                // Perform the template rendering
                doc.render();
        
                // Get the rendered document as a blob
                const blob = doc.getZip().generate({ type: 'blob' });
        
                // Save the blob as a .docx file
                saveAs(blob, filename || 'document.docx');
            }
            reader.readAsArrayBuffer(templateBlob);
          })
          .catch((error) => {
            console.error('Error loading template:', error);
          });
      };*/

    return (
        <button className="docx-button" onClick={() => downloadDocxFile(suggestedFilename, docxContent)}>
        Download DOCX File
        </button>
    );
};

export default ExportDocx;