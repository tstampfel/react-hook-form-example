import { FunctionComponent, useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { Alert, Button, MenuItem, Stack, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CountriesOfWork, MaritalStatusType } from "../../types";
import MaritalStatus from "./MaritalStatus";
import {
  baseSchema,
  countryAllowanceRules,
  validationSchema,
} from "../../constants/rules";
import { yupResolver } from "@hookform/resolvers/yup";

export interface IUserInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  allowanceDays: number;
  countryOfWork: CountriesOfWork;
  maritalStatus?: MaritalStatusType;
  socialInsuranceNumber?: number;
  numberOfChildren?: number;
  workingHours?: number;
}

const UserRegistrationForm: FunctionComponent<{}> = () => {
  const [schema, setSchema] = useState<any>(baseSchema);
  const [fromSubmitted, setFormSubmitted] = useState(false);

  const [holidayAllowanceRule, setHolidayAllowanceRule] = useState<{
    min: number;
    max?: number;
  }>({ min: 0 });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<IUserInfo>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      allowanceDays: 0,
      countryOfWork: null,
      maritalStatus: null,
      socialInsuranceNumber: 0,
      numberOfChildren: 0,
      workingHours: 0,
    },
  });

  const watchCountryOfWork = watch("countryOfWork", undefined);

  useEffect(() => {
    if (watchCountryOfWork) {
      setSchema(validationSchema[watchCountryOfWork]);
      setHolidayAllowanceRule(countryAllowanceRules[watchCountryOfWork]);
    }
  }, [watchCountryOfWork]);

  // If rule for allowance changed, we adjust from values here.
  useEffect(() => {
    setValue("allowanceDays", holidayAllowanceRule.min);
  }, [holidayAllowanceRule, setValue]);

  const onSubmit: SubmitHandler<IUserInfo> = (data: any) => {
    setFormSubmitted(true);
    console.log(data);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    reset();
  };

  return (
    <>
      <Box
        data-testid="user-registration-form"
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          "& .MuiFormControl-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
        title="Registration"
      >
        <Typography
          variant="h6"
          component="h6"
          id="user-registration-form-title"
        >
          Registration Form
        </Typography>

        <div>
          <TextField
            data-testid="first-name-input"
            label="First name"
            {...register("firstName")}
            type="text"
            error={!!errors["firstName"]?.message}
            helperText={errors["firstName"]?.message}
          />
        </div>
        <div>
          <TextField
            data-testid="last-name-input"
            label="Last name"
            {...register("lastName")}
            type="text"
            error={!!errors["lastName"]?.message}
            helperText={errors["lastName"]?.message}
          />
        </div>
        <div data-testid="date-of-birth-select">
          <TextField
            type="date"
            role="date-of-birth-select"
            label="Date of birth"
            InputLabelProps={{ shrink: true }}
            {...register("dateOfBirth")}
            error={!!errors["dateOfBirth"]?.message}
            helperText={errors["dateOfBirth"]?.message}
          />
        </div>
        <div>
          <TextField
            data-testid="allowance-days-input"
            label="Allowance days"
            type="number"
            role="allowance-days-input-role"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { ...holidayAllowanceRule } }}
            {...register("allowanceDays")}
            error={!!errors["allowanceDays"]?.message}
            helperText={errors["allowanceDays"]?.message}
          />
        </div>

        <Controller
          name="countryOfWork"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              data-testid="country-of-origin-select"
              label="Country of work"
              select
              {...field}
              inputRef={ref}
              error={!!errors["countryOfWork"]?.message}
              helperText={errors["countryOfWork"]?.message}
            >
              <MenuItem value={"Spain"}>Spain</MenuItem>
              <MenuItem value={"Ghana"}>Ghana</MenuItem>
              <MenuItem value={"Brazil"}>Brazil</MenuItem>
            </TextField>
          )}
        />

        {watchCountryOfWork === "Spain" && (
          <>
            <div>
              <TextField
                data-testid="social-insurance-input"
                label="Social insurance number"
                type="number"
                {...register("socialInsuranceNumber")}
                InputProps={{ inputProps: { maxLength: 15 } }}
                error={!!errors["socialInsuranceNumber"]?.message}
                helperText={errors["socialInsuranceNumber"]?.message}
              />
            </div>
            <div>
              <MaritalStatus
                data-testid="marital-status-select-spain"
                register={register}
                errors={errors}
              />
            </div>
          </>
        )}
        {watchCountryOfWork === "Ghana" && (
          <>
            <div>
              <TextField
                data-testid="number-of-children-input"
                label="Number of children"
                type="number"
                {...register("numberOfChildren")}
                InputProps={{ inputProps: { min: 0, max: 70 } }}
                error={!!errors["numberOfChildren"]?.message}
                helperText={errors["numberOfChildren"]?.message}
              />
            </div>
            <div>
              <MaritalStatus
                data-testid="marital-status-select"
                register={register}
                errors={errors}
              />
            </div>
          </>
        )}
        {watchCountryOfWork === "Brazil" && (
          <>
            <div>
              <TextField
                data-testid="working-hours-input"
                label="Working hours"
                type="number"
                {...register("workingHours")}
                InputProps={{ inputProps: { min: 0, max: 168 } }}
                error={!!errors["workingHours"]?.message}
                helperText={errors["workingHours"]?.message}
              />
            </div>
          </>
        )}
        <div>
          <Button variant="contained" type="submit" size="large">
            Submit
          </Button>
          <Button
            variant="outlined"
            size="large"
            style={{ marginLeft: "1vw" }}
            onClick={() => resetForm()}
          >
            Reset
          </Button>
          {Object.keys(errors).length > 0 && (
            <Stack sx={{ width: "100%", marginTop: "5vh" }} spacing={2}>
              <Alert severity="error">Not all fields were filled!</Alert>
            </Stack>
          )}
          {fromSubmitted && (
            <Stack sx={{ width: "100%", marginTop: "5vh" }} spacing={2}>
              <Alert severity="success">Form submitted!</Alert>
            </Stack>
          )}
        </div>
      </Box>
    </>
  );
};

export default UserRegistrationForm;
