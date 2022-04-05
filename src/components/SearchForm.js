import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"
import {useState} from "react";

import {Link} from "react-router-dom"

const SearchForm = () => {

  const [term, setTerm] = useState("");
  const submissionFormHandler = (event) => {
        event.preventDefault();
        setTerm("");
        console.log(term)
    }
    return (
        <Form className="d-flex" onSubmit={submissionFormHandler}>
        <FormControl
          type="search"
          placeholder="Type anything here..."
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success" as={Link} to={`/news/search/${term}`}>Search</Button>
      </Form>
    )
}
export default SearchForm;