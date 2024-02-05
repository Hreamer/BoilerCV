import React from 'react';

const ResumeCard = ({ imageUrl, resumeName }) => {
  return (
    <div className="card">
      <img
        className="product-image"
        src={imageUrl}
        alt={resumeName}
      />
      <h4>{resumeName}</h4>
      <p>
        <button>Open</button>
      </p>
    </div>
  );
};

export default ResumeCard;
