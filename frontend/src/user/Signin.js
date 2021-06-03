import React, { useState } from "react";
import Base from "../core/Base";

import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
const Signin = () => {
  const [values, setValues] = useState({
    email: "welcome@toMywebsite.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => {
        return console.log("signin failed", err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="bg-custom-shade2 p-2 rounded-md mb-4 sm:offset-2 md:offset-3 lg:offset-4 xl:offset-4 sm:col-8 md:col-6 lg:col-5 xl:col-4">
            <h1 className="text-lg text-center"> Loading </h1>
          </div>
        </div>
      )
    );
  };

  const closeAlert = (e) => {
    e.target.parentElement.style.display = "none";
  }

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="sm:offset-2 md:offset-3 lg:offset-4 xl:offset-4 sm:col-8 md:col-6 lg:col-5 xl:col-4">
          <div
            className="bg-custom-shade2 p-2 rounded-md mb-4 flex justify-between"
            style={{ display: error ? "" : "none" }}
          >
            {error}
            <span className="cursor-pointer" onClick={(closeAlert)}>X</span>
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="xs:flex xs:flex-col xs:items-center container font-custom2">
        <div className="xs:flex xs:flex-col row">
          <div className="layout1">
            <label htmlFor="mail" className="pt-1 pb-1">EMAIL ID : </label>
          </div>
          <div className="layout2">
            <input
              onChange={handleChange("email")}
              type="email"
              value={email}
              id="mail"
              className="input"
              />
          </div>
        </div>
        <div className="xs:flex xs:flex-col row mt-4">
          <div className="layout1">
            <label htmlFor="pwd" className="pt-1 pb-1">PASSWORD : </label>
          </div>
          <div className="layout2">
            <input
              onChange={handleChange("password")}
              type="password"
              value={password}
              id="pwd"
              className="input"
              />
          </div>
        </div>
        <div className="row mt-4">
          <div className="sm:offset-5">
            <button onClick={onSubmit} className="btn">
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="SIGN IN">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
