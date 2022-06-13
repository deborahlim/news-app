import { userSelector } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Badge, Spinner, Row, Nav } from "react-bootstrap";
import NewsCard from "./NewsCard";
import useArticles from "../hooks/use-articles";
import { useEffect, useState } from "react";

const SavedTopics = () => {
  let { savedTopics, token, lang, country } = useSelector(userSelector);

  const [articles, fetchArticles, error, isLoading] = useArticles();
  const [currentTopic, setCurrentTopic] = useState(
    savedTopics[savedTopics.length - 1]
  );
  useEffect(() => {
    console.log(currentTopic);
    if (currentTopic) {
      fetchArticles({
        endpoint: "search",
        lang,
        country,
        topic: currentTopic,
      });
    }
  }, [currentTopic, lang, country, fetchArticles]);

  let otherContent;
  let topicsContent;
  let articlesContent;
  // topics content
  if (savedTopics.length > 0) {
    topicsContent = savedTopics.map((topic) => {
      return (
        <Badge
          as={Nav.Link}
          className=" m-2"
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
    if (!token) {
      otherContent = (
        <p className="lead">
          <NavLink to="/login">Log In</NavLink> to your account to see your
          saved topics
        </p>
      );
    } else {
      otherContent = (
        <p className="lead">
          <NavLink to="/">Explore</NavLink> more articles
        </p>
      );
    }
  }

  // other content
  if (isLoading) {
    otherContent = <Spinner size="lg" animation="grow" />;
  }
  if (error) {
    otherContent = error.message;
  }

  // article content
  if (savedTopics.length > 0) {
    articlesContent = articles.map((article) => {
      return <NewsCard article={article} key={article.url} />;
    });
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
        {otherContent}
        {articlesContent}
      </Row>
    </>
  );
};

export default SavedTopics;
