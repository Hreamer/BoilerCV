import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "262411179008-aasuqij7f6hamq93qbp7s9umsmtac3m7.apps.googleusercontent.com";

function GoogleSignIn() {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        const url = "/#/userhub";
        window.location = url;
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