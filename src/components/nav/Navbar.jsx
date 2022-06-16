import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchForm from "../misc/SearchForm";
// import link component,
// which renders anchor tags and react router
// internally listens to clicks on those links,
// prevent browser default and maunally update the URL for us,
// and change the display
// NavLink is like Link component but it also sets a CSS class on the active anchor item
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../../redux/userSlice";
import { toast } from "react-toastify";
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

  const toggleButtonHandler = (event) => {
    event.preventDefault();
    event.target.blur();
    event.target.parentNode.blur();
  };
  return (
    <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/top-headlines/breaking-news">
          GNews
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleButtonHandler}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="my-4 my-md-0">
          <div className="my-3 my-md-0 mx-auto search-box">
            <SearchForm endpoint="news" placeholder="Search keywords, topics and more..."/>
          </div>

          <div className="d-md-flex flex-row">
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-home"
            >
              Home
            </Nav.Link>
            {/* show if user not signed in */}
            <NavDropdown
              title="Account"
              id="basic-nav-dropdown"
              align="end"
              onClick={toggleButtonHandler}
            >
              {isSignedIn || (
                <div>
                  <NavDropdown.Item as={NavLink} to="/register">
                    Register
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/login">
                    Log In
                  </NavDropdown.Item>
                </div>
              )}
              {/* show if uer is signed in */}
              {isSignedIn && (
                <div>
                  <NavDropdown.Item as={NavLink} to="/my-account">
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/"
                    onClick={onSignout}
                    exact
                  >
                    Log Out
                  </NavDropdown.Item>
                </div>
              )}
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
