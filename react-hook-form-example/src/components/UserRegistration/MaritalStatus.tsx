import { FunctionComponent } from "react";
import * as React from "react";
import { MenuItem, TextField } from "@mui/material";
import { Control, FieldErrorsImpl, useController } from "react-hook-form";
import { IUserInfo } from "./UserRegistrationForm";
import { CountriesOfWork, MaritalStatusType } from "../../types";

interface MaritalStatusProps {
  name: keyof IUserInfo;
  errors: FieldErrorsImpl<{
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    allowanceDays: number;
    countryOfWork: NonNullable<CountriesOfWork>;
    maritalStatus: NonNullable<MaritalStatusType | undefined>;
    socialInsuranceNumber: number;
    numberOfChildren: number;
    workingHours: number;
  }>;
  control: Control<IUserInfo, any>;
}

const MaritalStatus: FunctionComponent<MaritalStatusProps> = ({
  name,
  errors,
  control,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <TextField
      data-testid="marital-status-select"
      label="Marital status"
      select
      error={!!errors["maritalStatus"]?.message}
      helperText={errors["maritalStatus"]?.message}
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
    >
      <MenuItem value={"single"}>single</MenuItem>
      <MenuItem value={"married"}>married</MenuItem>
      <MenuItem value={"divorced"}>divorced</MenuItem>
      <MenuItem value={"widowed"}>widowed</MenuItem>
    </TextField>
  );
};

export default MaritalStatus;
