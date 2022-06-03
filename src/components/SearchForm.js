import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, FormControl, Container, Button } from "react-bootstrap";
import  "./SearchForm.css";
const SearchForm = () => {
  const [term, setTerm] = useState("");
  let history = useHistory();
  const submissionFormHandler = (event) => {
    event.preventDefault();
    setTerm("");
    history.push(`/news/search/${term}`);
    event.target.childNodes.forEach((node) => node.blur());
  };
  return (
    <Container className="search-box">
      <Form className="d-flex" onSubmit={submissionFormHandler}>
        <FormControl
          type="search"
          placeholder="Search keywords, topics and more..."
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="me-2 px-3 "
          aria-label="Search"
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
};
export default SearchForm;
