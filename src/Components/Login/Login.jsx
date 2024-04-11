import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import Joi from "joi";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
export const Login = ({ getUserToken, logedInUser }) => {
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);
  const [errorValidation, setErrorValidation] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loadingButton, setLoadingButton] = useState(false);
  const getUserData = (e) => {
    setErrorValidation([]);
    setErrorResponse(null);
    let currentInputId = e.target.id;
    let currentInputValue = e.target.value;
    let newUserData = { ...userData };
    newUserData[currentInputId] = currentInputValue;
    setUserData(newUserData);
    console.log(newUserData);
  };
  const handleRequist = async () => {
    try {
      let myResposne = await axios.post(
        "http://react-ecommerce.activegroup-eg.com/api/login",
        userData
      );
      
      $(".try")
        .fadeIn(1500)
        .fadeOut(1500, function () {
          let userToken = myResposne.data.data.accessToken;
          navigate("/home");
          localStorage.setItem("userToke", userToken);
          console.log(logedInUser);
          getUserToken();
        });
    } catch (error) {
      setErrorResponse(error.message);
    }
    setLoadingButton(false);
  };
  const handleSubmit = () => {
    setLoadingButton(true);
    let schema = Joi.object({
      email: Joi.string()
        // .email({ tlds: { allow: ["com", "net"] } })
        .min(8)
        .max(33)
        .required(),
      password: Joi.string()
        .required()
        .alphanum()
        .pattern(/^[a-z0-9]{8,}$/i),
    });
    let resultOfValidation = schema.validate(userData, { abortEarly: false });
    resultOfValidation.error ? (
      <>
        {setErrorValidation(resultOfValidation?.error?.details)}
        {setLoadingButton(false)}
      </>
    ) : (
      <>
        {handleRequist()}
        {setErrorValidation([])}
        {}
      </>
    );
  };
  const specifiedError = (key) => {
    if (errorValidation !== null) {
      for (let i = 0; i < errorValidation.length; i++) {
        const errorMessage = errorValidation[i].message;
        const keyFromJoi = errorValidation[i].context.key;
        if (keyFromJoi === key) {
          return errorMessage;
        }
      }
      return "";
    }
  };
  return (
    <div>
      <h1 className=" try text-center  text-success">LoggedIn Succesfully </h1>
      <div className="myLoginForm w-75 mt-5 m-auto">
        <h1 className="mb-5">Login Form</h1>
        {errorResponse !== null && (
          <p className="alert alert-danger">{errorResponse}</p>
        )}
        <form className="d-flex flex-column" action="">
          <label htmlFor="email">Email :</label>
          <input
            onChange={getUserData}
            className="form-control  m-auto mb-4"
            id="email"
            type="email"
          />
          <div className=" mb-5 text-danger">{specifiedError("email")}</div>
          <label htmlFor="password">Password :</label>
          <input
            onChange={getUserData}
            className="form-control  m-auto"
            id="password"
            type="password"
          />
          <div className="mt-4 text-danger">{specifiedError("password")}</div>
        </form>
        <div>
          <button
            onClick={handleSubmit}
            className="btn btn-outline-info ms-auto  mt-4 "
          >
            {loadingButton === false ? (
              "Register"
            ) : (
              <i className="fa-solid fa-spinner fa-2x text-white fa-spin"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
