import { Button, Row, Col, Form, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import useInput from "../../hooks/use-input";
import { updateCurrUserPassword, userSelector } from "../../redux/userSlice";
const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const { errorMessage, token, isGoogleAuth } = useSelector(userSelector);

  // current password
  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    valueChangeHandler: currentPasswordChangedHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: resetCurrentPassword,
  } = useInput((value) => value.trim().length > 5);

  // new password
  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangedHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput((value) => value.trim().length > 5);

  // confirm new password
  const {
    value: enteredConfirmNewPassword,
    isValid: enteredConfirmNewPasswordIsValid,
    hasError: confirmNewPasswordInputHasError,
    valueChangeHandler: confirmNewPasswordChangedHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    reset: resetConfirmNewPassword,
  } = useInput((value) => value.trim() === enteredNewPassword);

  let updateUserPasswordFormIsValid = false;
  if (
    enteredCurrentPasswordIsValid &&
    enteredNewPasswordIsValid &&
    enteredConfirmNewPasswordIsValid
  ) {
    updateUserPasswordFormIsValid = true;
  }

  const updatePasswordFormHandler = (event) => {
    event.preventDefault();
    if (!updateUserPasswordFormIsValid) return;

    let enteredData = {
      passwordCurrent: enteredCurrentPassword,
      password: enteredNewPassword,
      passwordConfirm: enteredConfirmNewPassword,
      token: token,
    };
    try {
      dispatch(updateCurrUserPassword(enteredData));
      toast.success("Password Changed!");
    } catch (err) {
      toast.error(errorMessage);
    } finally {
      resetCurrentPassword();
      resetNewPassword();
      resetConfirmNewPassword();
    }
  };

  return (
    <fieldset disabled={isGoogleAuth}>
      {isGoogleAuth && (
        <p className="lead">
          Unlink from your Google Account to update your password
        </p>
      )}
      <Form className="mt-5 mb-3" onSubmit={updatePasswordFormHandler}>
        <Card.Title className="mb-4">Password Change</Card.Title>
        <Row className="my-4">
          <Col>
            <Form.Label>Current Password</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="password"
              placeholder="Enter Current Password"
              value={enteredCurrentPassword}
              onChange={currentPasswordChangedHandler}
              onBlur={currentPasswordBlurHandler}
              className="form-control-sm"
            />
            {currentPasswordInputHasError && (
              <span className="text-danger small">
                Current Password must be longer than 5 characters
              </span>
            )}
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Form.Label>New Password</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={enteredNewPassword}
              onChange={newPasswordChangedHandler}
              onBlur={newPasswordBlurHandler}
              className="form-control-sm"
            />
            {newPasswordInputHasError && (
              <span className="text-danger small">
                New Password must be longer than 5 characters
              </span>
            )}
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Form.Label>Confirm New Password</Form.Label>
          </Col>
          <Col>
            <Form.Control
              type="password"
              placeholder="Enter Current Password"
              value={enteredConfirmNewPassword}
              onChange={confirmNewPasswordChangedHandler}
              onBlur={confirmNewPasswordBlurHandler}
              className="form-control-sm"
            />
            {confirmNewPasswordInputHasError && (
              <span className="text-danger small">
                New Passwords do not match
              </span>
            )}
          </Col>
        </Row>
        <Button
          size="sm"
          className="my-3"
          type="submit"
          disabled={!updateUserPasswordFormIsValid}
        >
          Update Password
        </Button>
      </Form>
    </fieldset>
  );
};

export default UpdatePasswordForm;
