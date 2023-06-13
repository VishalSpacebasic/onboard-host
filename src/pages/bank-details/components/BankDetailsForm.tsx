import {
  Grid,
  TextField,
  FormControl,
  Button,
  FormHelperText,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import emitter from "../../../utils/EventEmiter";
import { getBankDetails, setBankDetails } from "../../../api/APIS/wizard-api";

function BankDetailsForm({ next }) {
  const {
    control,
    handleSubmit,setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountHolderName: "",
      branchBank: "",
      accountNumber: "",
      ifsc: "",
    },
  });
  useEffect(() => {
    getBankDetails().then(({ result }) => {
      Object.keys(result).forEach((fieldName) => {
        setValue(fieldName, result[fieldName]);
      });
    });
  }, []);
  const handleFormSubmit = (data) => {
    // onSubmit(data);
    setBankDetails(data).then((data) => {
      console.log(data);
      next();
      console.log("Went to next");
      
    });
  };
  useEffect(() => {
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, []);
  const handleNextClicked = () => {
    console.log("Iam clicked from personalInfoForm");

    handleSubmit(handleFormSubmit)();
    
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              name="accountHolderName"
              control={control}
              rules={{
                required: "Account Holder Name is required",
              }}
              render={({ field }) => (
                <TextField
                  id="accountHolderName"
                  label="Account Holder Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.accountHolderName}
                  helperText={errors.accountHolderName?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="branchBank"
              control={control}
              rules={{
                required: "Branch Bank is required",
              }}
              render={({ field }) => (
                <TextField
                  id="branchBank"
                  label="Branch Bank"
                  variant="outlined"
                  fullWidth
                  error={!!errors.branchBank}
                  helperText={errors.branchBank?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="accountNumber"
              control={control}
              rules={{
                required: "Account Number is required",
              }}
              render={({ field }) => (
                <TextField
                  id="accountNumber"
                  label="Account Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="ifsc"
              control={control}
              rules={{
                required: "IFSC is required",
              }}
              render={({ field }) => (
                <TextField
                  id="ifsc"
                  label="IFSC"
                  variant="outlined"
                  fullWidth
                  error={!!errors.ifsc}
                  helperText={errors.ifsc?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}

export default BankDetailsForm;
