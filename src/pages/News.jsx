// useEffect is good for code that should be exected as part
//  of the component render cycle, but maybe not always when the component re renders
import { useState, useEffect, useCallback } from "react";
import NewsCardGrid from "../components/NewsCardGrid";
import Header from "../components/Header";
import fetchNewsData from "../util/data";
import HeadlinesForm from "../components/HeadlinesForm";
import Categories from "../components/Categories";
const News = ({ endpoint, topic }) => {
  // setState
  // fetching data is a side effect which changes our components state
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewsHandler = useCallback(
    async (enteredData = {}, endpoint) => {
      await fetchNewsData(
        endpoint,
        topic,
        enteredData.enteredSearchTerm,
        enteredData.enteredLanguage,
        enteredData.enteredCountry,
        enteredData.enteredDateFrom,
        enteredData.enteredDateTo,
        setNews,
        setError,
        setIsLoading
      );
    },
    [topic, endpoint]
  );

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
      <Header title="Top Headlines" />
      <Categories onUpdateSearchTerm={fetchNewsHandler}/>
      <HeadlinesForm onUpdateHeadlinesParams={fetchNewsHandler} />

      <section>{content}</section>
    </section>
  );
};

export default News;
