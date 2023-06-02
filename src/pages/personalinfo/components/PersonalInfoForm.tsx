import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import emitter from "../../../utils/EventEmiter";
import { getPersonalInfo, setPersonalInfo } from "../../../api/APIS/wizard-api";

function PersonalInfoForm({ next }: any) {
  const [prefil, setPrefil] = useState({});
  const [isFormDisabled, seetFormDesabled] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const { currentStatus } = useSelector((store: any) => store.step);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      registrationId: "",
      address: "",
      gender: "",
      city: "",
      pin: "",
      dob: null,
    },
  });
  const onSubmit = (data: any) => {
    setPersonalInfo(data)
      .then(({ data }) => {
        next();
      })
      .catch(() => {
        toast("Something went wrong");
      });
    console.log(data);
  };
  const handleNextClicked = () => {
    console.log("Iam clicked from personalInfoForm");

    handleSubmit(onSubmit)();
  };
  useEffect(() => {
    getPersonalInfo().then(({ data }) => {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("registrationId", data.registrationId);
      setValue("address", data.address);
      setValue("city", data.city);
      setValue("pin", data.pin);
      setValue("dob", data.dob);
      setValue("gender", data.gender);
    });
    // setValue("firstName", "Vishal");

    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FormControl disabled>
        <fieldset disabled={currentStatus !== 2} style={{ border: 0 }}>
          <Grid justifyContent="space-between" spacing={3} container>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Please enter valid first name",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Please enter valid first name",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="dob"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.dob}
                    helperText={errors.dob && "Date of birth is required"}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <Stack direction>
                        <FormControlLabel
                          value="Male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio />}
                          label="Female"
                        />
                      </Stack>
                    </RadioGroup>
                    {errors.gender && (
                      <FormHelperText error>
                        Gender selection is required
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="registrationId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="registrationId"
                    label="Registration ID"
                    variant="outlined"
                    fullWidth
                    error={!!errors.registrationId}
                    helperText={
                      errors.registrationId && "Registration ID is required"
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            {/* <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="guardian-relation-label"
                      id="guardian-relation"
                      label="Gender"
                      error={!!errors.gender}
                      {...field}
                    >
                      <MenuItem value="father">Male</MenuItem>
                      <MenuItem value="mother">Female</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText error>
                        Gender selection is required
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid> */}

            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="phone"
                    label="Phone Number"
                    variant="outlined"
                    disabled
                    fullWidth
                    error={!!errors.email}
                    helperText={
                      errors.firstName && "Registration ID is required"
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={
                      errors.firstName && "Registration ID is required"
                    }
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address && "Address is required"}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city && "City is required"}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} md={5} lg={6}>
              <Controller
                name="pin"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="pin"
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    error={!!errors.pin}
                    helperText={errors.pin && "Pincode is required"}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </fieldset>
      </FormControl>
    </form>
  );
}

export default PersonalInfoForm;
