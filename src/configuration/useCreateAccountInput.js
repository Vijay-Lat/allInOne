import React, { useState } from "react";
import useInput from "../custom-hooks/useInput";

const useCreateAccountInput = () => {
  const [disableButton, setDisableButton] = useState(false);
  // validating the user input
  // const validateName = () => {

  // };
  const validateEmail = () => {
    if (emailValue.trim() == "") setEmailError("Email is required");
    if(!(emailValue.includes("@")))setEmailError("Email is not valid");
  };
  const validatePassword = () => {
    if (passwordValue.trim() == "") setPasswordError("Email is required");
    if (passwordValue.length < 8) setPasswordError("Password must be at least 8 characters");
  };
  // receiving the user input and setting the state
  const {
    value: nameValue,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler,
    hasError: nameError,
    reset: nameReset,
    setError: setNameError,
  } = useInput();
  const {
    value: emailValue,
    onChange: emailChangeHandler,
    onBlur: emailBlurHandler,
    hasError: emailError,
  reset: emailReset,
    setError: setEmailError,
  } = useInput();
  const {
    value: passwordValue,
    onChange: passwordChangeHandler,
    onBlur: passwordBlurHandler,
    hasError: passwordError,
    reset: passwordReset,
    setError: setPasswordError,
  } = useInput(validatePassword);
  // form submit handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (nameValue.trim() == "") {
      setNameError("Name is required");
      return false;
    }
    if (emailValue.trim() == "")
     setEmailError("Email is required");
    if (!emailValue.includes("@")) setEmailError("Email is not valid");
    if (passwordValue.trim() == "") setPasswordError("Email is required");
    if (passwordValue.length < 8){
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      nameValue &&
      emailValue &&
      passwordValue
    ) {
      console.log("Form submitted", nameValue, emailValue, passwordValue);
      nameReset();
      emailReset();
      passwordReset();
    }
  };
  // returning the state
  const createAccountInputs = [
    {
      id: "name",
      type: "text",
      name: "Username",
      onChange: nameChangeHandler,
      value: nameValue,
      onBlur: nameBlurHandler,
      placeholder: "Enter your name",
      error: nameError,
      reset: nameReset,
    },
    {
      id: "email",
      type: "email",
      name: "Email",
      onChange: emailChangeHandler,
      value: emailValue,
      onBlur: emailBlurHandler,
      placeholder: "Enter your email",
      error: emailError,
      reset: emailReset,
    },
    {
      id: "password",
      type: "password",
      name: "Password",
      onChange: passwordChangeHandler,
      value: passwordValue,
      onBlur: passwordBlurHandler,
      placeholder: "Enter your password",
      error: passwordError,
      reset: passwordReset,
    },
  ];
  return { createAccountInputs, formSubmitHandler };
};

export default useCreateAccountInput;
