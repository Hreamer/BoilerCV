import React from 'react';

const ResumeCard = ({ imageUrl, resumeName }) => {
  const handleOpenClick = () => {
    // Set the value in local storage based on the resume name
    localStorage.setItem('opened', resumeName === 'Resume 1' ? '1' : '2');
    window.location.reload();
  };

  return (
    <div className="card">
      <img
        className="product-image"
        src={imageUrl}
        alt={resumeName}
      />
      <h4>{resumeName}</h4>
      <p>
        <button onClick={handleOpenClick}>Open</button>
      </p>
    </div>
  );
};

export default ResumeCard;
