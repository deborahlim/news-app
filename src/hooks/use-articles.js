import { useState, useCallback } from "react";
import news from "../api/news";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const fetchArticles = useCallback(async (parameters) => {
    let query = "";
    if (parameters.endpoint === "search") {
      query = parameters.topic;
    }
try {
  let response = await news.get(`/${parameters.endpoint}`, {
    params: {
      topic: parameters.topic,
      lang: parameters.lang,
      country: parameters.country,
      q: query,
    },
  });
  setArticles(response.data.articles);
}
catch(error) {
  setError(error);
}


  }, []);

  return [articles, fetchArticles, error];
};

export default useArticles;
