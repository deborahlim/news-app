import { Row, Col, Form, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteCurrUser, userSelector, clearState } from "../../redux/userSlice";
import MyModal from "../../components/misc/MyModal";
import { useHistory } from "react-router-dom";

const DeleteAccountForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { errorMessage, token } = useSelector(userSelector);
  const deleteAccountFormHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(deleteCurrUser(token));
      history.push("/");
      toast.success("You have been logged out");
    } catch (err) {
      toast.error(errorMessage);
      history.push("/");
    } finally {
      dispatch(clearState());
    }
  };

  return (
    <Form className="my-3" onSubmit={deleteAccountFormHandler}>
      <Row>
        <Col>
          <Card.Title className="my-3">Delete Account</Card.Title>
          <p>
            You will lose access to your account once your deletion request has
            been submitted.
          </p>
          <MyModal
            header="Confirm Delete?"
            message="Once this request has been submitted, you will not be able to create an account using this email address again."
            handleSubmit={deleteAccountFormHandler}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default DeleteAccountForm;
