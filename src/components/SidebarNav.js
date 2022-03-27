import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";

import Container  from "react-bootstrap/Container";

import SearchForm  from "./SearchForm";


const SideBarNav = ({ name, onPassUpSearchTerm }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onReceivedSearchTerm = (searchTerm) => {
    onPassUpSearchTerm(searchTerm)
  }
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
        <SearchForm onSearchFormSubmit={onReceivedSearchTerm}/>
      <Container>
          <Nav className="flex-column">
            <Nav.Link>Saved Topics</Nav.Link>
            <Nav.Link>Latest</Nav.Link>
          </Nav>
          
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBarNav;
