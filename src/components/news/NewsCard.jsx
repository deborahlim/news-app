import { Card, Col } from "react-bootstrap";
import "./NewsCard.css";
import { timeElaspedSinceCurr } from "../../util/formatDate";
const NewsCard = (props) => {
  const { image, url, description, title, publishedAt, source } = props.article;
  const truncateDescription = (description) => {
    let upTo144Char = description;
    if(description.length > 144) {
      upTo144Char = description.slice(0, 145) + "...";
    }
    return upTo144Char;
  };

  return (
    <Col className="g-4">
      <Card.Link href={url} target="_blank" className="news-card">
        <Card className="news-card">
          <Card.Img variant="top" src={image} className="news-card-img" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{truncateDescription(description)}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            {timeElaspedSinceCurr(publishedAt)}
            <br />
            Source: {source.name}
          </Card.Footer>
        </Card>
      </Card.Link>
    </Col>
  );
};

export default NewsCard;
