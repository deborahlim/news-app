import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink, useRouteMatch} from "react-router-dom";
import SideBarNav from "./SidebarNav";


const Categories = () => {
let {url} = useRouteMatch();
  return (
    <Container className="my-5" fluid>
      <Nav className="justify-content-center">
        <Nav.Link as={NavLink} to={`${url}/top-headlines/breaking-news`}>
          Breaking News
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/world`}>
          World
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/business`}>
          Business
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/tech`}>
          Technology
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/entertainment`}>
          Entertainment
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/science`}>
          Science
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/health`}>
          Health
        </Nav.Link>
        <Nav.Link as={NavLink} to={`${url}/top-headlines/sports`}>
          Sports
        </Nav.Link>
        <SideBarNav name="+More" />
      </Nav>
    </Container>
  );
};

export default Categories;
