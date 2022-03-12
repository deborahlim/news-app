import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
const Categories = () => {
  return (
    <Container fluid>
      <Nav className="justify-content-center">
        <Nav.Link as={NavLink} to="/breaking-news">
          Breaking News
        </Nav.Link>
        <Nav.Link as={NavLink} to="/world">
          World
        </Nav.Link>
        <Nav.Link as={NavLink} to="/business">
          Business
        </Nav.Link>
        <Nav.Link as={NavLink} to="/tech">
          Technology
        </Nav.Link>
        <Nav.Link as={NavLink} to="/entertainment">
          Entertainment
        </Nav.Link>
        <Nav.Link as={NavLink} to="/science">
          Science
        </Nav.Link>
        <Nav.Link as={NavLink} to="/health">
          Health
        </Nav.Link>
        <Nav.Link as={NavLink} to="/sports">
          Sports
        </Nav.Link>
        <Nav.Link as={NavLink} to="/sports">
          More +
        </Nav.Link>
      </Nav>
    </Container>
  );
};

export default Categories;
