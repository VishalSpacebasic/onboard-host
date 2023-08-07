import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { lightTheme, darkTheme } from "./Theme";
import Store from "./redux/Store";
import ThemeWrapper from "./ThemeWrapper";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={Store}>
      <ThemeWrapper />
    </Provider>
  </LocalizationProvider>
  // </React.StrictMode>
);
