import { useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import useInput from "../../hooks/use-input";
import GoogleAuth from "../auth/GoogleAuth";
import { userSelector, signupUser, clearState } from "../../redux/userSlice";

import "../misc/Form.css";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isGoogleAuth, name, isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  // username
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  // email
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  // password
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length > 5);

  // confirm password
  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() === enteredPassword);

  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submissionFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    let enteredData = {
      name: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      passwordConfirm: enteredConfirmPassword,
    };
    dispatch(signupUser(enteredData));
    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  useEffect(() => {
    if (window.onload && window.google) {
      console.log("render button");
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", text: "continue_with" } // customization attributes
      );
    }
    if (isSuccess && !isGoogleAuth) {
      toast.success(`Welcome to News App, ${name}`);
      history.push("/");
    }
    if (isError && !isGoogleAuth) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, dispatch, errorMessage, history, name, isGoogleAuth]);
  return isFetching ? (
    <Spinner size="lg" animation="grow" />
  ) : (
    <div>
      <Form className="form" onSubmit={submissionFormHandler}>
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={enteredUsername}
            onChange={usernameChangedHandler}
            onBlur={usernameBlurHandler}
            // className={usernameInputClasess}
          />
          {usernameInputHasError && (
            <span className="text-danger">Username must not be empty</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <span className="text-danger">Please enter a valid email</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password (at least 6 characters)</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={enteredPassword}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <span className="text-danger">
              Please enter a valid password
              <br />
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={enteredConfirmPassword}
            onChange={confirmPasswordChangedHandler}
            onBlur={confirmPasswordBlurHandler}
          />
          {confirmPasswordInputHasError && (
            <span className="text-danger">Passwords do not match</span>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Submit
        </Button>
        <p className="lead my-3">OR</p>
        <GoogleAuth />
        <div style={{ display: "inline-block" }} id="buttonDiv"></div>
        <p className="m-3">
          <NavLink to="/login">Log In</NavLink> to your account instead
        </p>
      </Form>
    </div>
  );
};

export default RegisterForm;
