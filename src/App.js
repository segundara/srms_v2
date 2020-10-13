import React, { useState } from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import NavBar from "./components/nav/NavBar";
import JumBotron from "./components/welcome/Welcome"
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from "./components/login/login"
import Logout from './components/logout';
import Dashboard from './components/Dashboard';

const App = () => {
  const [userTitle, setUserTitle] = useState('')
  const [isLoggedin, setIsLoggedin] = useState('')

  const setTitle = (title) => {
    setUserTitle(title)
  }

  const setStatus = (status) => {
    setIsLoggedin(status)
  }

  return (
    <Container fluid className="px-0">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={JumBotron} />
          <Route path="/login" exact render={(props) => (<Login {...props} userTitle={setTitle} status={setStatus} />)} />
          <Route exact
            render={(props) => isLoggedin
              ? (<Dashboard {...props} userTitle={userTitle} />)
              : (<Redirect to="/" />)
            }
          />
        </Switch>
        <Route path="/logout" exact render={(props) => (<Logout {...props} userTitle={setTitle} status={setStatus} />)} />
      </Router>
    </Container>
  );
}

export default App;
