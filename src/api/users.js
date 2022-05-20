import axios from "axios";

const users = axios.create({
  baseURL: "http://127.0.0.1:3001/api/users/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const signupUserAPI = async (data) => {
  console.log(data);
  try {
    const response = await users.post("signup", data);
    console.log(response.response.data);
    return response.response.data;
  } catch (err) {
    console.dir(err.response.data);
    throw err.response.data.message;
  }
};
export { signupUserAPI };
