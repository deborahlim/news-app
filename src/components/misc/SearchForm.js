import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Form, FormControl, Container, Button } from "react-bootstrap";
import "./SearchForm.css";

const SearchForm = ({ endpoint, placeholder, onYoutubeSearchFormSubmit }) => {
  const [term, setTerm] = useState("");
  let history = useHistory();
  let { path } = useRouteMatch();
  const submissionFormHandler = (event) => {
    event.preventDefault();
    if (endpoint === "youtube") {
      history.push(`${path}/${term}`);
      onYoutubeSearchFormSubmit(term);
    }
    if (endpoint === "news") {
      history.push(`/${endpoint}/search/${term}`);
    }

    setTerm("");
    event.target.childNodes.forEach((node) => node.blur());
  };
  return (
    <Container className="search-box">
      <Form className="d-flex" onSubmit={submissionFormHandler}>
        <FormControl
          type="search"
          placeholder={placeholder}
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="me-2 px-3 "
          aria-label="Search"
        />
        <Button variant="outline-dark" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
};
export default SearchForm;
