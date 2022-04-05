import { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const SearchForm = () => {
  const [term, setTerm] = useState("");
  let history = useHistory();
  const submissionFormHandler = (event) => {
    event.preventDefault();
    history.push(`/news/search/${term}`);
    setTerm("");
  };
  return (
    <Form className="d-flex" onSubmit={submissionFormHandler}>
      <FormControl
        type="search"
        placeholder="Type anything here..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        onKeyPress={(e) => e.code === 13 && submissionFormHandler}
        className="me-2"
        aria-label="Search"
      />
      <Button
        variant="outline-success"
        type="submit"
      >
        Search
      </Button>
    </Form>
  );
};
export default SearchForm;
