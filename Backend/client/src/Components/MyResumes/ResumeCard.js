import React from 'react';

const ResumeCard = ({ imageUrl, resumeName, onOpen, onDelete, onRename }) => {
  return (
    <div className="card">
      <img
        className="product-image"
        src={imageUrl}
        alt={resumeName}
      />
      <h4>{resumeName}</h4>
      <p>
        <button style={{marginRight: "2px"}} onClick={onOpen}>Open</button>
        <button style={{marginLeft: "2px"}} onClick={onDelete}>Delete</button>
        <button style={{marginTop: "4px"}} onClick={onRename}>Rename</button>
      </p>
    </div>
  );
};

export default ResumeCard;
