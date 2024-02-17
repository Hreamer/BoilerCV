import React, {useState} from 'react';
import './EmailInfo.css';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const EmailInfo = ({ onClose, pdf }) => {
  const [error, setError] = useState(null);

  const handleSendEmail = () => {
    const email = document.getElementById("email").value;
    const subject = encodeURIComponent("Hello from Abstract!");
    const body = encodeURIComponent(pdf);
    const formData = new FormData();
    formData.append('toEmail', email);
    formData.append('subject', subject);
    formData.append('body', body);
    formData.append('fileName', pdf);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    fetch("http://localhost:3333/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, redirect to userhub
          const url = "/#/userhub";
          window.location = url;
        } else {
          // If there's an error response, set the error state
          setError("Error: Refused.");
        }
      })
      .catch((error) => {
        // If there's a network error, set the error state
        setError("Error: Network error.");
      });
  };

  return (
    <div className="email-popup">
    <div className="email-content">
      <button className="exit-button" onClick={onClose}>X</button>
      {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
      )}
      <div className="input-container">
      <div className="input-sub-container2">
        <label htmlFor="password">Destination Email:</label>
        <input type="text" id="email" />
      </div>
      </div>
      <button className="send-email-button" onClick={handleSendEmail}>Send Email</button>
    </div>
  </div>
  );
};

export default EmailInfo;