import { useParams } from "react-router-dom";
import Header from "../components/Header";
const Account = () => {
  // params is an object
  const params = useParams();
  return (
    <section>
      <Header title="My Account" />
      <p>{params.accountId}</p>
    </section>
  );
};

export default Account;
