import { Card } from "react-bootstrap";
import "./NewsCard.css";
import Col from "react-bootstrap/Col";
const NewsCard = (props) => {
  const { image, url, description, title } = props.article;
  return (
    <Col className="g-4">
      <Card>
        <Card.Img variant="top" src={image} className="card-img" />
        <Card.Body>
          <Card.Title>
            <Card.Link href={url} target="_blank" rel="noreferrer noopener">
              {title}
            </Card.Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewsCard;
