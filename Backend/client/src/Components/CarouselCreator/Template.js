import React from 'react';
import "./Template.css";

const Template = ({ imageUrl, templateName }) => {
  return (
    <div className="card">
      <img
        className="product-image"
        src={imageUrl}
        alt={templateName}
      />
      <h3>{templateName}</h3>
      <p>
        <button>Create</button>
      </p>
    </div>
  );
};

export default Template;
