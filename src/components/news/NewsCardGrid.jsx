import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PlusCircle, CheckCircle } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";

import { userSelector, updateCurrUserSavedTopics } from "../../redux/userSlice";
import NewsCard from "./NewsCard";
import useArticles from "../../hooks/use-articles";
import Header from "../../components/misc/Header";
import { topics } from "../../util/options";

import "../misc/tooltips.css";
import "./NewsCardGrid.css";

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
  const [articles, fetchArticles, error, isLoading] = useArticles();

  const checkIfAddedToSavedTopics = () => {
    let isSavedTopic = !!savedTopics.find((el) => el === topic);
    return isSavedTopic;
  };

  const checkAllowAddToSavedTopic = () => {
    // do not allow if not logged in
    if (!token) return false;
    let isPredefinedTopic = !!topics.find((el) => el === topic);
    return !isPredefinedTopic && !checkIfAddedToSavedTopics();
  };

  const addToSavedTopicsHandler = (event) => {
    event.preventDefault();
    let checkAllow = checkAllowAddToSavedTopic();
    if (!token || !checkAllow) return;
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
    content = `No news articles were found.`;
  }
  return (
    <>
      <Header
        title={endpoint === "search" ? `Search Results: ${topic}` : `${topic}`}
      >
        {checkAllowAddToSavedTopic() && (
          <>
            <PlusCircle
              className="m-2 tooltip-action"
              onClick={addToSavedTopicsHandler}
              data-tip="Add to Saved Topics"
              size={20}
            />
            <ReactTooltip />
          </>
        )}

        {checkIfAddedToSavedTopics() && (
          <>
            <CheckCircle
              className="m-2 tooltip-check"
              data-tip="Added to Saved Topics"
              size={20}
            />
            <ReactTooltip />
          </>
        )}
      </Header>
      <div className="mb-3 d-inline-flex news-grid justify-content-center">
        <Row
          xs={1}
          sm={2}
          lg={3}
          className="g-4 m-2 px-md-5 "
        >
          {content}
        </Row>
      </div>
    </>
  );
};

export default NewsCardGrid;
