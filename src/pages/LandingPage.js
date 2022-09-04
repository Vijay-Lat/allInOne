import React, { lazy } from "react";
import { Route, Routes } from "react-router";
import { tabLinks } from "../configuration/baseConfig";
import Login from "./Login";
import Register from "./Register";
const Header = lazy(() => import("../re-components/Header"));

const LandingPage = () => {
  return (
    <div>
      <Header title="Blue Green" tabLinks={tabLinks} />
      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default LandingPage;
