import { Form, Row, Col, Button } from "react-bootstrap";
import { languages, countries, topics } from "../util/options";
import useInput from "../hooks/use-input";
let splitString = (str, separator) => {
  let arr = str.split(separator);
  let transformedArr = arr.map((word) => {
    return !(word === "and") ? word[0].toUpperCase() + word.slice(1) : word;
  });
  return transformedArr.join(" ");
};
const HeadlinesForm = (props) => {
  // console.log(languages);
  const { value: enteredLanguage, valueChangeHandler: languageChangedHandler } =
    useInput(() => true);

  const { value: enteredCountry, valueChangeHandler: countryChangedHandler } =
    useInput(() => true);

  const { value: enteredTopic, valueChangeHandler: topicChangedHandler } =
    useInput(() => true);

  const { value: enteredDateFrom, valueChangeHandler: dateFromChangedHandler } =
    useInput(() => true);

  const { value: enteredDateTo, valueChangeHandler: dateToChangedHandler } =
    useInput(() => true);

  const submissionFormHandler = (event) => {
    event.preventDefault();

    const enteredData = {
      enteredLanguage,
      enteredCountry,
      enteredTopic,
      enteredDateFrom,
      enteredDateTo,
    };
    console.log(enteredData);
    props.onUpdateHeadlinesParams(enteredData);
  };

  return (
    <Form onSubmit={submissionFormHandler} className="">
      <Row className="m-2 justify-content-center">
        <Col className="m-2" xs="auto">
          <Form.Select
            aria-label="language select"
            value={enteredLanguage}
            onChange={languageChangedHandler}
          >
            <option value="">Select Language</option>
            {Object.keys(languages).map((language) => {
              return (
                <option value={languages[language]} key={language}>
                  {language}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col className="m-2" xs="auto">
          <Form.Select
            aria-label="language select"
            value={enteredCountry}
            onChange={countryChangedHandler}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => {
              return (
                <option value={countries[country]} key={country}>
                  {country}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col className="m-2" xs="auto">
          <Form.Select
            aria-label="topic select"
            value={enteredTopic}
            onChange={topicChangedHandler}
          >
            <option value="">Select Topic</option>
            {topics.map((topic) => {
              if (topic === "breaking-news") topic += " (default)";

              let transformedTopic = splitString(topic, " ");

              return (
                <option value={topic} key={topic}>
                  {transformedTopic}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>
      <Row className="m-2 justify-content-center">
        <Col className="m-2" xs="auto">
          <Form.Control
            type="date"
            value={enteredDateFrom}
            onChange={dateFromChangedHandler}
          ></Form.Control>
        </Col>
        <Col className="m-2" xs="auto">
          <Form.Control
            type="date"
            value={enteredDateTo}
            onChange={dateToChangedHandler}
          ></Form.Control>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Apply Changes
      </Button>
    </Form>
  );
};

export default HeadlinesForm;
