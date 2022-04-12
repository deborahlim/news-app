import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Row from "react-bootstrap/Row";

import NewsCard from "./NewsCard";
import useArticles from "../hooks/use-articles";
import Header from "../components/Header";

const NewsCardGrid = () => {
  const { endpoint, topic } = useParams();
  const [parameters, setParameters] = useState({
    endpoint: endpoint,
    topic: "",
    lang: "en",
    country: "sg",
    q: "",
  });

  const [articles, fetchArticles, error, isLoading] = useArticles([]);

  useEffect(() => {
    if (parameters.topic !== topic || parameters.endpoint !== endpoint) {
      setParameters({ ...parameters, endpoint, topic });
      fetchArticles({ ...parameters, endpoint, topic });
    }
  }, [fetchArticles, parameters, topic, endpoint]);

  let content;
  if (isLoading) {
    content = "Loading..."
  }
  else if (articles.length > 0) {
    console.log(articles);
    content = articles.map((article) => {
      return <NewsCard article={article} key={article.publishedAt} />;
    });
  } else if (error) {
    content = error;
  } else {
    content = `No news articles were found. Please try again.`;
  }

  return (
    <section>
      <Header
        title={endpoint === "search" ? `Search Results: ${topic}` : `${topic}`}
      ></Header>
      <Row
        xs={1}
        md={2}
        lg={3}
        xl={4}
        className="g-4 m-3 justify-content-center"
      >
        {content}
      </Row>
    </section>
  );
};

export default NewsCardGrid;
