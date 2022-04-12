import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
const GoogleAuth = () => {
  const { path } = useRouteMatch();

  useEffect(() => {
    console.log("Google sign in Effect ran");
    function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
    }

    window.onload = async function () {
      console.log("window loaded");
      window.google.accounts.id.initialize({
        client_id:
          "349330107806-tg8bbaoem6k1o7kepf4s5fsl2r29585m.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt(); // also display the One Tap dialog
      if (path === "/login" || path === "/register") {
        console.log("at the login or register page");
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large", text: "continue_with" } // customization attributes
        );
      }

      // window.google.accounts.id.storeCredential(Credential, onSignIn);
    };
  }, [path]);

  return null;
};

export default GoogleAuth;
