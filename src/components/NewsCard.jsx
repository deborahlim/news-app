
import { Card } from "react-bootstrap";
import "./NewsCard.css";
import Col from "react-bootstrap/Col";
const NewsCard = (props) => {
  const { image, url, description, title } = props.article;

  const truncateDescription = (description) => {
    let reDot = /[.]/g;
    let indexOfDot = description.search(reDot);
    return description.slice(0, indexOfDot + 1);
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
          <Card.Img
            variant="top"
            src={image}
            className="card-img"
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{truncateDescription(description)}</Card.Text>
          </Card.Body>
        </Card>
      </Card.Link>
    </Col>
  );
};

export default NewsCard;
