import React from "react";
import { register } from "../services/AuthService";
import UserAuth from "../layout/UserAuth";

const Register = () => {

  return (
    <UserAuth
      title="Create an account"
      submitFn={register}
      submitMsg="Sign up"
      googleFn={""}
      googleMsg="Sign up with Google"
      optionMessage="Already have an account?"
      optionLink="/login"
      optionLinkTitle={'Sign in'}
    />
  );
};

export default Register;
