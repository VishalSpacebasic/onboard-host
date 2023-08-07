import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getParentInfo, setParentInfo } from "../../../api/APIS/wizard-api";
import emitter from "../../../utils/EventEmiter";

type Props = { next };

function ParentInfoForm({ next }: Props) {
  const { currentStatus } = useSelector((store: any) => store.step);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      guardianName: "",
      guardianPhone: "",
      guardianRelation: "",
      guardianEmail: "",
      guardianAddress: "",
      guardianCity: "",
      guardianState: "",
      guardianPin: "",
    },
  });
  function onSubmit(data: any) {
    console.log(data);
    setParentInfo(data);
    next();
  }
  const handleNextClicked = () => {
    console.log("Iam clicked from personalInfoForm");

    handleSubmit(onSubmit)();
  };
  useEffect(() => {
    getParentInfo().then((parentInfo) => {
      console.log(parentInfo);
      setValue("guardianName", parentInfo.guardianName);
      setValue("guardianPhone", parentInfo.guardianPhone);
      setValue("guardianRelation", parentInfo.guardianRelation);
      setValue("guardianEmail", parentInfo.guardianEmail);
      setValue("guardianAddress", parentInfo.guardianAddress);
      setValue("guardianCity", parentInfo.guardianCity);
      setValue("guardianState", parentInfo.guardianState);
      setValue("guardianPin", parentInfo.guardianPin);
    });
  },[]);
  useEffect(() => {
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, [handleNextClicked]);
 

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <fieldset style={{ border: "none" }} disabled={true}>
        <Grid mt={1} justifyContent="space-between" spacing={3} container>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="guardianName"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="guardianName"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.guardianName}
                  helperText={
                    errors.guardianName && "Guardian Name is required"
                  }
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="guardianPhone"
              control={control}
              rules={{
                // required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Invalid phone number",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="guardianPhone"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  error={!!errors.guardianPhone}
                  helperText={errors.guardianPhone?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="guardianRelation"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Relation
                  </InputLabel>
                  <Select
                    labelId="guardian-relation-label"
                    id="guardian-relation"
                    disabled
                    label="Relation"
                    placeholder="Please select relation"
                    error={!!errors.guardianRelation}
                    {...field}
                  >
                    <MenuItem value="father">Father</MenuItem>
                    <MenuItem value="mother">Mother</MenuItem>
                    <MenuItem value="aunt">Guardian</MenuItem>
                  </Select>
                  {errors.guardianRelation && (
                    <FormHelperText error>
                      Guardian Relation is required
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="guardianEmail"
              control={control}
              rules={{
                // required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="guardianEmail"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.guardianEmail}
                  helperText={errors.guardianEmail?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="guardianAddress"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="guardianAddress"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  error={!!errors.guardianAddress}
                  helperText={
                    errors.guardianAddress && "Guardian Address is required"
                  }
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Controller
              name="guardianCity"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="guardianCity"
                  label="City"
                  variant="outlined"
                  fullWidth
                  error={!!errors.guardianCity}
                  helperText={
                    errors.guardianCity && "Guardian City is required"
                  }
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Controller
              name="guardianPin"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="guardianPin"
                  label="Pin"
                  variant="outlined"
                  fullWidth
                  error={!!errors.guardianPin}
                  helperText={errors.guardianPin && "Guardian Pin is required"}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </fieldset>
    </form>
  );
}

export default ParentInfoForm;
