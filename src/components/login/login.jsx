import React, { useState } from "react";
import loginImg from "../../login1.svg";
import { withRouter } from "react-router-dom";
import "./style.scss";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import { login } from "../../actions/auth";
import { Spinner } from "react-bootstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failure, setFailure] = useState(false);

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email && password) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/dashboard");
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="base-container">
      {loading && (
        <div
          style={{
            width: "10%",
            height: "auto",
            margin: "auto",
          }}
        >
          <Spinner animation="border" variant="dark" />
        </div>
      )}
      {!loading && (
        <>
          <div className="content">
            <div className="image">
              <img src={loginImg} alt="" />
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
            <button type="button" className="btn" onClick={handleLogin}>
              Login
        </button>
          </div>
        </>
      )}

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {/* {message} */}
            <strong>Email and password do not match!</strong>
          </div>
        </div>
      )}
      {/* <Alert variant="danger" show={failure} className="mt-3">
        <strong>Please check your email or password!</strong>
      </Alert> */}
    </div>
  );

};

export default withRouter(Login);
