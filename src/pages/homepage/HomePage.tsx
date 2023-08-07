import {
  Avatar,
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosInstance from "../../api/axios.instance";
import {
  setCollegeId,
  setCollegeLogo,
  setCollegeName,
  setCollegeUrl,
} from "../../redux/Reducers/collegeContextReducer";
import LoginComponent from "./components/LoginComponent";
import LoginByAppId from "./components/LoginByAppId";
import Scrollbars from "react-custom-scrollbars-2";
import { TabContext, TabList, TabPanel } from "@mui/lab";

function HomePage() {
  const { collegeUrl } = useParams();
  const dispatch = useDispatch();
  const collegeContext = useSelector((state: any) => state.college);
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(true);
  const [tab, setTab] = useState("2");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  useEffect(() => {
    console.log("HOMEPAGE LOG");
    axiosInstance
      .get("api/v3/onboarding/init/info", {
        params: {
          collegeUrl,
        },
        headers: {
          Authorization: "",
        },
      })
      .then(({ data }) => {
        dispatch(setCollegeUrl(collegeUrl));
        dispatch(setCollegeLogo(data.result.collegeLogo));
        setLogo(data.result.collegeLogo);

        dispatch(setCollegeName(data.result.collegeName));
        sessionStorage.setItem("collegeId", data.result.collegeId);
        sessionStorage.setItem("collegeName", data.result.collegeName);
        setLogo(data.result.collegeLogo);
        dispatch(setCollegeId(data.result.collegeId));
      })
      .catch(() => {
        navigate("/");
      });
  }, [collegeUrl, dispatch, navigate]);
  return (
    <Box>
      <Scrollbars
        style={{
          width: "100%",
          height: "87vh",
          display: "flex",
          flexDirection: "column",
        }}
        // autoHeight
      >
        <Container
          maxWidth="sm"
          sx={{
            mt: 7,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            bgcolor: "secondary",
            height: "80vh",
            zIndex: 999,
          }}
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Box>
              <img width="100px" src={logo} />
            </Box>
            <Typography variant="h6" textAlign={"center"}>
              {" "}
              {collegeContext?.collegeName} Student Housing Registration Portal
            </Typography>

            <Paper
              sx={{
                pl: "10px",
                pr: "10px",
                pt: "15px",
                pb: "10px",
                maxWidth: "600px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              elevation={5}
            >
              <TabContext value={tab}>
                {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    variant="fullWidth"
                    onChange={handleTabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="NEW APPLICANT" value="1" />
                    <Tab label="Please Login With your ergistered" value="2" />
                  </TabList>
                </Box> */}
                {/* <TabPanel value="1">
                  <LoginComponent setNewUser={setNewUser} />
                </TabPanel> */}
                <TabPanel value="2">
                  <LoginByAppId />
                </TabPanel>
              </TabContext>
              <Box
                sx={{
                  position: "relative",
                  top: "-40px",
                  left: "-10px",
                }}
              >
                {!newUser ? (
                  <IconButton onClick={() => setNewUser(true)}>
                    {" "}
                    <ArrowBackIcon />
                  </IconButton>
                ) : null}
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between">
                  {/* {JSON.stringify(collegeContext)} */}
                  {/* <img src={logo} width="100px" alt="" /> */}
                </Stack>
              </Box>
              {/* {newUser ? (
                <LoginComponent setNewUser={setNewUser} />
              ) : (
                <LoginByAppId />
              )} */}
            </Paper>
          </Stack>
          {/* </Box> */}
        </Container>
      </Scrollbars>
      <Box
        sx={{
          // width: "100%",
          height: "60px",
          position: "fixed",
          bottom: "0px",
          right: "0px",
          display: "flex",
          justifyContent: "end",
          padding: 2,
        }}
        bgcolor=""
      >
        {" "}
        <img
          src="https://uploads-ssl.webflow.com/63135f0b6c1bca50e76ef01d/63176d745a790f0f75560b92_Primary.svg"
          loading="lazy"
          alt=""
          width="100px"
        />
      </Box>
    </Box>
  );
}

export default HomePage;
