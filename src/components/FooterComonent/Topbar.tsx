import {
  createTheme,
  FormControlLabel,
  FormGroup,
  Switch,
  styled,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/Reducers/themeReducer";
import { Stack } from "@mui/material";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function Topbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((store: any) => store.theme);
  const college = useSelector((store: any) => store.college);
  const { applicationId } = useSelector((store: any) => store?.application);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(toggleTheme(theme));
  };
  React.useEffect(() => {});

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 999 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* {sessionStorage.getItem("appId") ? (
            <Typography variant="h6">
              Application : {sessionStorage.getItem("appId")}
            </Typography>
          ) : null} */}
          <Box>
            <Stack
              p={1}
              direction
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <Avatar
                src={
                  "data:image/png;base64,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"
                }
              />
              <Box>
                <Typography variant="h6">{college?.collegeName}</Typography>
                {applicationId ? (
                  <Typography> | {applicationId}</Typography>
                ) : null}
              </Box>
            </Stack>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  // defaultChecked={!theme.dark}
                  onChange={handleThemeChange}
                  checked={theme.dark}
                  sx={{ m: 1 }}
                />
              }
              label=""
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
