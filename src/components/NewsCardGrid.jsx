import { Row, Col } from "react-bootstrap";
import NewsCard from "./NewsCard";

const NewsCardGrid = (props) => {
  let newsArticles = props.news;
  console.log(newsArticles);
  return (
    <Row xs={1} md={2} className="g-4 m-3">
      {newsArticles.map((article, index) => {
        console.log(index);
        return (
          <Col className="g-4">
            <NewsCard article={article} key={index.toString()} />
          </Col>
        );
      })}
    </Row>
  );
};

export default NewsCardGrid;
