import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicationId: "",
  },
  reducers: {
    setApplicationInfo: (state, { payload }) => {
      state.applicationId = payload;
    },
  },
});
export const { setApplicationInfo } = applicationSlice.actions;
export default applicationSlice.reducer;
