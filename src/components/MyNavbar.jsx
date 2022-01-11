import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import link component,
// which renders anchor tags and react router
// internally listens to clicks on those links,
// prevent browser default and maunally update the URL for us,
// and change the display
// NavLink is like Link component but it also sets a CSS class on the active anchor item
import { NavLink } from "react-router-dom";
const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/welcome">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/explore">
              Explore
            </Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
