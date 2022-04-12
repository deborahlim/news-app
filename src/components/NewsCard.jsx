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

  const formatDate = (str) => {
    const dateTimeStr = new Date(str).toString();
    return dateTimeStr;
  }

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
            Published At: {formatDate(publishedAt)}
            <br/>
            Source: {source.name} 
          </Card.Footer>
        </Card>
      </Card.Link>
    </Col>
  );
};

export default NewsCard;
