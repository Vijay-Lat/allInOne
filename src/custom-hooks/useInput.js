import React, { useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("")
  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
    setIsTouched(true);
    setError("");
  };
  const inputBlurHandler = () => {
    // uncomment this code to throw helper text on blur
    //   const valueIsValid = validate();
    // setError(valueIsValid)
    setIsTouched(true);
  };
  const reset = () => {
    // reset the input
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    onChange: inputChangeHandler,
    onBlur: inputBlurHandler,
    hasError:error,
    setError,
    reset,
  };
};
export default useInput;
