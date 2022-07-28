import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavLink,
  useHistory,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import { Badge, Spinner, Row, Nav } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { userSelector, updateCurrUserSavedTopics } from "../redux/userSlice";
import NewsCard from "../components/news/NewsCard";
import useArticles from "../hooks/use-articles";

import "../components/nav/Navbar.css";
import "../components/misc/tooltips.css";

const SavedTopics = () => {
  let { path } = useRouteMatch();
  let { savedTopics, token, lang, country, errorMessage } =
    useSelector(userSelector);
  const [articles, fetchArticles, error, isLoading] = useArticles();
  const [currentTopic, setCurrentTopic] = useState(
    savedTopics[savedTopics.length - 1]
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const removeFromSavedTopicsHandler = (event) => {
    event.preventDefault();
    let updatedSavedTopics = savedTopics.filter(
      (topic) => topic !== currentTopic
    );
    let enteredData = {
      savedTopics: updatedSavedTopics,
      token: token,
    };
    try {
      dispatch(updateCurrUserSavedTopics(enteredData))
        .unwrap()
        .then((result) => {
          let savedTopics = result.data.user.savedTopics;
          let lastSavedTopic = savedTopics[savedTopics.length - 1];
          setCurrentTopic(lastSavedTopic);
          toast.success("Removed from your saved topics!");
          history.push(`/saved-topics/${lastSavedTopic}`);
        });
    } catch (err) {
      toast.err(errorMessage);
    }
  };

  useEffect(() => {
    console.log(currentTopic);
    if (currentTopic) {
      history.push(`${path}/${currentTopic}`);
      fetchArticles({
        endpoint: "search",
        lang,
        country,
        topic: currentTopic,
      });
    } else {
      history.push(`${path}`);
    }
  }, [currentTopic, lang, country, fetchArticles, history, path]);

  let topicsContent;
  let articlesContent;
  // topics content
  // conditionally show saved topics
  if (savedTopics.length > 0) {
    topicsContent = savedTopics.map((topic) => {
      return (
        <span className="display-6 m-2" key={topic}>
          <Badge
            bg="light"
            key={topic}
            className="d-inline-flex align-items-center"
          >
            <Nav.Link
              as={NavLink}
              to={topic}
              onClick={() => setCurrentTopic(topic)}
            >
              {topic}
            </Nav.Link>
            {/* only allow to remove if badge is active */}
            {topic === currentTopic && (
              <span>
                <XCircle
                  className="tooltip-action"
                  onClick={removeFromSavedTopicsHandler}
                  data-tip="Remove from Saved Topics"
                  size={30}
                />
                <ReactTooltip />
              </span>
            )}
          </Badge>
        </span>
      );
    });
  } else {
    if (!token) {
      topicsContent = (
        <p className="lead">
          <NavLink to="/login">Log In</NavLink> to your account to see your
          saved topics
        </p>
      );
    } else {
      topicsContent = (
        <p className="lead">You do not have any saved topics at the moment.</p>
      );
    }
  }

  // articles content
  if (isLoading) {
    articlesContent = <Spinner size="lg" animation="grow" />;
  } else if (error) {
    articlesContent = error;
  } else if (token && articles.length > 0) {
    articlesContent = articles.map((article) => {
      return <NewsCard article={article} key={article.url} />;
    });
  } else if (token && articles.length === 0) {
    articlesContent = (
      <p className="lead">
        No articles were found. Try searching for a different topic.
      </p>
    );
  }
  return (
    <>
      <h1 className="m-5">Saved Topics</h1>
      <Switch>
        <Route exact path={path}>
          {topicsContent}
        </Route>
        <Route path={`${path}/:topic`}>
          {topicsContent}
          <Row
            xs={1}
            sm={2}
            lg={3}
            className="g-4 m-5 px-md-5 justify-content-center"
          >
            {articlesContent}
          </Row>
        </Route>
      </Switch>
    </>
  );
};

export default SavedTopics;
