import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { sendOtp, verifyOtp } from "../../../api/APIS/init-routes";
import {
  setAuthorizationHeader,
  updateAccessToken,
} from "../../../api/axios.instance";
import { setApplicationInfo } from "../../../redux/Reducers/applicationReducer";
import { login } from "../../../redux/Reducers/authReducer";

function LoginByAppId() {
  const [otpSent, setOppSent] = useState<any>(false);
  const college = useSelector((state: any) => state.college);
  const { collegeUrl } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      otp: "",
      applicationId: "",
    },
  });

  const onSubmit = (data: any) => {
    data.collegeUrl = collegeUrl;
    console.log(data);
    if (otpSent == false) {
      sendOtp(data)
        .then(({ data }) => {
          console.log(data);
          if (data.type == "success") {
            setOppSent(true);
            toast.success("OTP sent successfully");
          } else {
            toast.error("Please check the phone number and try  again");
          }
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      verifyOtp(data).then(({ data }) => {
        console.log(data);
        
        if (data?.accessToken) {
          console.log(data);
          dispatch(setApplicationInfo(data));
          setOppSent(false);
          if (data?.accessToken) {
            sessionStorage.setItem("accessToken", data?.accessToken);
            sessionStorage.setItem("appId", data?.applicationNumber);
            updateAccessToken(data?.accessToken);
            dispatch(
              login({ isLoggedIn: true, accessToken: data?.accessToken })
            );
            dispatch(setApplicationInfo(data?.applicationNumber));
            navigate("onboard");
          }
        } else {
          toast("Invalid Otp", { type: "error" });
        }
      });
    }
    // setOppSent(true);
    if (otpSent) {
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h5" align="center">
        {/* {collegeUrl} */}
      </Typography>
      <Box mt={3}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  // pattern: {
                  //   value: /^[0-9]{10}$/i,
                  //   message: "Invalid phone number",
                  // },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    disabled={otpSent}
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="applicationId"
                control={control}
                rules={{
                  required: "Application Id is erquired",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Application Id"
                    variant="outlined"
                    fullWidth
                    disabled={otpSent}
                    error={!!errors.applicationId}
                    helperText={errors?.applicationId?.message}
                  />
                )}
              />
            </Grid>
            {otpSent ? (
              <Grid item xs={12}>
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: "Otp is required",
                    maxLength: {
                      value: 5,
                      message: "Invalid Otp",
                    },
                    minLength: {
                      value: 4,
                      message: "Invalid Otp",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Otp"
                      variant="outlined"
                      fullWidth
                      error={!!errors.otp}
                      helperText={errors?.otp?.message}
                    />
                  )}
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                {!otpSent ? "Verify Phone Number" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default LoginByAppId;
