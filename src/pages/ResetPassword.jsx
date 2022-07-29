import React from "react";

import Header from "../components/misc/Header";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Header title="Reset your password" />
      <ResetPasswordForm />
    </React.Fragment>
  );
};

export default ResetPassword;
