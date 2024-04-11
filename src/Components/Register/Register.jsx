import React, { useState } from "react";
import axios from "axios";
import "./Register.scss";
import Joi from "joi";
import $ from "jquery";

import { useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
export const Register = () => {
  const navigate = useNavigate(); // Step 2: Initialize useNavigate
  const [responseOfReq, setResponseOfReq] = useState(null);
  const [errorRegistration, setErrorRegisteration] = useState(null);
  const [errorValidation, setErrorValidation] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);

  // Creating State as Object to Hold User Data
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
  });
  // Function TO Get Data From All Inputs
  const getDataFromInputs = (e) => {
    setErrorValidation([]);
    setErrorRegisteration(null);
    let currentInputId = e.target.id;
    let currentValue = e.target.value;
    let newUserData = { ...userData };
    newUserData[currentInputId] = currentValue;
    setUserData(newUserData);
    // console.log(newUserData);
  };
  const handleRequist = async () => {
    try {
      let myResponse = await axios.post(
        "http://react-ecommerce.activegroup-eg.com/api/register",
        userData
      );
      // setIsLoggedIn(true) ;  # this will rendere all component and will not execuse what is down
      $(".registerd")
        .fadeIn(1000)
        .fadeOut(1000, function () {
          setResponseOfReq(myResponse.data.message);
          navigate("/login", { replace: true });
        });
      console.log(responseOfReq);
    } catch (error) {
      setErrorRegisteration(error.message);
    }
    setLoadingButton(false);
  };
  // Post Requist To Data Base
  const handleSubmit = () => {
    setLoadingButton(true);
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(22).required(),
      email: Joi.string().required().min(7).max(44),
      // .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(/^[a-z0-9]{8,}$/i),
      c_password: Joi.string()
        .required()
        .pattern(/^[a-z0-9]{8,}$/i),
    });
    let resultOfValidation = schema.validate(userData, { abortEarly: false });
    resultOfValidation.error ? (
      <>
        {setErrorValidation(resultOfValidation)}
        {setLoadingButton(false)}
      </>
    ) : (
      <>
        {setErrorValidation([])}
        {handleRequist()}
      </>
    );
  };
  const specifiedError = (keyOfInputs) => {
    for (let i = 0; i < errorValidation?.error?.details?.length; i++) {
      let messageForEachInput = errorValidation?.error?.details[i]?.message;
      let keyOfInputsFromJoi = errorValidation?.error?.details[i]?.context?.key;
      if (keyOfInputsFromJoi === keyOfInputs) {
        return messageForEachInput;
      }
      console.log(
        "key From Joi ",
        keyOfInputsFromJoi,
        "and current key is ",
        keyOfInputs
      );
    }
    return "";
  };
  return (
    <div className="registerForm">
      <div className="inputs w-75 d-flex flex-column  ">
        <h1>Register Form</h1>
        <h1 className=" registerd text-success text-center mt-5">
          Registered Succesfully
        </h1>
        {errorRegistration !== null && (
          <p className="alert alert-danger">{errorRegistration}</p>
        )}
        <form className="mt-4">
          <label htmlFor="username">User_Name :</label>
          <input
            onChange={getDataFromInputs}
            id="username"
            className="w-100 form-control  myInput"
            type="text"
          />
          {/*  Error Form Joi Library */}
          <div className="mt-4 text-danger">{specifiedError("username")}</div>
          <label htmlFor="age">Age :</label>
          <input id="age" className="w-100 form-control  myInput" type="text" />
          <label htmlFor="email">Email :</label>
          <input
            onChange={getDataFromInputs}
            id="email"
            className="w-100 form-control  myInput"
            type="text"
          />
          {/*  Error Form Joi Library */}
          <div className="mt-4 text-danger">{specifiedError("email")}</div>
          <label htmlFor="password">Password :</label>
          <input
            onChange={getDataFromInputs}
            id="password"
            className="w-100 form-control  myInput"
            type="text"
          />
          {/*  Error Form Joi Library */}
          <div className="mt-4 text-danger">{specifiedError("password")}</div>
          <label htmlFor="c_password">Confirm Password :</label>
          <input
            onChange={getDataFromInputs}
            id="c_password"
            className="w-100 form-control  myInput"
            type="text"
          />
          {/*  Error Form Joi Library */}
          <div className="mt-4 text-danger">{specifiedError("c_password")}</div>
        </form>
        <button
          onClick={handleSubmit}
          className="btn btn-outline-info mt-4 ms-auto"
        >
          {loadingButton === false ? (
            "Register"
          ) : (
            <i className="fa-solid fa-spinner fa-2x text-white fa-spin"></i>
          )}
        </button>
      </div>
    </div>
  );
};
