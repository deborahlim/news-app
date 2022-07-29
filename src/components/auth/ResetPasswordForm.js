import React, {useState} from "react";
import { useHistory, NavLink } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useInput from "../../hooks/use-input";
import { resetPasswordAPI } from "../../api/users";
import { useParams } from "react-router-dom";
import "../misc/Form.css";

const ResetPasswordForm = () => {
    const history = useHistory();
    const [isFetching, setIsFetching] = useState(false);
    const { resetToken } = useParams();
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
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submissionFormHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    let enteredData = {
      password: enteredPassword,
      passwordConfirm: enteredConfirmPassword,
    };
   try {
    setIsFetching(true);
    let response = await resetPasswordAPI(enteredData, resetToken);
    setIsFetching(false);
    toast.success(response.message);
    history.push("/login");
   }
   catch (err) {
    toast.error(err);
   }
   finally {
    setIsFetching(false);
    resetPasswordInput();
    resetConfirmPasswordInput();
   } 
  };

  return isFetching ? (
    <Spinner size="lg" animation="grow" />
  ) : (
    <div>
      <Form className="form" onSubmit={submissionFormHandler}>
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
        <Button variant="primary" type="submit" disabled={!formIsValid} className="me-3">
          Reset Password
        </Button>
        <Button as={NavLink} to="/login" variant="danger">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;