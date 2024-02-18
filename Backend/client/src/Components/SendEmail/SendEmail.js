import React, {useState} from 'react';
import "./SendEmail.css";
import EmailInfo from '../EmailInfo/EmailInfo';

const SendEmail = ({ pdf }) => {
  const [isEmailInfoOpen, setIsEmailInfoOpen] = useState(false);

  const openEmailInfo = () => {
    setIsEmailInfoOpen(true);
  };

  const closeEmailInfo = () => {
    setIsEmailInfoOpen(false);
  };

  return (
    <div>
      <div className="email-button" onClick={openEmailInfo}>Download to Email</div>
      {isEmailInfoOpen && <EmailInfo pdf={pdf} onClose={closeEmailInfo} />}
    </div>
  );
};

export default SendEmail;