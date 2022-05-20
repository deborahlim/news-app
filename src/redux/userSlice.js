import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { signupUserAPI } from "../api/users";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      let response = await signupUserAPI(data);
      console.log(response);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

// createSlice handles the action and reducer in a single function
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = true;
      state.isSuccess = false;
      state.isFetching = false;
      state.name = "";
      state.email = "";
    },
    updateState: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.name = payload.name;
      state.errorMessage = ""
    },
  },

  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.dir(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.name = payload.name;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, {payload}) => {
      state.isPending = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});
export const { clearState, updateState } = userSlice.actions;
export const userSelector = (state) => state.user;
