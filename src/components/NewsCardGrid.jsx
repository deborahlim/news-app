import React from "react";
import Row from "react-bootstrap/Row";
import NewsCard from "./NewsCard";
import HeadlinesForm from "../components/HeadlinesForm";

const NewsCardGrid = (props) => {
  let newsArticles = props.news;
  console.log(newsArticles);
  return (
    <React.Fragment>
      <section>
        <HeadlinesForm />
      </section>
      <section>
        <Row xs={1} md={2} className="g-4 m-3">
          {newsArticles.map((article) => {
            return <NewsCard article={article} key={article.publishedAt} />;
          })}
        </Row>
      </section>
    </React.Fragment>
  );
};

export default NewsCardGrid;
