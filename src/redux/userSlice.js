import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signupUserAPI,
  loginUserAPI,
  googleAuthAPI,
  getCurrUserAPI,
  updateCurrUserDetailsAPI,
  updateCurrUserNewsSettingsAPI,
  updateCurrUserSavedTopicsAPI,
  updateCurrUserPasswordAPI,
  deleteCurrUserAPI,
} from "../api/users";

// createAsyncThunk accepys 3 parameters
// 1. string action type: A string that will be used to generate additional Redux action type constants, represention the lifecycle of an async requests
// 2. payloadCreator callback: A callback function that should return a promise containing the result of some asynchronous logic, or may return a value synchronously.
// If there is an error it should either return a rejected promise containing an Error instance
// or a plain value such as a descriptive error message or
// otherwise a resolved promise with a RejectWithValue argument returned by the thunkAPI.rejectWithValue function
// 3. options object

// returns a standard thunk action creator which will have plain action creators for the pending, fulfilled and rehjected cases
// when dispatched the thunk will dispatch the pending action
// call the payload creator callback and wait for the returned promise to settle
// when the promise settles, if promise resolved successfully dispatch the fulfilled action with the promise value as action.payload
// if resolved with a rejectWithValue (value) return value dispatch the rejected action with the value passed into action.payload and "Rejected" as action.error.message
// return a fulfilled promise containing the final dispatched action (either the fulfilled or rejected action object)

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (data, thunkAPI) => {
    try {
      let response = await signupUserAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (data, thunkAPI) => {
    try {
      let response = await loginUserAPI(data);
      console.log(response);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const googleAuthUser = createAsyncThunk(
  "users/googleAuthUser",
  async (data, thunkAPI) => {
    try {
      let response = await googleAuthAPI(data);
      return response;
    } catch (err) {
      console.dir(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCurrUser = createAsyncThunk(
  "users/getCurrUser",
  async (data, thunkAPI) => {
    try {
      let response = await getCurrUserAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateCurrUserDetails = createAsyncThunk(
  "users/updateCurrUserDetails",
  async (data, thunkAPI) => {
    try {
      let response = await updateCurrUserDetailsAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateCurrUserNewsSettings = createAsyncThunk(
  "users/updateCurrUserNewsSettings",
  async (data, thunkAPI) => {
    try {
      let response = await updateCurrUserNewsSettingsAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateCurrUserSavedTopics = createAsyncThunk(
  "users/updateCurrUserSavedTopics",
  async (data, thunkAPI) => {
    try {
      let response = await updateCurrUserSavedTopicsAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateCurrUserPassword = createAsyncThunk(
  "users/updateCurrUserPassword",
  async (data, thunkAPI) => {
    try {
      let response = await updateCurrUserPasswordAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteCurrUser = createAsyncThunk(
  "users/deleteCurrUser",
  async (data, thunkAPI) => {
    try {
      let response = await deleteCurrUserAPI(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// createSlice handles the action and reducer in a single function
// accepts an initial state, an object of reducer functions, and a slice name
// automatically generates action creators and action types that correspond to the reducers and state
// internally uses createAction and createReducer
// returns an object
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    role: "",
    country: "",
    lang: "",
    token: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    isGoogleAuth: false,
    savedTopics: [],
    photo: null,
  },
  reducers: {
    clearState: (state) => {
      state.name = "";
      state.email = "";
      state.country = "";
      state.lang = "";
      state.token = null;
      state.role = "";
      state.photo = null;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
      state.isGoogleAuth = false;
      state.savedTopics = [];
    },
  },

  // to handle the promise lifycycle actions
  // extraReducers allows createSlice to respond to other action types besides the types it has generated
  // an object containing Redux case reducer functions
  // keys should be OTHER Redux string actions type constants and createSlice will not NOT auto-generate
  // action types or action creators for reducers included in this parameter
  // action creators that were generated using createAction may be used directly as the keys here

  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.dir(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.data.user.name;
      state.token = payload.token;
      state.country = payload.country;
      state.lang = payload.language;
      state.savedTopics = payload.savedTopics;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.dir(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.data.user.name;
      state.token = payload.token;
      state.country = payload.country;
      state.lang = payload.language;
      state.savedTopics = payload.savedTopics;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [googleAuthUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.data.user.name;
      state.token = payload.token;
      state.country = payload.data.user.country;
      state.lang = payload.data.user.language;
      state.isGoogleAuth = true;
      state.savedTopics = payload.data.user.savedTopics;
    },
    [googleAuthUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
      state.isGoogleAuth = true;
    },
    [googleAuthUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
      state.isGoogleAuth = true;
    },
    [getCurrUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.country = payload.data.country;
      state.lang = payload.data.language;
      state.role = payload.data.role;
      state.photo = payload.data.photo;
    },
    [getCurrUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [getCurrUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [updateCurrUserDetails.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.data.user.name;
      state.email = payload.data.user.email;
      state.photo = payload.data.user.photo;
    },
    [updateCurrUserDetails.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [updateCurrUserDetails.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [updateCurrUserNewsSettings.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.country = payload.data.user.country;
      state.lang = payload.data.user.language;
    },
    [updateCurrUserNewsSettings.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [updateCurrUserNewsSettings.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [updateCurrUserSavedTopics.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.savedTopics = payload.data.user.savedTopics;
    },
    [updateCurrUserSavedTopics.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [updateCurrUserSavedTopics.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [updateCurrUserPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.data.user.name;
      state.token = payload.token;
    },
    [updateCurrUserPassword.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [updateCurrUserPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [deleteCurrUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = "";
      state.token = null;
    },
    [deleteCurrUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    [deleteCurrUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});
export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
