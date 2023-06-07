import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendOtp, verifyOtp } from "../../../api/APIS/init-routes";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/Reducers/authReducer";
import { setApplicationInfo } from "../../../redux/Reducers/applicationReducer";

function LoginComponent({ setNewUser }) {
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      otp: "",
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
          if (
            response.data.message == "This phone number is already registered"
          )
            toast(response.data.message, {
              type: "error",
            });
        });
    } else {
      verifyOtp(data).then(({ data }) => {
        console.log(data);
        setOppSent(false);
        if (data?.accessToken) {
          sessionStorage.setItem("accessToken", data?.accessToken);
          sessionStorage.setItem("appId", data?.applicationNumber);
          dispatch(login({ isLoggedIn: true, accessToken: data?.accessToken }));
          dispatch(setApplicationInfo(data.applicationNumber));
          navigate("onboard");
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
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name should be at least 2 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]{2,30}$/,
                    message: "First name should contain only letters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    disabled={otpSent}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name should be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    disabled={otpSent}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    disabled={otpSent}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid phone number",
                  },
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
        <Typography
          sx={{
            mt: "20px",
            position: "relative",
            bottom: "-10px",
            opacity: "0.7",
            display:"flex",
            justifyContent:"center",
            gap:1


          }}
          textAlign="center"
          variant="body1"
          fontWeight={"500"}
        >
          Already have an application ID{" "} 
          <Typography fontWeight={"600"}>
            <a
              onClick={() => setNewUser(false)}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              click here
            </a>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginComponent;
