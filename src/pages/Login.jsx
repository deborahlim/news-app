import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <React.Fragment>
      <Header title="Log In" />
      <LoginForm />
    </React.Fragment>
  );
};

export default Login;
