import { Card, Col } from "react-bootstrap";
import "./NewsCard.css";
import { timeElaspedSinceCurr } from "../../util/formatDate";
const NewsCard = (props) => {
  const { image, url, description, title, publishedAt, source } = props.article;
  const truncateContent = (content, noOfChars) => {
    if (description.length > noOfChars) {
      content = content.slice(0, noOfChars + 1) + "...";
    }
    return content;
  };

  return (
    <Col className="g-4">
      <Card.Link href={url} target="_blank" className="news-card">
        <Card className="news-card">
          <Card.Img variant="top" src={image} className="news-card-img" />
          <Card.Body>
            <Card.Title className="news-card-title">{title}</Card.Title>
            <Card.Text className="news-card-text">{truncateContent(description, 144)}</Card.Text>
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
