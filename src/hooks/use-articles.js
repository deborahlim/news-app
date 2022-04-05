import { useState, useCallback } from "react";
import news from "../api/news";

const useArticles = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = useCallback(
    async (parameters) => {
      console.log("callback ran");
      let query = "";
      if (parameters.endpoint === "search") {
        query = parameters.topic
      }
    
      let response = await news.get(`/${parameters.endpoint}`, {
        params: {
          topic: parameters.topic,
          lang: parameters.lang,
          country: parameters.country,
          q: query,
        },
      });

        setArticles(response.data.articles);
      
      console.log(parameters);
    },
    []
  );


  return [articles, fetchArticles];
};

export default useArticles;
