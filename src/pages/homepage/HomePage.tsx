import {
  Avatar,
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
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

function HomePage() {
  const { collegeUrl } = useParams();
  const dispatch = useDispatch();
  const collegeContext = useSelector((state: any) => state.college);
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(true);
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
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          bgcolor: "secondary",
          height: "80vh",
        }}
      >
        <Stack spacing={5} justifyContent="center" alignItems="center">
          <Box>
            <img width="100px" src={logo} />
          </Box>
          <Paper
            sx={{
              pl: "30px",
              pr: "30px",
              pt: "50px",
              pb: "30px",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            elevation={5}
          >
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
                <img src={logo} width="100px" alt="" />
              </Stack>
            </Box>
            {newUser ? (
              <LoginComponent setNewUser={setNewUser} />
            ) : (
              <LoginByAppId />
            )}
          </Paper>
        </Stack>
        {/* </Box> */}
      </Container>
      <Box
        sx={{
          width: "100%",
          height: "60px",
          position: "fixed",
          bottom: "0px",
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
