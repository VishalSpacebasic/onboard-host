import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "theme",
  initialState: {
    isLoggedIn: false,
    accessToken: "",
  },
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.accessToken = payload;
    },
    logOut: (state, { payload }) => { 
      state.isLoggedIn = false;
      state.accessToken = "";
    },
  },
});
export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
