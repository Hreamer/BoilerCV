import React, { useState, useEffect } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`error-message ${isVisible ? "visible" : "hidden"}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
