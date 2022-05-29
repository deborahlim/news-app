import { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { userSelector, getCurrUser } from "../redux/userSlice";
const Account = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, isFetching, name, email, errorMessage, token, role } =
    useSelector(userSelector);

  useEffect(() => {
    dispatch(getCurrUser(token));
  }, [dispatch, token]);

  let content;
  if (isFetching) {
    content = "Fetching User Details...";
  } else if (isSuccess) {
    content = (
      <Card className="m-5 p-3">
        <Card.Body className="text-start">
          <Card.Title className="mb-4">Basic Info</Card.Title>
          <Row>
            <Col>Name: </Col>
            <Col>{name}</Col>
          </Row>
          <Row>
            <Col>Email: </Col>
            <Col>{email}</Col>
          </Row>
          <Row>
            <Col>Role: </Col>
            <Col>{role}</Col>
          </Row>
          <Button size="sm" className="text-end mt-3">
            Update Details
          </Button>
        </Card.Body>
      </Card>
    );
  } else if (isError) {
    content = errorMessage;
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
