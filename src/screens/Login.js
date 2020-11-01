import React from "react";
import { login, loginWithGoogle } from "../services/AuthService";
import UserAuth from "../layout/UserAuth";
import loginImg from '../assets/login.jpg'

const Login = () => {

  return (
    <UserAuth
      title="Let’s get back on track!"
      submitFn={login} customBg={loginImg}
      submitMsg="Log in"
      googleFn={loginWithGoogle}
      googleMsg="Log in with Google"
      optionMessage="Don't have an account?"
      optionLink="/register"
      optionLinkTitle="Register now"

    />
  );

};

export default Login;
