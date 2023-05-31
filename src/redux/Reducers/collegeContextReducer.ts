import { createSlice } from "@reduxjs/toolkit";

export const collegeSlice = createSlice({
  name: "theme",
  initialState: {
    collegeUrl: "",
    collegeId: -1,
    collegeLogo: "",
    collegeName: "",
  },
  reducers: {
    setCollegeUrl: (state, { payload }) => {
      state.collegeUrl = payload;
    },
    setCollegeId: (state, { payload }) => {
      state.collegeId = payload;
    },
    setCollegeLogo: (state, { payload }) => {
      state.collegeLogo = payload;
    },
    setCollegeName: (state, { payload }) => {
      state.collegeName = payload;
    },
  },
});
export const { setCollegeId, setCollegeUrl, setCollegeLogo, setCollegeName } =
  collegeSlice.actions;
export default collegeSlice.reducer;
