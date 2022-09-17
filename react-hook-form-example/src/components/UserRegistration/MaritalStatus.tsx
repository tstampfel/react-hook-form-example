import { FunctionComponent } from "react";
import * as React from "react";
import { MenuItem, TextField } from "@mui/material";
import { FieldErrorsImpl } from "react-hook-form";

import { CountriesOfWork, MaritalStatusType } from "../../types";

interface MaritalStatusProps {
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
  register: any;
}

const MaritalStatus: FunctionComponent<MaritalStatusProps> = ({
  errors,
  register,
}) => {
  return (
    <TextField
      data-testid="marital-status-select"
      label="Marital status"
      select
      error={!!errors["maritalStatus"]?.message}
      helperText={errors["maritalStatus"]?.message}
      {...register("maritalStatus")}
    >
      <MenuItem value={"single"}>single</MenuItem>
      <MenuItem value={"married"}>married</MenuItem>
      <MenuItem value={"divorced"}>divorced</MenuItem>
      <MenuItem value={"widowed"}>widowed</MenuItem>
    </TextField>
  );
};

export default MaritalStatus;
