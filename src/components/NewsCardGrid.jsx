import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice";
import NewsCard from "./NewsCard";
import useArticles from "../hooks/use-articles";
import Header from "../components/Header";

const NewsCardGrid = () => {
  const { lang, country } = useSelector(userSelector);
  const { endpoint, topic } = useParams();
  const [parameters, setParameters] = useState({
    endpoint: endpoint,
    topic: "",
    lang: lang,
    country: country,
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
    content = <Spinner size="lg" animation="grow" />;
  } else if (articles.length > 0) {
    content = articles.map((article) => {
      return <NewsCard article={article} key={article.publishedAt} />;
    });
    console.log(content);
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
        sm={2}
        lg={3}
        className="g-4 m-5 px-md-5 justify-content-center"
      >
        {content}
      </Row>
    </section>
  );
};

export default NewsCardGrid;
