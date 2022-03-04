import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
const NewsCard = (props) => {
  console.log(props);
  return (
    <Col className="g-4">
      <Card>
        <Card.Img variant="top" src={props.article.image} />
        <Card.Body>
          <Card.Title>
            <Card.Link
              href={props.article.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {props.article.title}
            </Card.Link>
          </Card.Title>
          <Card.Text>{props.article.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewsCard;
