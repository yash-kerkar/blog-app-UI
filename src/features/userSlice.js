import { createSlice } from "@reduxjs/toolkit";
import { isAdmin } from "../Services/auth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      data: null,
      login: false,
      isAdmin: false,
    },
  },
  reducers: {
    login2: (state, action) => {
      state.user.data = action.payload.data;
      state.user.login = action.payload.login;
      state.user.isAdmin = action.payload.isAdmin;
    },
    logout2: (state) => {
      state.user.data = null;
      state.user.login = false;
      state.user.isAdmin = false;
    },
  },
});

export const { login2, logout2 } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
