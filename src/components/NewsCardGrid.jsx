import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Row, Spinner, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, updateCurrUserSavedTopics } from "../redux/userSlice";
import NewsCard from "./NewsCard";
import useArticles from "../hooks/use-articles";
import Header from "../components/Header";
import { topics } from "../util/options";
import { toast } from "react-toastify";

const NewsCardGrid = () => {
  const { lang, country, token, savedTopics, errorMessage } =
    useSelector(userSelector);
  const { endpoint, topic } = useParams();
  const dispatch = useDispatch();
  const [parameters, setParameters] = useState({
    endpoint: endpoint,
    topic: "",
    lang: lang,
    country: country,
    q: "",
  });
  const [articles, fetchArticles, error, isLoading] = useArticles([]);

  const addToSavedTopicsHandler = (event) => {
    event.preventDefault();
    const updatedSavedTopics = savedTopics.slice();
    updatedSavedTopics.push(topic);
    let enteredData = {
      savedTopics: updatedSavedTopics,
      token: token,
    };
    try {
      dispatch(updateCurrUserSavedTopics(enteredData));
      toast.success("Added to your saved topics!");
    } catch (err) {
      toast.error(errorMessage);
    }
  };

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
      return <NewsCard article={article} key={article.url} />;
    });
  } else if (error) {
    content = error;
  } else {
    content = `No news articles were found. Please try again.`;
  }
  console.log(articles);
  return (
    <section>
      <Header
        title={endpoint === "search" ? `Search Results: ${topic}` : `${topic}`}
      ></Header>
      {token && !topics.find((el) => el === topic) && (
        <Button variant="secondary" size="sm" onClick={addToSavedTopicsHandler}>
          Add to Saved Topics
        </Button>
      )}

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
