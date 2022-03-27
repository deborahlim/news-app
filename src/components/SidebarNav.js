import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";

const SideBarNav = ({ name }) => {
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
          <Offcanvas.Title>News App</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/breaking-news" className="flex-column">
            <Nav.Link>Latest</Nav.Link>
            <Nav.Link>Trending</Nav.Link>
            <Nav.Link>Languages</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBarNav;
