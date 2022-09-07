import React, { Fragment } from "react";
import { Route, Routes } from "react-router";
import Header from "../re-components/Header";
import About from "./About";
import Home from "./Home";
const homeTabs = [
  { id: 0, name: "Home", path: "/home-page/home" },
  { id: 0, name: "About", path: "/home-page/about" },
  { id: 0, name: "Contact-us", path: "/home-page/contact" },
];
const HomePage = () => {
  return (
    <Fragment>
      {/* <Header tabLinks={homeTabs} /> */}
      <Routes>
        <Route exact path="home" element={<Home />} />
        <Route exact path="about" element={<About />} />
      </Routes>
    </Fragment>
  );
};

export default HomePage;
