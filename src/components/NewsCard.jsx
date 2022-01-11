import { Card } from "react-bootstrap";

const NewsCard = (props) => {
  console.log(props);
  return (
    <Card>
      <Card.Img variant="top" src={props.article.image} />
      <Card.Body>
        <Card.Title>{props.article.title}</Card.Title>
        <Card.Text>{props.article.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
