import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"
import useInput from "../hooks/use-input";

const SearchForm = (props) => {

    const {value: enteredSearchTerm, valueChangeHandler: searchChangedHandler} = useInput(() => true)
    const submissionFormHandler = (event) => {
        event.preventDefault();
        const enteredData = {endpoint:"search", enteredSearchTerm, };
        props.onSearchFormSubmit(enteredData);
    }
    return (
        <Form className="d-flex" onSubmit={submissionFormHandler}>
        <FormControl
          type="search"
          placeholder="Type anything here..."
          value={enteredSearchTerm}
          onChange={searchChangedHandler}
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success" type="submit">Search</Button>
      </Form>
    )
}
export default SearchForm;