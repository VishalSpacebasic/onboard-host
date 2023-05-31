import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
    setDark: (state) => {
      state.dark = true;
    },
    setLight: (state) => {
      state.dark = false;
    },
  },
});
export const { toggleTheme, setDark, setLight } = themeSlice.actions;
export default themeSlice.reducer;
