import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

import SearchForm from "./SearchForm";
// import link component,
// which renders anchor tags and react router
// internally listens to clicks on those links,
// prevent browser default and maunally update the URL for us,
// and change the display
// NavLink is like Link component but it also sets a CSS class on the active anchor item
import { NavLink } from "react-router-dom";


const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home">News App</Navbar.Brand>
        <SearchForm/>
        <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
          <NavDropdown.Item as={NavLink} to="/register">
            Register
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/login">
            Log In
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/my-account/deb">
            My Account
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={NavLink} to="/">
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
