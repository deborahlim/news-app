import news from "../api/news";
const fetchNewsData = async (
  endpoint,
  topic = "breaking-news",
  lang = "en",
  country = "sg",
  from = Date(),
  to,
  setData,
  setError,
  setIsLoading
) => {
  // fetch api does not throw error automatically for error status codes
  try {
    setIsLoading(true);

    // fetch returns promise
    // res is an object, gnews returns JSON object, easy to translate to JS objects

    const response = await news.get(endpoint, {
      params: {
        topic,
        lang,
        country,
        from,
        to,
      },
    });
    console.log(response);
    if (response.status !== 200) {
      // if error is thrown, proceed to catch block immediately
      throw new Error("Something went wrong");
    }
    setData(response.data.articles);
  } catch (err) {
    setError(err.message);
  }
  setIsLoading(false);
};

export default fetchNewsData;
