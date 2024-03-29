import { useState, useCallback } from "react";
import news from "../api/news";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = useCallback(async (parameters) => {
    let query = "";
    if (parameters.endpoint === "search") {
      query = parameters.topic;
    }
    try {
      setIsLoading(true);
      let response = await news.get(`/${parameters.endpoint}`, {
        params: {
          topic: parameters.topic,
          lang: parameters.lang,
          country: parameters.country,
          q: query,
        },
      });
      setIsLoading(false);
      setArticles(response.data.articles);
    } catch (error) {
      setIsLoading(false);
      setError("Something Went Wrong! Try again later.");
      console.log(error);
    }
  }, []);

  return [articles, fetchArticles, error, isLoading];
};

export default useArticles;
