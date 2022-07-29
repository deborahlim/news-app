import { Button, Row, Col, Form, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { languages, countries } from "../../util/options";
import useInput from "../../hooks/use-input";
import {
  updateCurrUserNewsSettings,
  userSelector,
} from "../../redux/userSlice";
const UpdateForm = () => {
  const dispatch = useDispatch();
  const { errorMessage, token, country, lang } = useSelector(userSelector);
  // countries
  const {
    value: enteredCountry,
    valueChangeHandler: enteredCountryChangedHandler,
  } = useInput((value) => countries[value], country);
  const countriesOptions = [];
  for (const cty in countries) {
    countriesOptions.push(
      <option value={countries[cty]} key={cty}>
        {cty}
      </option>
    );
  }

  // language
  const {
    value: enteredLanguage,
    valueChangeHandler: enteredLanguageChangedHandler,
  } = useInput((value) => languages[value], lang);
  const languageOptions = [];
  for (const language in languages) {
    languageOptions.push(
      <option value={languages[language]} key={language}>
        {language}
      </option>
    );
  }

  const updateNewsFeedSettingsHandler = async (event) => {
    event.preventDefault();
console.log(enteredCountry, enteredLanguage)
    let enteredData = {
      country: enteredCountry,
      language: enteredLanguage,
      token: token,
    };
    try {
      dispatch(updateCurrUserNewsSettings(enteredData));
      toast.success("Changes Saved!");
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  return (
    <Form className="mt-5 mb-3" onSubmit={updateNewsFeedSettingsHandler}>
      <Card.Title className="mb-4">News Feed Settings</Card.Title>
      <Row className="my-4">
        <Col sm={5}>
          <Form.Label>Country</Form.Label>
        </Col>
        <Col>
          <Form.Select
            size="sm"
            value={enteredCountry}
            onChange={enteredCountryChangedHandler}
          >
            {countriesOptions}
          </Form.Select>
        </Col>
      </Row>
      <Row className="my-4">
        <Col sm={5}>
          <Form.Label>Language</Form.Label>
        </Col>
        <Col>
          <Form.Select
            size="sm"
            value={enteredLanguage}
            onChange={enteredLanguageChangedHandler}
          >
            {languageOptions}
          </Form.Select>
        </Col>
      </Row>
      <Button size="sm" className="my-3" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default UpdateForm;
