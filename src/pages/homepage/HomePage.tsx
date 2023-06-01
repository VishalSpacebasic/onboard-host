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
            <img width="100px" src={"data:image/png;base64,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"} />
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
