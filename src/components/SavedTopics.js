import { userSelector } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Badge, Spinner, Row } from "react-bootstrap";
import NewsCard from "./NewsCard";
import useArticles from "../hooks/use-articles";
import { useEffect, useState } from "react";

const SavedTopics = () => {
  let { savedTopics, token, lang, country } = useSelector(userSelector);

  const [articles, fetchArticles, error, isLoading] = useArticles([]);
  const [currentTopic, setCurrentTopic] = useState(
    savedTopics[savedTopics.length - 1]
  );
  useEffect(() => {
    fetchArticles({
      endpoint: "search",
      lang,
      country,
      topic: currentTopic,
    });
  }, [currentTopic, lang, country, fetchArticles]);
  let topicsContent;
  let content;
  if (!token) {
    content = (
      <p className="lead">
        <NavLink to="/login">Log In</NavLink> to your account to see your saved
        topics
      </p>
    );
  }

  if (savedTopics.length > 0) {
    topicsContent = savedTopics.map((topic) => {
      return (
        <Badge
          className="m-2"
          bg="secondary"
          key={topic}
          onClick={() => setCurrentTopic(topic)}
        >
          {topic}
        </Badge>
      );
    });
  } else {
    topicsContent = "You do not have any saved topics";
  }

  if (isLoading) {
    content = <Spinner size="lg" animation="grow" />;
  } else if (error) {
    content = error;
  } else if (savedTopics.length > 0) {
    content = articles.map((article) => {
      return <NewsCard article={article} key={article.url} />;
    });
  }

  if (!token) {
  } else if (!savedTopics) {
    content = "You do not have any saved topics";
  }

  return (
    <>
      <h1 className="m-5">Saved Topics</h1>
      {topicsContent}

           <Row
        xs={1}
        sm={2}
        lg={3}
        className="g-4 m-5 px-md-5 justify-content-center"
      >
        {content}
      </Row>
    </>
  );
};

export default SavedTopics;
