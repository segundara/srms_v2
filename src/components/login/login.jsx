import React from "react";
import loginImg from "../../login1.svg";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import "./style.scss";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    successMessage: null,
    userTitle: null,
    isLoggedin: false
  }

  redirectToHome = () => {
    // props.updateTitle('Home')
    this.props.userTitle(this.state.userTitle)
    this.props.status(this.state.isLoggedin)
    this.props.history.push('/home');
  }

  login = async () => {
    try {
      const res = await axios(`${process.env.REACT_APP_API_URL}/users/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          email: this.state.email,
          password: this.state.password,
        },
        withCredentials: true,
      })

      const response = await res

      if (response) {
        console.log(response)
        this.setState(prevState => ({
          ...prevState,
          'successMessage': 'Login successful. Redirecting to home page..',
          'userTitle': response.data,
          'isLoggedin': true
        }))
        this.redirectToHome();
        // props.showError(null)
      }

    } catch (error) {
      console.log(error)
    }

  }

  render() {
    // console.log(this.state)
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={(e) => this.setState({ email: e.currentTarget.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => this.setState({ password: e.currentTarget.value })}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.login}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login)