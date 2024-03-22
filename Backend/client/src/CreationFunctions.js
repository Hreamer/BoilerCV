
const handleUpdate = () => {
    const Username = localStorage.getItem("username");
    const ResumeName = localStorage.getItem("templateID");

    fetch("http://localhost:3333/updatePreview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username, ResumeName }),
    })
    .then((response) => {
        if (response.ok) {
          // If the response is successful
          
        } else {
          // If there's an error response, set the error state
          
        }
      })
      .catch((error) => {
        // If there's a network error, set the error state
       
    });
}; 