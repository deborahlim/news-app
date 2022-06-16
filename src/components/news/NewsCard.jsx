import { Card, Col } from "react-bootstrap";
import "./NewsCard.css";
import { timeElaspedSinceCurr } from "../../util/formatDate";
const NewsCard = (props) => {
  const { image, url, description, title, publishedAt, source } = props.article;
  const truncateDescription = (description) => {
    let reDot = /[.]/g;
    let indexOfDot = description.search(reDot);
    let upToFullStop = description.slice(0, indexOfDot + 1);
    return upToFullStop.length > 50
      ? upToFullStop.slice(0, 51) + "..."
      : upToFullStop;
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
