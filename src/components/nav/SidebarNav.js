import { useState } from "react";
import { Offcanvas, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { userSelector } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const SideBarNav = ({ name }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { savedTopics } = useSelector(userSelector);

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
              <Nav.Link
                as={NavLink}
                to={`/saved-topics/${savedTopics[savedTopics.length - 1]}`}
              >
                Saved Topics
              </Nav.Link>
              <Nav.Link as={NavLink} to={`/youtube/search/news`}>
                Videos
              </Nav.Link>
            </Nav>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBarNav;
