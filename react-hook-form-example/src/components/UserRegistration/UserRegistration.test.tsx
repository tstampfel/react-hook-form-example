/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import {
  fireEvent,
  render,
  screen,
  prettyDOM,
  within,
} from "@testing-library/react";

import UserRegistration from "./UserRegistration";
import { act } from "react-dom/test-utils";
import { countryAllowanceRules } from "../../constants/rules";
import userEvent from "@testing-library/user-event";

describe("UserRegistration", () => {
  test("inital inputs in form are rendered at start", () => {
    render(<UserRegistration />);

    const firstNameInput = screen.getByTestId("first-name-input");
    const lastNameInput = screen.getByTestId("last-name-input");
    const dateOfBirthSelect = screen.getByTestId("date-of-birth-select");
    const allowanceDaysInput = screen.getByTestId("allowance-days-input");
    const countryOfWorkSelect = screen.getByTestId("country-of-origin-select");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(dateOfBirthSelect).toBeInTheDocument();
    expect(allowanceDaysInput).toBeInTheDocument();
    expect(countryOfWorkSelect).toBeInTheDocument();
  });

  test("should render Spain specific fields", async () => {
    act(() => {
      render(<UserRegistration />);
    });

    const countryOfWorkSelect = screen.getByLabelText("Country of work");

    act(() => {
      fireEvent.mouseDown(countryOfWorkSelect);
    });

    const option = screen.getByRole("option", { name: /^spain/i });

    act(() => {
      fireEvent.click(option);
    });

    const socialInsuranceInput = await screen.findByTestId(
      "social-insurance-input"
    );
    const maritalStatusSelect = await screen.findByLabelText("Marital status");

    expect(socialInsuranceInput).toBeInTheDocument();
    expect(maritalStatusSelect).toBeInTheDocument();

    const allowanceDays = await screen.findByTestId("allowance-days-input");
    const numberOfAllowanceDays = await within(allowanceDays).findByRole(
      "spinbutton"
    );
    expect(numberOfAllowanceDays.getAttribute("min")).toBe(
      countryAllowanceRules.Spain.min.toString()
    );
  });

  test("should render Ghana specific fields", async () => {
    act(() => {
      render(<UserRegistration />);
    });

    const countryOfWorkSelect = screen.getByLabelText("Country of work");

    act(() => {
      fireEvent.mouseDown(countryOfWorkSelect);
    });

    const option = screen.getByRole("option", { name: /^ghana/i });

    act(() => {
      fireEvent.click(option);
    });

    const numberOfChildrenInput = await screen.findByTestId(
      "number-of-children-input"
    );
    const maritalStatusSelect = await screen.findByLabelText("Marital status");

    expect(numberOfChildrenInput).toBeInTheDocument();
    expect(maritalStatusSelect).toBeInTheDocument();

    const allowanceDays = await screen.findByTestId("allowance-days-input");
    const numberOfAllowanceDays = await within(allowanceDays).findByRole(
      "spinbutton"
    );

    expect(numberOfAllowanceDays.getAttribute("min")).toBe(
      countryAllowanceRules.Ghana.min.toString()
    );
  });

  test("should render Brazil specific fields", async () => {
    act(() => {
      render(<UserRegistration />);
    });

    const countryOfWorkSelect = screen.getByLabelText("Country of work");

    act(() => {
      fireEvent.mouseDown(countryOfWorkSelect);
    });
    const option = screen.getByRole("option", { name: /^brazil/i });

    act(() => {
      fireEvent.click(option);
    });

    const workingHoursInput = await screen.findByTestId("working-hours-input");

    expect(workingHoursInput).toBeInTheDocument();

    const allowanceDays = await screen.findByTestId("allowance-days-input");
    const numberOfAllowanceDays = await within(allowanceDays).findByRole(
      "spinbutton"
    );
    expect(numberOfAllowanceDays.getAttribute("max")).toBe(
      countryAllowanceRules.Brazil.max.toString()
    );
    expect(numberOfAllowanceDays.getAttribute("min")).toBe(
      countryAllowanceRules.Brazil.min.toString()
    );
  });

  test("should not be able to input negative numbers in allowance days input", async () => {
    act(() => {
      render(<UserRegistration />);
    });

    const allowanceDaysInput: HTMLInputElement =
      screen.getByLabelText("Allowance days");
    act(() => {
      userEvent.type(allowanceDaysInput, "-123");
    });

    expect(allowanceDaysInput.value).toBe("");
    act(() => {
      userEvent.type(allowanceDaysInput, "-abcd*");
    });

    expect(allowanceDaysInput.value).toBe("");
    act(() => {
      userEvent.type(allowanceDaysInput, "123");
    });

    expect(allowanceDaysInput.value).toBe("123");
  });

  test("should not be able to input non-alphabetical characters in first name and last name input", async () => {
    act(() => {
      render(<UserRegistration />);
    });

    const firstNameInput: HTMLInputElement =
      screen.getByLabelText("First name");

    act(() => {
      userEvent.type(firstNameInput, "123");
    });

    const alert = await screen.findAllByRole("alert");

    console.log("alert", prettyDOM(alert[0]));
    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });
});
