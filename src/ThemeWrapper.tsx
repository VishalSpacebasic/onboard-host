import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import App from "./App";
import { lightTheme, darkTheme } from "./Theme";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setDark, setLight } from "./redux/Reducers/themeReducer";

type Props = {};

function ThemeWrapper({}: Props) {
  const dispatch = useDispatch();
  const darkMode: boolean = useSelector((store) => store.theme.dark);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    console.log(darkMode, "THEMEEE");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const chromeQuery = window.matchMedia("(forced-colors: active)");
    const updateTheme = () => {
      if (darkQuery.matches) {
        setTheme("dark");
        console.log("THEMEEE TRUE");
        dispatch(setDark());
      } else if (chromeQuery.matches) {
        setTheme("high-contrast");
        dispatch(setDark());
      } else {
        setTheme("light");
        dispatch(setLight());
      }
    };

    updateTheme();

    darkQuery.addEventListener("change", updateTheme);
    chromeQuery.addEventListener("change", updateTheme);

    console.log(darkMode, "THEMEEE");
    return () => {
      darkQuery.removeEventListener("change", updateTheme);
      chromeQuery.removeEventListener("change", updateTheme);
    };
  }, []);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme={ "light"}
      />
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default ThemeWrapper;
