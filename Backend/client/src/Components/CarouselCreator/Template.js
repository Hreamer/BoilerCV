import React from "react";
import "./Template.css";

const Template = ({ imageUrl, templateName }) => {
  const tempFix = () => {
    alert("Resume creation is not current enabled!");
  }
  return (
    <div className="card">
      <img className="product-image" src={imageUrl} alt={templateName} />
      <h3>{templateName}</h3>
      <p>
        <button onClick={tempFix}>Create</button>
      </p>
    </div>
  );
};

export default Template;
