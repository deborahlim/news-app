import { Card, Button, Row, Col } from "react-bootstrap";

import Header from "../components/Header";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice";
const Account = () => {
  const { name, email } = useSelector(userSelector);
  return (
    <section>
      <Header title="My Account" />
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
          <Button size="sm" className="text-end mt-3">
            Update Details
          </Button>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Account;
