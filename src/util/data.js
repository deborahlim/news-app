const fetchNewsData = async (endpoint, setNews, setError, setIsLoading) => {
  // fetch api does not throw error automatically for error status codes
  try {
    setIsLoading(true);
    const APITOKEN = "c34de8834e0d778983345e6135186dee";
    // fetch returns promise
    // res is an object, gnews returns JSON object, easy to translate to JS objects
    const response = await fetch(
      `https://gnews.io/api/v4/${endpoint}?token=${APITOKEN}`
    );

    if (!response.ok) {
      // if error is thrown, proceed to catch block immediately
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    setNews(data.articles);
  } catch (err) {
    setError(err.message);
  }
  setIsLoading(false);
};

export default fetchNewsData;
