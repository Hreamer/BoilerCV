import React, { useState } from 'react';
import './SettingsButton.css'; // Create a separate CSS file for styling
import Login from "../Login/Login"
import AccountInfo from "../AccountInfo/AccountInfo"
import '@fortawesome/fontawesome-free/css/all.css';

const SettingsButton = () => {
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('JohnDoe');
  
  const toggleAccountInfo = () => {
    setIsAccountInfoOpen(!isAccountInfoOpen);
  };

  return (
    <div className="gear-button" onClick={toggleAccountInfo}>
      <i className="fas fa-cog"></i>
      {isAccountInfoOpen && <AccountInfo onClose={toggleAccountInfo} currentUsername={currentUsername} />}
    </div>
  );
};

export default SettingsButton;