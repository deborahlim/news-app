import React from "react";

import Header from "../components/misc/Header";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {

  return (
    <React.Fragment>
      <Header title="Log In" />
      <LoginForm />
    </React.Fragment>
  );
};

export default Login;
