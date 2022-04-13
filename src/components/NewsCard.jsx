import { Card } from "react-bootstrap";
import "./NewsCard.css";
import Col from "react-bootstrap/Col";
const NewsCard = (props) => {
  const { image, url, description, title, publishedAt, source } = props.article;

  const truncateDescription = (description) => {
    let reDot = /[.]/g;
    let indexOfDot = description.search(reDot);
    return description.slice(0, indexOfDot + 1);
  };
  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days";
  }
  const timeElaspedSinceCurr = (str) => {
    const timeElasped = msToTime(Date.now() - new Date(str).getTime());
    return timeElasped;
  };

  return (
    <Col className="g-4">
      <Card.Link
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        as={Card}
        style={{ cursor: "pointer" }}
      >
        <Card className="card">
          <Card.Img variant="top" src={image} className="card-img" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{truncateDescription(description)}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            {timeElaspedSinceCurr(publishedAt)} ago
            <br />
            Source: {source.name}
          </Card.Footer>
        </Card>
      </Card.Link>
    </Col>
  );
};

export default NewsCard;
