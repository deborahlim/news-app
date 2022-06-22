import React, { useEffect } from "react";

import { Form, Button, Spinner, Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import Classes from "../misc/Form.module.css";
import useInput from "../../hooks/use-input";
import GoogleAuth from "../auth/GoogleAuth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";

import { userSelector, loginUser, clearState } from "../../redux/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSuccess, name, isFetching, isError, errorMessage, isGoogleAuth } =
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
    if (window.onload && window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", text: "continue_with" } // customization attributes
      );
    }
    if (isSuccess && !isGoogleAuth) {
      history.push("/");
      toast.success(`Welcome back, ${name}`);
    }
    if (isError && !isGoogleAuth) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [dispatch, isError, isSuccess, name, errorMessage, history, isGoogleAuth]);

  return isFetching ? (
    <Spinner size="lg" animation="grow" />
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
        <p className="m-3">
          <NavLink to="/register">Register</NavLink> your account instead
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
