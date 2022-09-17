import { FunctionComponent } from "react";
import NavBar from "../NavBar/NavBar";
import UserRegistrationForm from "./UserRegistrationForm";

interface UserRegistrationProps {}

const UserRegistration: FunctionComponent<UserRegistrationProps> = () => {
  return (
    <>
      <NavBar />
      <div id="user-registration-form">
        <UserRegistrationForm />
      </div>
    </>
  );
};

export default UserRegistration;
