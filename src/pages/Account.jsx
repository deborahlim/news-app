import { useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  userSelector,
  getCurrUser,
  updateCurrUserDetails,
  updateCurrUserPassword,
  deleteCurrUser,
  clearState,
} from "../redux/userSlice";
import useInput from "../hooks/use-input";
import Header from "../components/Header";
import { toast } from "react-toastify";


const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isSuccess,
    isError,
    isFetching,
    errorMessage,
    token,
    name,
    email,
    role,
  } = useSelector(userSelector);
  // email
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"), email);

  // username
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim() !== "", name);

  // current password
  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    valueChangeHandler: currentPasswordChangedHandler,
    inputBlurHandler: currentPasswordBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  // new password
  const {
    value: enteredNewPassword,
    isValid: enteredNewPasswordIsValid,
    hasError: newPasswordInputHasError,
    valueChangeHandler: newPasswordChangedHandler,
    inputBlurHandler: newPasswordBlurHandler,
  } = useInput((value) => value.trim().length > 5);

  // confirm new password
  const {
    value: enteredConfirmNewPassword,
    isValid: enteredConfirmNewPasswordIsValid,
    hasError: confirmNewPasswordInputHasError,
    valueChangeHandler: confirmNewPasswordChangedHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
  } = useInput((value) => value.trim() === enteredNewPassword);

  let updateUserDetailsformIsValid = false;
  let updateUserPasswordFormIsValid = false;
  if (enteredUsernameIsValid && enteredEmailIsValid) {
    updateUserDetailsformIsValid = true;
  }
  if (
    enteredCurrentPasswordIsValid &&
    enteredNewPasswordIsValid &&
    enteredConfirmNewPasswordIsValid
  ) {
    updateUserPasswordFormIsValid = true;
  }

  const updateDetailsFormHandler = (event) => {
    event.preventDefault();
    if (!updateUserDetailsformIsValid) return;

    let enteredData = {
      name: enteredUsername,
      email: enteredEmail,
      token: token,
    };
    try {
      dispatch(updateCurrUserDetails(enteredData));
      toast.success("Changes Saved!");
    } catch (err) {
      toast.error(errorMessage);
    }
  };

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
    }
  };

  const deleteAccountFormHandler = (event) => {
    event.preventDefault();
    try {
      dispatch(deleteCurrUser(token));
      history.push("/");
      dispatch(clearState());
      toast.success("You have been logged out");
    } catch (err) {
      toast.error(errorMessage);
      dispatch(clearState());
      history.push("/");
    }
  };

  useEffect(() => {
    dispatch(getCurrUser(token));
  }, [dispatch, token]);

  let content;
  if (isError) {
    toast.error(errorMessage);
    dispatch(clearState());
    history.push("/");
  }
  if (isFetching) {
    content = "Fetching User Details...";
  } else if (isSuccess) {
    content = (
      <Card className="m-5 p-3">
        <Card.Body className="text-start">
          <Form onSubmit={updateDetailsFormHandler} className="my-3">
            <Card.Title className="mb-4">Basic Info</Card.Title>
            <Row className="my-2">
              <Col>
                <Form.Label className="fw-bold">Username</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={enteredUsername}
                  onChange={usernameChangedHandler}
                  onBlur={usernameBlurHandler}
                />
                {usernameInputHasError && (
                  <span className="text-danger">
                    Username must not be empty
                  </span>
                )}
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Label className="fw-bold">Email</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={enteredEmail}
                  onChange={emailChangedHandler}
                  onBlur={emailBlurHandler}
                />
                {emailInputHasError && (
                  <span className="text-danger">
                    Please enter a valid email
                  </span>
                )}
              </Col>
            </Row>
            <Row>
              <Col className="fw-bold">Role </Col>
              <Col>{role}</Col>
            </Row>
            <Button
              size="sm"
              className="text-end my-3"
              type="submit"
              disabled={!updateUserDetailsformIsValid}
            >
              Save Changes
            </Button>
          </Form>
          <hr />
          <Form className="mt-5 mb-3" onSubmit={updatePasswordFormHandler}>
            <Card.Title className="mb-4">Password Change</Card.Title>
            <Row className="my-2">
              <Col>
                <Form.Label className="fw-bold">Current Password</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Enter Current Password"
                  value={enteredCurrentPassword}
                  onChange={currentPasswordChangedHandler}
                  onBlur={currentPasswordBlurHandler}
                />
                {currentPasswordInputHasError && (
                  <span className="text-danger">
                    Current Password must not be empty
                  </span>
                )}
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Label className="fw-bold">New Password</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={enteredNewPassword}
                  onChange={newPasswordChangedHandler}
                  onBlur={newPasswordBlurHandler}
                />
                {newPasswordInputHasError && (
                  <span className="text-danger">
                    New Password must not be empty
                  </span>
                )}
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Label className="fw-bold">
                  Confirm New Password
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Enter Current Password"
                  value={enteredConfirmNewPassword}
                  onChange={confirmNewPasswordChangedHandler}
                  onBlur={confirmNewPasswordBlurHandler}
                />
                {confirmNewPasswordInputHasError && (
                  <span className="text-danger">
                    Confirm New Password must not be empty
                  </span>
                )}
              </Col>
            </Row>
            <Button
              size="sm"
              className="text-end my-3"
              type="submit"
              disabled={!updateUserPasswordFormIsValid}
            >
              Update Password
            </Button>
          </Form>
          <hr />
          <Form className="my-3" onSubmit={deleteAccountFormHandler}>
            <Row>
              <Col>
                <Card.Title className="my-3">Delete Account</Card.Title>
                <p>
                  You will lose access to your account once your deletion
                  request has been submitted.
                </p>
                <Button variant="danger" size="sm" type="submit">
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  } else {
    content = "Something went wrong. Try again later!";
  }

  return (
    <section>
      <Header title="My Account" />
      {content}
    </section>
  );
};

export default Account;
