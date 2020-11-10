import React, {useContext} from "react";
import {loginWithGoogle} from "../services/AuthService";
import UserAuth from "../layout/UserAuth";
import loginImg from '../assets/login.jpg'
import AppContext from '../context/app/AppContext'

const Login = () => {
  const appContext = useContext(AppContext)
  const {loginUser} = appContext
  return (
    <UserAuth
      title="Let’s get back on track!"
      submitFn={loginUser} customBg={loginImg}
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
