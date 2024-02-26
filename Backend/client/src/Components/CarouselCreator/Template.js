import React from "react";
import "./Template.css";

const Template = ({ imageUrl, templateName, templateID, onCreate }) => {
  return (
    <div className="card">
      <img className="product-image" src={imageUrl} alt={templateName} />
      <h3>{templateName}</h3>
      <p>
        <button onClick={() => onCreate(templateID)}>Create</button>
      </p>
    </div>
  );
};

export default Template;
