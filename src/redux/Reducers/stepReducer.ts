import { createSlice } from "@reduxjs/toolkit";

export const stepSlice = createSlice({
  name: "application",
  initialState: {
    currentStep: 0,
    currentStatus: 0,
  },
  reducers: {
    setWizardStep: (state, { payload }) => {
      // console.log("stepSlice called", payload);
      state.currentStep = payload;
    },
    setCurrentStatus: (state, { payload }) => {
      state.currentStatus = payload;
    },
  },
});
export const { setWizardStep, setCurrentStatus } = stepSlice.actions;
export default stepSlice.reducer;
