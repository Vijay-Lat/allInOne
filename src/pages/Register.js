import React, { lazy, Suspense, useLayoutEffect } from "react";
import "../css/Login.css";
import { tabLinks } from "../configuration/baseConfig";
import useCreateAccountInput from "../configuration/useCreateAccountInput";
const Header = lazy(() => import("../re-components/Header"));
const LoginCard = lazy(() => import("../re-components/LoginCard"));
const Register = () => {
  const loginInputs = useCreateAccountInput();
  useLayoutEffect(() => {
    document.title = "Registration";
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="login">
        <div className="loginBox">
          <LoginCard
            title="Create an Account"
            loginInputs={loginInputs?.createAccountInputs}
            formSubmit={loginInputs?.formSubmitHandler}
            name="Sign up"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Register;
