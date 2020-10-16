import React, { useState, useEffect } from "react";
import loginImg from "../../login1.svg";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import "./style.scss";
import Cookies from "js-cookie"

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }

  const login = async (e) => {
    e.preventDefault()
    const data = {
      "email": email,
      "password": password,
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      const response = await res

      if (response) {
        // props.userTitle(response.data.title);
        // localStorage.setItem('accessToken', response.data.accessToken)
        // localStorage.setItem('refreshToken', response.data.refreshToken)
        props.userTitle(response.data);
        props.status(true);
        props.history.push('/dashboard');
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userInfo");
    console.log("loggedinUser => ", loggedInUser)
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("user is loggedIn")
      // setCurrentUser(foundUser)
    }
  }, []);

  // console.log(process.env.REACT_APP_API_URL)

  return (
    <div className="base-container">
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
              id="email"
              placeholder="email"
              value={email}
              onChange={getEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={getPassword}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={login}>
          Login
          </button>
      </div>
    </div>
  );
}

export default withRouter(Login)