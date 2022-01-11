// add nested route, can define routes where ever necessary
import { Route } from "react-router-dom";
import Header from "../components/Header";
const Welcome = () => {
  return (
    <section>
      <Header title="Welcome to News App" />
      {/* Will be evaluated if Welcome page is active */}
      <Route path="/welcome/new-user">Welcome, new user!</Route>
    </section>
  );
};

export default Welcome;
