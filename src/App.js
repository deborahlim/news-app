import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
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
          <Route path="/" exact>
            <Redirect to="/breaking-news"></Redirect>
          </Route>
          <Route path="/breaking-news">
            <News endpoint="top-headlines" topic="breaking-news" />
          </Route>
          <Route path="/world">
            <News endpoint="top-headlines" topic="world" />
          </Route>
          <Route path="/business">
            <News endpoint="top-headlines" topic="business" />
          </Route>
          <Route path="/tech">
            <News endpoint="top-headlines" topic="tech" />
          </Route>
          <Route path="/entertainment">
            <News endpoint="top-headlines" topic="entertainment" />
          </Route>
          <Route path="/science">
            <News endpoint="top-headlines" topic="science" />
          </Route>
          <Route path="/health">
            <News endpoint="top-headlines" topic="health" />
          </Route>
          <Route path="/sports">
            <News endpoint="top-headlines" topic="sports" />
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
        </Switch>
      </main>
    </div>
  );
}

export default App;
