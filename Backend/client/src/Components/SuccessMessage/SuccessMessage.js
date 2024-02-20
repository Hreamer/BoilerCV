import React, { useState, useEffect } from "react";
import "./SuccessMessage.css";

const SuccessMessage = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`success-message ${isVisible ? "visible" : "hidden"}`}>
      {message}
    </div>
  );
};

export default SuccessMessage;
