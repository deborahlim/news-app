import React, { useEffect } from "react";

import { Form, Button } from "react-bootstrap";

import Classes from "./Form.module.css";
import useInput from "../hooks/use-input";
import GoogleAuth from "./GoogleAuth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  userSelector,
  clearState,
  updateState,
  loginUser,
} from "../redux/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  function onSignIn() {
    let cred = { id: "...", password: "..." };
    window.google.accounts.id.storeCredential(cred);
  }
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
  } = useInput((value) => value.trim().length > 6);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const submissionFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(loginUser({ email: enteredEmail, password: enteredPassword }));
    resetEmailInput();
    resetPasswordInput();
  };

  useEffect(() => {
    console.log("Login Form effect ran");
    if (window.onload && window.google) {
      console.log("render button");
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", text: "continue_with" } // customization attributes
      );
    }
    if (isSuccess) {
      dispatch(updateState());
      history.push("/");
    }
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, dispatch, errorMessage, history]);

  return isFetching ? (
    "Logging in..."
  ) : (
    <div>
      {isError && <span className="text-danger">{errorMessage}</span>}
      <Form className={Classes.form} onSubmit={submissionFormHandler}>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <span className="text-danger">
              Please enter a valid password <br />
            </span>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Submit
        </Button>
        <p className="lead my-3">OR</p>
        <GoogleAuth />
        <div
          style={{ display: "inline-block" }}
          id="buttonDiv"
          onClick={onSignIn}
        ></div>
      </Form>
    </div>
  );
};

export default LoginForm;
