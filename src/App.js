import React from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import JumBotron from "./components/Welcome"
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from "./components/login/login"
import Logout from './components/logout';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  state = {
    userTitle: null,
    isLoggedin: false
  }

  setTitle = (title) => {
    this.setState({ userTitle: title })
  }

  setStatus = (status) => {
    this.setState({ isLoggedin: status })
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={JumBotron} />
            <Route path="/login" exact render={(props) => (<Login {...props} userTitle={this.setTitle} status={this.setStatus} />)} />
            <Route exact
              render={(props) => this.state.isLoggedin && !this.state.isLoggedout
                ? (<Dashboard {...props} userTitle={this.state.userTitle} />)
                : (<Redirect to="/" />)
              }
            />
          </Switch>
          <Route path="/logout" exact render={(props) => (<Logout {...props} userTitle={this.setTitle} status={this.setStatus} />)} />
        </Router>
      </Container>
    );
  }
}

export default App;
