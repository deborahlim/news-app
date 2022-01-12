// useEffect is good for code that should be exected as part
//  of the component render cycle, but maybe not always when the component re renders
import { useState, useEffect, useCallback } from "react";
import NewsCardGrid from "../components/NewsCardGrid";
import Header from "../components/Header";
import fetchNewsData from "../util/data";
import Button from "react-bootstrap/Button";
const Explore = () => {
  // setState
  // fetching data is a side effect which changes our components state
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewsHandler = useCallback(async () => {
    await fetchNewsData(
      "top-headlines",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      setNews,
      setError,
      setIsLoading
    );
  }, []);

  // called whenever the dependencies listed below change
  useEffect(() => {
    fetchNewsHandler();
  }, [fetchNewsHandler]);

  let content = "No news articles found. Come back Later!";
  if (news.length > 0) {
    content = <NewsCardGrid news={news} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <section>
      <Header title="Top News Headlines" />
      <Button variant="primary" onClick={fetchNewsHandler}>
        Refresh
      </Button>
      <section>{content}</section>
    </section>
  );
};

export default Explore;
