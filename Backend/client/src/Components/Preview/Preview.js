import React, { useState } from "react";
import "./Preview.css";
import ExportLatex from "../ExportLatex/ExportLatex";
import ExportDocx from "../ExportDocx/ExportDocx";
import SendEmail from "../SendEmail/SendEmail";
import dummyPDF from "./dummy.pdf";
import dummy2PDF from "./dummy2.pdf";


const Preview = ({ openedResume, personalData, educationData, skillsData, projectData, workData  }) => {
  const pdfFile = openedResume === "1" ? dummyPDF : dummy2PDF;
  const [username, setUsername] = useState();
  const [templateID, setTemplateID] = useState();

  const handleUpdate = () => {
    setTemplateID(localStorage.getItem("templateID"));
    setUsername(localStorage.getItem("username"));
    const TemplateNum   = 1;
    const TemplateName  = localStorage.getItem("templateID");
    const Username      = localStorage.getItem("username");
    const UUID          = "";
    const Name          = personalData.name;
    const Address       = personalData.city + personalData.state + personalData.address;
    const PhoneNum      = personalData.phoneNumber;
    const Email         = "";
  
    //Education Info
    const UniName       = educationData.schoolName;
    const UniCity       = educationData.city;
    const UniState      = educationData.state;
    const ExpectedGrad  = "";
    const Gpa           = educationData.gpa;
    const CourseWork    = educationData.relevantCoursework && educationData.relevantCoursework[0] ? educationData.relevantCoursework[0] : "";
    const Honors1 = educationData.honors && educationData.honors[0] ? educationData.honors[0] : "";
    const Honors2 = educationData.honors && educationData.honors[1] ? educationData.honors[1] : "";
    const Honors3 = educationData.honors && educationData.honors[2] ? educationData.honors[2] : "";
    const Cert1 = educationData.certifications && educationData.certifications[0] ? educationData.certifications[0] : "";
    const Cert2 = educationData.certifications && educationData.certifications[1] ? educationData.certifications[1] : "";
    const Cert3 = educationData.certifications && educationData.certifications[2] ? educationData.certifications[2] : "";
    const Club1 = educationData.clubs && educationData.clubs[0] ? educationData.clubs[0] : "";
    const Club2 = educationData.clubs && educationData.clubs[1] ? educationData.clubs[1] : "";
    const Club3 = educationData.clubs && educationData.clubs[2] ? educationData.clubs[2] : "";
    
  
    //Work Information
    const CompName1          = workData && workData[0].company ? workData[0].company : "";
    const CompCity           = workData && workData[0].location ? workData[0].location : "";
    const CompState          = "";
    const CompTitle          = workData && workData[0].role ? workData[0].role : "";
    const CompLength         = "";
    const Comp1Description1  = workData[0].bullets && workData[0].bullets[0] ? workData[0].bullets[0] : "";
    const Comp1Description2  = workData[0].bullets && workData[0].bullets[1] ? workData[0].bullets[1] : "";
    const Comp1Description3  = workData[0].bullets && workData[0].bullets[2] ? workData[0].bullets[2] : "";
  
    const CompName2          = "";
    const CompCity2          = "";
    const CompState2         = "";
    const CompTitle2         = "";
    const CompLength2        = "";
    const Comp2Description1  = "";
    const Comp2Description2  = "";
    const Comp2Description3  = "";
  
    const CompName3          = "";
    const CompCity3          = "";
    const CompState3         = "";
    const CompTitle3         = "";
    const CompLength3        = "";
    const Comp3Description1  = "";
    const Comp3Description2  = "";
    const Comp3Description3  = "";
  
    //Skills
    const Title1 = skillsData.title && skillsData.title[0] ? skillsData.title[0] : "";
    const SkillDesc1 = skillsData.listOfSkills && skillsData.listOfSkills[0] ? skillsData.listOfSkills[0] : "";
    const Title2 = skillsData.title && skillsData.title[1] ? skillsData.title[1] : "";
    const SkillDesc2 = skillsData.listOfSkills && skillsData.listOfSkills[1] ? skillsData.listOfSkills[1] : "";
    const Title3 = skillsData.title && skillsData.title[2] ? skillsData.title[2] : "";
    const SkillDesc3 = skillsData.listOfSkills && skillsData.listOfSkills[2] ? skillsData.listOfSkills[2] : "";    
  
    //Project Information
    const Proj1Name     = "";
    const Proj1Start    = "";
    const Proj1End      = "";
    const Proj1Desc     = "";
    const Proj1Bullet1  = "";
    const Proj1Bullet2  = "";
    const Proj1Bullet3  = "";
  
    const Proj2Name     = "";
    const Proj2Start    = "";
    const Proj2End      = "";
    const Proj2Desc     = "";
    const Proj2Bullet1  = "";
    const Proj2Bullet2  = "";
    const Proj2Bullet3  = "";
  
    const Proj3Name     = "";
    const Proj3Start    = "";
    const Proj3End      = "";
    const Proj3Desc     = "";
    const Proj3Bullet1  = "";
    const Proj3Bullet2  = "";
    const Proj3Bullet3  = "";
  
    const Languages = "";
    const Technologies = "";
    const Concepts = "";
    fetch("http://localhost:3333/updatePreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 	TemplateNum,
        TemplateName ,
        Username     ,
        UUID         ,
        Name         ,
        Address      ,
        PhoneNum     ,
        Email        ,
      
        //Education Info
        UniName      ,
        UniCity      ,
        UniState     ,
        ExpectedGrad ,
        Gpa          ,
        CourseWork   ,
        Honors1      ,
        Honors2      ,
        Honors3      ,
        Cert1        ,
        Cert2        ,
        Cert3        ,
        Club1        ,
        Club2        ,
        Club3        ,
      
        //Work Information
        CompName1         ,
        CompCity          ,
        CompState         ,
        CompTitle         ,
        CompLength        ,
        Comp1Description1 ,
        Comp1Description2 ,
        Comp1Description3 ,
      
        CompName2         ,
        CompCity2         ,
        CompState2        ,
        CompTitle2        ,
        CompLength2       ,
        Comp2Description1 ,
        Comp2Description2 ,
        Comp2Description3 ,
      
        CompName3         ,
        CompCity3         ,
        CompState3        ,
        CompTitle3        ,
        CompLength3       ,
        Comp3Description1 ,
        Comp3Description2 ,
        Comp3Description3 ,
      
        //Skills
        Title1     ,
        SkillDesc1 ,
        Title2     ,
        SkillDesc2 ,
        Title3     ,
        SkillDesc3 ,
      
        //Project Information
        Proj1Name    ,
        Proj1Start   ,
        Proj1End     ,
        Proj1Desc    ,
        Proj1Bullet1 ,
        Proj1Bullet2 ,
        Proj1Bullet3 ,
      
        Proj2Name    ,
        Proj2Start   ,
        Proj2End     ,
        Proj2Desc    ,
        Proj2Bullet1 ,
        Proj2Bullet2 ,
        Proj2Bullet3 ,
      
        Proj3Name    ,
        Proj3Start   ,
        Proj3End,
        Proj3Desc,
        Proj3Bullet1,
        Proj3Bullet2,
        Proj3Bullet3,
      
        Languages,
        Technologies,
        Concepts }),
    })
    .then((response) => {
        if (response.ok) {
          // If the response is successful
          console.log("Update Preview Returned OK");
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
      <iframe src="http://localhost:3333/userTempls/${username}-${templateID}.pdf" className="previewWindow" title="PDF Viewer" />
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
