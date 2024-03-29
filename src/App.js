import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/nav/Navbar";
import News from "./pages/News";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleAuth from "./components/auth/GoogleAuth";
import SavedTopics from "./pages/SavedTopics";
import Videos from "./pages/Videos";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={2000} />
        <GoogleAuth />
        <Navbar />
        {/* Registering routes with react router:  
      react router evaluates the URL and renders the correct components based on that URL. 
      e.g. react Welcome component is only display if the URL path is /welcome
      these components are "special" as they are loaded through the router
      */}
        <main>
          {/* Switch ensures only one of the routes will be
        active at the same time and it will be the route
        that is matched first top to bottom*/}
          <Switch>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/my-account">
              <Account />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/reset-password/:resetToken">
              <ResetPassword />
            </Route>
            <Route path={`/saved-topics`}>
              <SavedTopics />
            </Route>
            <Route path="/youtube/search">
              <Videos />
            </Route>
            <Route path="/">
              <Redirect to="/news" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
