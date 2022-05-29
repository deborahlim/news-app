import axios from "axios";

const users = axios.create({
  baseURL: "http://127.0.0.1:3001/api/users/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const googleAuthAPI = async (data) => {
  try {
    const response = await users.post("signup", data);
    return response.data;
  } catch (err) {
    if (err.response?.data.error.code === 11000) {
      try {
        const response = await users.post("login", {
          email: data.email,
          password: data.password,
        });
        return response.data;
      } catch (err) {
        throw err.response.data.message;
      }
    } else {
      throw err;
    }
  }
};

const signupUserAPI = async (data) => {
  try {
    const response = await users.post("signup", data);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const loginUserAPI = async (data) => {
  try {
    const response = await users.post("login", data);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const getCurrUserAPI = async (data) => {
  try {
    const config = {
      headers: {
        Authorization:  `Bearer ${data}`
      }
    }
    const response = await users.get("me", config);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

export { loginUserAPI, signupUserAPI, googleAuthAPI, getCurrUserAPI };
