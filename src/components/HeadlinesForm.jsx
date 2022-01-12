import { Form, Row, Col, Button } from "react-bootstrap";
import { languages, countries, topics } from "../util/options";
let splitString = (str, separator) => {
  let arr = str.split(separator);
  let transformedArr = arr.map((word) => {
    return !(word === "and") ? word[0].toUpperCase() + word.slice(1) : word;
  });
  return transformedArr.join(" ");
};
const HeadlinesForm = (props) => {
  console.log(languages);
  return (
    <Form>
      <Row className="m-2 justify-content-center">
        <Col className="m-2" xs="auto">
          <Form.Select aria-label="language select">
            <option>Select Language</option>
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
          <Form.Select aria-label="language select">
            <option>Select Country</option>
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
          <Form.Select aria-label="language select">
            <option>Select Topic</option>
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
      <Button variant="primary">Go</Button>
    </Form>
  );
};

export default HeadlinesForm;
