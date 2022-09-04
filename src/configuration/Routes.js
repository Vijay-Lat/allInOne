import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const routes = [
    {
      path: "/blue-green/*",
      component: LandingPage,
      id:0,
    },
    {
      path: "/home-page/*",
      component: HomePage,
      id:1,
    },
    // {
    //   path: "/register",
    //   component: Register,
    //   id:1,
    // }
  ];