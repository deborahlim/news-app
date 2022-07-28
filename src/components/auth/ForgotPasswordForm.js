import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import useInput from "../../hooks/use-input";
import { forgotPasswordAPI } from "../../api/users";

import "../misc/Form.css";
const ForgotPasswordForm = () => {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));
  let formIsValid = false;
  if (enteredEmailIsValid) {
    formIsValid = true;
  }
  const submissionFormHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    try {
      setIsFetching(true);
      let response = await forgotPasswordAPI({ email: enteredEmail });
      setIsFetching(false);
      toast.success(response.message);
      history.push("/login");
    } catch (err) {
      toast.error(err);
    } finally {
      setIsFetching(false);
      resetEmailInput();
    }
  };

  return isFetching ? (
    <Spinner size="lg" animation="grow" />
  ) : (
    <div>
      <Form className="form" onSubmit={submissionFormHandler}>
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
        <Button variant="primary" type="submit" disabled={!formIsValid}>
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
