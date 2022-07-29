import axios from "axios";

const users = axios.create({
  baseURL: `${process.env.REACT_APP_USERS_DATABASE_BASE_URL}/api/users/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const googleAuthAPI = async (data) => {
  try {
    const response = await users.post("signup", data);
    return { ...response.data, newUser: true, googleAuthUser: true };
  } catch (err) {
    console.dir(err)
    // login instead if user email is already in the system
    if (err.response?.data.error?.code === 11000 || err.response?.data.message === "This email already exists") {
      try {
        const response = await users.post("login", {
          email: data.email,
          password: data.password,
          // update photo if it google acc has been updated
          photo: data.photo,
          googleAuthUser: true,
        });
        return response.data;
      } catch (err) {
        throw err.response.data.message;
      }
    } else {
      throw err.message;
    }
  }
};

const signupUserAPI = async (data) => {
  try {
    const response = await users.post("signup", data);
    return { ...response.data, newUser: true };
  } catch (err) {
    throw err.response ? err.response.data.message : err.toJSON().message
  }
};

const loginUserAPI = async (data) => {
  try {
    const response = await users.post("login", data);
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data.message : err.toJSON().message
  }
};

const forgotPasswordAPI = async (data) => {
  try {
    const response = await users.post("forgotPassword", data);
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data.message : err.toJSON().message
  }
};

const getCurrUserAPI = async (data) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    };
    const response = await users.get("me", config);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const updateCurrUserDetailsAPI = async (data) => {
  console.log(data);
  try {
    let response = await users.patch(
      "updateMe",
      {
        name: data.name,
        email: data.email,
        photo: data.photo,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const updateCurrUserNewsSettingsAPI = async (data) => {
  try {
    let response = await users.patch(
      "updateMe",
      {
        country: data.country,
        language: data.langange,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const updateCurrUserSavedTopicsAPI = async (data) => {
  console.log(data.savedTopics);
  try {
    let response = await users.patch(
      "updateMe",
      {
        savedTopics: data.savedTopics,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const updateCurrUserPasswordAPI = async ({
  passwordCurrent,
  password,
  passwordConfirm,
  token,
}) => {
  try {
    let response = await users.patch(
      "updatePassword",
      {
        passwordCurrent,
        password,
        passwordConfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

const deleteCurrUserAPI = async (data) => {
  try {
    const response = await users.delete("deleteMe", {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response.data.message;
  }
};

export {
  loginUserAPI,
  signupUserAPI,
  forgotPasswordAPI,
  googleAuthAPI,
  getCurrUserAPI,
  updateCurrUserDetailsAPI,
  updateCurrUserPasswordAPI,
  updateCurrUserNewsSettingsAPI,
  deleteCurrUserAPI,
  updateCurrUserSavedTopicsAPI,
};
