import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decodeJwt } from "jose";

import { googleAuthUser} from "../redux/userSlice";

const GoogleAuth = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Google sign in Effect ran");
    function handleCredentialResponse(response) {
      // response.credential is the JWT token
      const responsePayload = decodeJwt(response.credential);
      console.dir(responsePayload);
      const data = {
        name: responsePayload.name,
        email: responsePayload.email,
        password: responsePayload.sub,
        passwordConfirm: responsePayload.sub,
      };
      dispatch(googleAuthUser(data));
    }

    window.onload = function () {
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
    };
  }, [path, dispatch]);

  return null;
};

export default GoogleAuth;
