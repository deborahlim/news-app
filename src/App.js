import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import Welcome from "./pages/Welcome";
import Explore from "./pages/Explore";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <div className="App">
      <MyNavbar />
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
          <Route path="/" exact>
            <Redirect to="/welcome"></Redirect>
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/my-account/:accountId">
            <Account />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/FAQ">
            <FAQ />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
