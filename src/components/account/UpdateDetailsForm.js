import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Row, Col, Form, Card, Image } from "react-bootstrap";

import CloudinaryUploadWidget from "../../components/misc/CloudinaryUploadWidget";
import useInput from "../../hooks/use-input";
import { updateCurrUserDetails, userSelector } from "../../redux/userSlice";

import "./UpdateDetailsForm.css";

const UpdateDetailsFrom = () => {
  const dispatch = useDispatch();
  const { errorMessage, token, name, email, role, isGoogleAuth, photo } =
    useSelector(userSelector);
  // photo
  const [uploadedPhoto, setUploadedPhoto] = useState(photo);

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

  let updateUserDetailsformIsValid = false;
  if (enteredUsernameIsValid && enteredEmailIsValid) {
    updateUserDetailsformIsValid = true;
  }

  const updateDetailsFormHandler = (event) => {
    event.preventDefault();
    if (!updateUserDetailsformIsValid) return;

    let enteredData = {
      name: enteredUsername,
      email: enteredEmail,
      photo: uploadedPhoto,
      token: token,
    };
    try {
      dispatch(updateCurrUserDetails(enteredData));
      toast.success("Changes Saved!");
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    setUploadedPhoto(photo);
  }, [photo]);

  return (
    <Form onSubmit={updateDetailsFormHandler} className="my-3">
      <Card.Title className="mb-4">Basic Info</Card.Title>
      <Row className="my-4">
        <Col sm={5}>
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
        <Col sm={5}>
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
        <Col sm={5}>
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
      <Row className="my-4">
        <Col sm={5}>
          <Form.Label> Profile Photo </Form.Label>
        </Col>
        <Col>
          <div className="my-3">
            <Image src={uploadedPhoto} thumbnail className="uploaded-picture" />
          </div>
          {!isGoogleAuth && (
            <CloudinaryUploadWidget
              message={
                (uploadedPhoto ? "Change " : "Upload ") + "your profile photo"
              }
              onVideoUploaded={setUploadedPhoto}
            />
          )}
          {isGoogleAuth && (
            <span className="small">
              Unlink from your Google Account to update profile photo
            </span>
          )}
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
  );
};

export default UpdateDetailsFrom;
