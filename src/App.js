import React from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import NavBar from "./components/nav/NavBar";
import WelcomePage from "./components/welcome/Welcome"
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from "./components/login/login"
import Logout from './components/logout';
import Dashboard from './components/Dashboard';

const App = () => {

  return (
    <Container fluid className="px-0">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/login" exact component={Login} />

          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
        <Route path="/logout" exact component={Logout} />
      </Router>
    </Container>
  );
}

export default App;
