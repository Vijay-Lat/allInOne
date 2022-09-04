import React, { lazy, Suspense, useLayoutEffect } from "react";
import "../css/Login.css";
import { loginInputs } from "../configuration/baseConfig";
import { useNavigate } from "react-router";
const Header = lazy(() => import("../re-components/Header"));
const LoginCard = lazy(() => import("../re-components/LoginCard"));

const Login = () => {
  const navigate =useNavigate()
  useLayoutEffect(() => {
    document.title = "Blue Green";
  }, []);

  const goToHomePageHandler = (e)=>{
e.preventDefault()
navigate("/home-page/home")

  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="login">
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <LoginCard
            title="Blue Green Labs"
            loginInputs={loginInputs}
            name="Login"
            formSubmit={goToHomePageHandler}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
