import PersonalInformation from './CreationWindow/Sections/PersonalInformation';

const CreationFunctions = () => {


  const populateResumeFields = (templateID) => {
      const username = localStorage.getItem("username");
      const resumeName = templateID;
      fetch("http://localhost:3333/getResumeInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, resumeName }),
      }).then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); 
      }).then((resumeData) => {
          for (const key in resumeData) {
            
          }
      }).catch((error) => {
          // If there's a network error, set the error state
          
      });
  }
}

export default CreationFunctions;