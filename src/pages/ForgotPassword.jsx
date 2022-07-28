import React from "react";

import Header from "../components/misc/Header";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <React.Fragment>
      <Header title="Reset your password" />
      <p className="lead mb-5">We'll email you instructions to reset your password</p>
      <ForgotPasswordForm />

    </React.Fragment>
  );
};

export default ForgotPassword;
