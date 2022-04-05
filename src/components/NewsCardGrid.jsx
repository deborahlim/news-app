import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";

import Row from "react-bootstrap/Row";

import NewsCard from "./NewsCard";
import useArticles from "../hooks/use-articles";


const NewsCardGrid = () => {
  const { endpoint, topic} = useParams();
  const [parameters, setParameters] = useState({
    endpoint: endpoint,
    topic: "",
    lang: "en",
    country: "sg",
    q: "",
  });

  const [articles, fetchArticles] = useArticles([]);

  useEffect(() => {
    if (parameters.topic !== topic || parameters.endpoint !== endpoint) {
      setParameters({ ...parameters, endpoint, topic});
      fetchArticles({ ...parameters, endpoint, topic});
    }
  }, [fetchArticles, parameters, topic, endpoint]);

  let content = "loading";
  if (articles.length > 0) {
    content = articles.map((article) => {
      return <NewsCard article={article} key={article.publishedAt} />;
    });
  } else {
    content = "No news articles available now. Come back later!";
  }

  return (
    <section>
      <Row xs={1} md={2} className="g-4 m-3 justify-content-center">
        {content}
      </Row>
    </section>
  );
};

export default NewsCardGrid;
