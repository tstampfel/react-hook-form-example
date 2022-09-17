import * as yup from "yup";

export const countryAllowanceRules = {
  Ghana: { min: 0 },
  Spain: { min: 30 },
  Brazil: { min: 0, max: 40 },
};

export const baseSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name field is required")
      .matches(/^[A-Za-z]+$/i, "Only letters allowed"),
    lastName: yup
      .string()
      .required("Last name field is required")
      .matches(/^[A-Za-z]+$/i, "Only letters allowed"),
    dateOfBirth: yup
      .date()
      .typeError("Date of birth must be selected")
      .required("Date of birth field is required"),
    allowanceDays: yup
      .number()
      .typeError("Allowance days field must be a number")
      .integer("Allowance days field must be a number")
      .positive("Allowance days field must be positive number")
      .moreThan(-1)
      .required("Allowance days field is required"),
    countryOfWork: yup
      .string()
      .typeError("Country of work field is required")
      .required("Country of work field is required")
      .matches(/^[A-Za-z]+$/i, "Only letters allowed"),
  })
  .required();

export const validationSchema = {
  Spain: baseSchema.concat(
    yup
      .object({
        maritalStatus: yup
          .string()
          .required("Marital status field is required"),
        socialInsuranceNumber: yup
          .number()
          .typeError("Social insurance number field must be a number")
          .integer("Social insurance number field must be a number")
          .positive("Social insurance number field must be positive number")
          .moreThan(-1)
          .required("Social insurance number field is required"),
      })
      .required()
  ),
  Ghana: baseSchema.concat(
    yup
      .object({
        maritalStatus: yup
          .string()
          .required("Marital status field is required"),
        numberOfChildren: yup
          .number()
          .typeError("Number of children field must be a number")
          .integer("Number of children field must be a number")
          .positive("Number of children field must be positive number")
          .moreThan(-1)
          .required("Number of children field is required"),
      })
      .required()
  ),

  Brazil: baseSchema.concat(
    yup
      .object({
        workingHours: yup
          .number()
          .typeError("Working hours field must be a number")
          .integer("Working hours field must be a number")
          .positive("Working hours field must be positive number")
          .moreThan(-1)
          .required("Working hours field is required"),
      })
      .required()
  ),
};
