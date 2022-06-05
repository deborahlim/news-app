import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import Container  from "react-bootstrap/Container";

const SideBarNav = ({ name}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link variant="primary" onClick={handleShow}>
        {name}
      </Nav.Link>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>GNews</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

      <Container>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to={`/user/saved-topics`}>Saved Topics</Nav.Link>
            <Nav.Link>Videos</Nav.Link>
          </Nav>
          
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBarNav;
