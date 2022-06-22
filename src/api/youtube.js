// 1. Load the JavaScript client library.
import axios from "axios";


export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: process.env.REACT_APP_YOUTUBE_DATA_API_KEY,
  },
});

