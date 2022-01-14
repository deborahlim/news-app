import React from "react";
import Classes from "./Form.module.css";
import { Form, Button } from "react-bootstrap";
import useInput from "../hooks/use-input";
const LoginForm = () => {
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
    console.log(enteredEmail);
    console.log(enteredPassword);
    resetEmailInput();
    resetPasswordInput();
  };
  return (
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
    </Form>
  );
};

export default LoginForm;
