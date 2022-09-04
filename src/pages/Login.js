import React, { lazy, Suspense, useLayoutEffect } from "react";
import "../css/Login.css";
import { loginInputs } from "../configuration/baseConfig";
const Header = lazy(() => import("../re-components/Header"));
const LoginCard = lazy(() => import("../re-components/LoginCard"));

const Login = () => {
  useLayoutEffect(() => {
    document.title = "Blue Green";
  }, []);
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
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
