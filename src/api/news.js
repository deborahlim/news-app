import axios from "axios";

export default axios.create({
  baseURL: "https://gnews.io/api/v4/",
  params: {
    token: "c34de8834e0d778983345e6135186dee",
  },
});
