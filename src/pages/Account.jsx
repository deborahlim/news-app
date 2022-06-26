import { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import UpdateDetailsForm from "../components/account/UpdateDetailsForm";
import UpdatePasswordForm from "../components/account/UpdatePasswordForm";
import UpdateNewsSettingsForm from "../components/account/UpdateNewsSettingsForm";
import DeleteAccountForm from "../components/account/DeleteAccountForm";
import Header from "../components/misc/Header";

import {
  userSelector,
  getCurrUser,
  clearState,
} from "../redux/userSlice";

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isError,
    isFetching,
    errorMessage,
    token,
  } = useSelector(userSelector);


  useEffect(() => {
    if (token) {
      dispatch(getCurrUser(token));
    } else {
      history.push("/");
    }
  }, [history, dispatch, token]);

  let content;
  if (isError) {
    toast.error(errorMessage);
    dispatch(clearState());
    history.push("/");
  }
  if (isFetching) {
    content = <Spinner size="lg" animation="grow" />;
  } else {
    content = (
      <Card className="m-2 m-md-5 p-3 account-card">
        <Card.Body className="text-start">
          <UpdateDetailsForm />
          <hr />
          <UpdateNewsSettingsForm />
          <hr />
          <UpdatePasswordForm />
          <hr />
          <DeleteAccountForm />
        </Card.Body>
      </Card>
    );
  }

  return (
    <section>
      <Header title="My Account" />
      {content}
    </section>
  );
};

export default Account;
