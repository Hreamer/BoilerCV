import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

const clientId = "262411179008-aasuqij7f6hamq93qbp7s9umsmtac3m7.apps.googleusercontent.com";

function GoogleSignIn() {
    const [error, setError] = useState(null);

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.credential);
        var userObject = jwtDecode(res.credential);
        const username = userObject.name;
        const password = userObject.email;
        //const url = "/#/userhub";
        //window.location = url;
    
        fetch("http://localhost:3333/createAcc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        })
        .then((response) => {
            if (response.ok) {
            // If the response is successful, redirect to userhub
            localStorage.setItem("username", username);
            const url = "/#/userhub";
            window.location = url;
            } else {
            // If there's an error response, set the error state
                fetch("http://localhost:3333/checkLogin", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                })
                    .then((response) => {
                    if (response.ok) {
                        // If the response is successful, redirect to userhub
                        localStorage.setItem("username", username);
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
            }
        })
        .catch((error) => {
            // If there's a network error, set the error state
            setError("Error: Network error.");
        });
        
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
    }

    return (
        <div id='signInButton'>
            <GoogleOAuthProvider clientId="262411179008-aasuqij7f6hamq93qbp7s9umsmtac3m7.apps.googleusercontent.com">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </GoogleOAuthProvider>  
        </div>
    )
}
export default GoogleSignIn;