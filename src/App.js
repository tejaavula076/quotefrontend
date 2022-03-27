import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import Create from "./components/Create";
import Edit from "./components/Edit";
// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  document.title = "Quote Maker";
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div
        id="app"
        className={
          !isAuthenticated
            ? "background-image d-flex flex-column h-100"
            : "d-flex flex-column h-100"
        }
      >
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            {/*<Route path="/external-api" component={ExternalApi} /> */}
            <Route path="/create" exact component={Create} />
            <Route path="/edit/:id" exact component={Edit} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
