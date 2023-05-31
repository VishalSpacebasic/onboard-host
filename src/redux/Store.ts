import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Reducers/themeReducer";
import collegeContextReducer from "./Reducers/collegeContextReducer";
import authReducer from "./Reducers/authReducer";
import applicationReducer from "./Reducers/applicationReducer";
import stepReducer from "./Reducers/stepReducer";

export default configureStore({
  reducer: {
    theme: themeReducer,
    college: collegeContextReducer,
    auth: authReducer,
    application: applicationReducer,
    step: stepReducer,
  },
});
