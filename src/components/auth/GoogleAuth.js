import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { decodeJwt } from "jose";
import {
  googleAuthUser,
  userSelector,
  clearState,
} from "../../redux/userSlice";
import { toast } from "react-toastify";
const GoogleAuth = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, errorMessage, isSuccess, isError } = useSelector(userSelector);
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
        photo: responsePayload.picture,
      };
      try {
        let response = await dispatch(googleAuthUser(data)).unwrap();
        if (response.newUser) {
          toast.success(`Welcome, ${response.data.user.name}`);
        } else {
          toast.success(`Welcome Back, ${response.data.user.name}`);
        }
        history.push("/news");
      } catch (err) {
        let errorMessage = err;
        console.log(errorMessage);
        if (err === "Incorrect email or password") {
          errorMessage =
            "Linking with your Google account failed. Please use a different email to create an account.";
          history.push("/register");
        } else {
          history.push("/");
        }
        toast.error(errorMessage);
        dispatch(clearState());
      }
    }

    window.onload = function () {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
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
  }, [path, dispatch, name, errorMessage, history, isError, isSuccess]);

  return null;
};

export default GoogleAuth;
