import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { motion } from 'framer-motion';

import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const closeAlert = (e) => {
    e.target.parentElement.style.display = "none";
  }

  const SuccessMessage = () => {
    return (
      <motion.div layout className="row">
        <div className="sm:offset-2 md:offset-3 lg:offset-4 xl:offset-4 sm:col-8 md:col-6 lg:col-5 xl:col-4">
          <div
            className="bg-custom-shade2 p-2 rounded-md flex justify-between mb-4"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully.
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </motion.div>
    );
  };
  const errorMessage = () => {
    return (
      <motion.div layout className="row">
        <div className="sm:offset-2 md:offset-3 lg:offset-4 xl:offset-4 sm:col-8 md:col-6 lg:col-5 xl:col-4">
          <div
            className="bg-custom-shade2 p-2 rounded-md flex justify-between mb-4"
            style={{ display: error ? "" : "none" }}
          >
            {error}
            <span className="cursor-pointer" onClick={(closeAlert)}>X</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="xs:flex xs:flex-col xs:items-center container font-custom2">
        <div className="xs:flex xs:flex-col row">
          <div className="layout1">
            <label htmlFor="name" className="pt-1 pb-1">NAME : </label>
          </div>
          <div className="layout2">
            <input
              type="text"
              id="name"
              className="input"
              value={name}
              onChange={handleChange("name")}
              />
          </div>
        </div>
        <div className="xs:flex xs:flex-col row mt-4"> 
          <div className="layout1">
            <label htmlFor="mail" className="pt-1 pb-1">EMAIL ID : </label>
          </div>
          <div className="layout2">
            <input
              type="email"
              id="mail"
              className="input"
              value={email}
              onChange={handleChange("email")}
              />
          </div>
        </div>
        <div className="xs:flex xs:flex-col row mt-4"> 
          <div className="layout1">
            <label htmlFor="pwd" className="pt-1 pb-1">PASSWORD : </label>
          </div>
          <div className="layout2">
            <input
              type="password"
              id="pwd"
              className="input"
              value={password}
              onChange={handleChange("password")}
              />
          </div>
        </div>
        <div className="row mt-4">
          <div className="sm:offset-5">
            <button onClick={onSubmit} className="btn">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="SIGN UP">
      {SuccessMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
