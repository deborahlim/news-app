import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { decodeJwt } from "jose";
import {
  googleAuthUser,
  userSelector,
} from "../redux/userSlice";
import { toast } from "react-toastify";
const GoogleAuth = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, errorMessage } = useSelector(userSelector);
  useEffect(() => {
    async function handleCredentialResponse(response) {
      // response.credential is the JWT token
      const responsePayload = decodeJwt(response.credential);
      console.dir(responsePayload);
      const data = {
        name: responsePayload.name,
        email: responsePayload.email,
        password: responsePayload.sub,
        passwordConfirm: responsePayload.sub,
      };

      try {
        let user = await dispatch(googleAuthUser(data)).unwrap();
        history.push("/");
        toast.success(`Welcome Back, ${user.data.user.name}`);
      } catch (err) {
        toast.error(errorMessage);
      }
    }

    window.onload = function () {
      window.google.accounts.id.initialize({
        client_id:
          "349330107806-tg8bbaoem6k1o7kepf4s5fsl2r29585m.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt(); // also display the One Tap dialog
      if (path === "/login" || path === "/register") {
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large", text: "continue_with" } // customization attributes
        );
      }
    };
  }, [path, dispatch, name, errorMessage, history]);

  return null;
};

export default GoogleAuth;
