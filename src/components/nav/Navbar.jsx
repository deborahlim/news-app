import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HouseDoorFill, PersonFill } from "react-bootstrap-icons";
// import link component,
// which renders anchor tags and react router
// internally listens to clicks on those links,
// prevent browser default and maunally update the URL for us,
// and change the display
// NavLink is like Link component but it also sets a CSS class on the active anchor item

import { clearState, userSelector } from "../../redux/userSlice";
import SearchForm from "../misc/SearchForm";

import "./Navbar.css";

const MyNavbar = () => {
  let history = useHistory();
  let dispatch = useDispatch();

  const onSignout = () => {
    window.google.accounts.id.disableAutoSelect();
    dispatch(clearState());
    history.push("/");
    toast.success("You have been logged out!");
  };

  const isSignedIn = useSelector((state) => {
    return state.user.token !== null;
  });

  const { photo } = useSelector(userSelector);

  const toggleButtonHandler = (event) => {
    event.preventDefault();
    event.target.blur();
    event.target.parentNode.blur();
  };
  return (
    <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/top-headlines/breaking-news"
          className="fw-bold"
        >
          GNews
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleButtonHandler}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="my-4 my-md-0">
          <div className="my-3 my-md-0 mx-auto search-box">
            <SearchForm
              endpoint="news"
              placeholder="Search keywords, topics and more..."
            />
          </div>

          <div className="d-md-flex flex-row align-items-center">
            <Nav.Link
              as={NavLink}
              to="/news"
              className="d-inline-flex align-items-center"
            >
              <HouseDoorFill size={25} />
            </Nav.Link>
            {/* show if user not signed in */}

            {isSignedIn || (
              <>
                <Nav.Link as={NavLink} to="/login">
                  <PersonFill size={25} />
                </Nav.Link>
              </>
            )}
            {/* show if uer is signed in */}

            {isSignedIn && (
              <NavDropdown
                title={<img src={photo} className="profile-picture" alt="profile"/>}
                id="basic-nav-dropdown"
                align="end"
                onClick={toggleButtonHandler}
              >
                <NavDropdown.Item as={NavLink} to="/my-account">
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/" onClick={onSignout} exact>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
