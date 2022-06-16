import axios from "axios";

export default axios.create({
  baseURL: "https://gnews.io/api/v4/",
  params: {
    token: process.env.REACT_APP_GNEWS_API_TOKEN,
  },
});
