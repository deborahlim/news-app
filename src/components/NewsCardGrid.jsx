import React from "react";
import Row from "react-bootstrap/Row";
import NewsCard from "./NewsCard";

const NewsCardGrid = (props) => {
  let newsArticles = props.news.map((article) => {
    return <NewsCard article={article} key={article.publishedAt} />;
  });
  return (
    <section>
      <Row xs={1} md={2} className="g-4 m-3">
        {newsArticles}
      </Row>
    </section>
  );
};

export default NewsCardGrid;
