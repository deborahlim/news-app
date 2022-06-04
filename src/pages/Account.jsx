import { useEffect } from "react";
import { Card, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import MyModal from "../components/MyModal";
import { languages, countries } from "../util/options";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  userSelector,
  getCurrUser,
  updateCurrUserDetails,
  updateCurrUserPassword,
  deleteCurrUser,
  clearState,
  updateCurrUserNewsSettings,
} from "../redux/userSlice";
import useInput from "../hooks/use-input";
import Header from "../components/Header";
import { toast } from "react-toastify";

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isError,
    isFetching,
    errorMessage,
    token,
    name,
    email,
    country,
    lang,
    role,
    isGoogleAuth,
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

  // countries
  const {
    value: enteredCountry,
    valueChangeHandler: enteredCountryChangedHandler,
  } = useInput((value) => countries[value], country);
  const countriesOptions = [];
  for (const cty in countries) {
    countriesOptions.push(
      <option value={countries[cty]} key={cty}>
        {cty}
      </option>
    );
  }
  console.log(enteredCountry)
  // language
  const {
    value: enteredLanguage,
    valueChangeHandler: enteredLanguageChangedHandler,
  } = useInput((value) => countries[value], lang);
  const languageOptions = [];
  for (const language in languages) {
    languageOptions.push(
      <option value={languages[language]} key={language}>
        {language}
      </option>
    );
  }

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

  const updateNewsFeedSettingsHandler = async (event) => {
    event.preventDefault();

    let enteredData = {
      country: enteredCountry,
      language: enteredLanguage,
      token: token,
    };
    try {
      dispatch(updateCurrUserNewsSettings(enteredData));
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
    } finally {
      resetCurrentPassword();
      resetNewPassword();
      resetConfirmNewPassword();
    }
  };

  const deleteAccountFormHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(deleteCurrUser(token));
      history.push("/");
      toast.success("You have been logged out");
    } catch (err) {
      toast.error(errorMessage);
      history.push("/");
    } finally {
      dispatch(clearState());
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
    content = <Spinner size="lg" animation="grow" />;
  } else {
    content = (
      <Card className="m-5 p-3">
        <Card.Body className="text-start">
          <Form onSubmit={updateDetailsFormHandler} className="my-3">
            <Card.Title className="mb-4">Basic Info</Card.Title>
            <Row className="my-4">
              <Col>
                <Form.Label>Username</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={enteredUsername}
                  onChange={usernameChangedHandler}
                  onBlur={usernameBlurHandler}
                  className="form-control-sm"
                />
                {usernameInputHasError && (
                  <span className="text-danger small">
                    Username must not be empty
                  </span>
                )}
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Label>Email</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={enteredEmail}
                  onChange={emailChangedHandler}
                  onBlur={emailBlurHandler}
                  disabled={isGoogleAuth}
                  className="form-control-sm"
                />
                {isGoogleAuth && (
                  <span className="small">
                    Unlink from your Google Account to update your email
                  </span>
                )}
                {emailInputHasError && (
                  <span className="text-danger small">
                    Please enter a valid email
                  </span>
                )}
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Label> Role </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={role}
                  disabled
                  className="form-control-sm"
                />
              </Col>
            </Row>
            <Button
              size="sm"
              className="my-3"
              type="submit"
              disabled={!updateUserDetailsformIsValid}
            >
              Save Changes
            </Button>
          </Form>
          <hr />
          <Form className="mt-5 mb-3" onSubmit={updateNewsFeedSettingsHandler}>
            <Card.Title className="mb-4">News Feed Settings</Card.Title>
            <Row className="my-4">
              <Col>
                <Form.Label>Country</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  size="sm"
                  value={enteredCountry}
                  onChange={enteredCountryChangedHandler}
                >
                  {countriesOptions}
                </Form.Select>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Label>Language</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  size="sm"
                  value={enteredLanguage}
                  onChange={enteredLanguageChangedHandler}
                >
                  {languageOptions}
                </Form.Select>
              </Col>
            </Row>
            <Button size="sm" className="my-3" type="submit">
              Save Changes
            </Button>
          </Form>
          <hr />
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
          <hr />
          <Form className="my-3" onSubmit={deleteAccountFormHandler}>
            <Row>
              <Col>
                <Card.Title className="my-3">Delete Account</Card.Title>
                <p>
                  You will lose access to your account once your deletion
                  request has been submitted.
                </p>
                <MyModal
                  header="Confirm Delete?"
                  message="Once this request has been submitted, you will not be able to create an account using this email address again."
                  handleSubmit={deleteAccountFormHandler}
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  return (
    <section>
      <Header title="My Account" />
      {content}
    </section>
  );
};

export default Account;
