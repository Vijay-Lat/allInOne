import { Fragment } from "react";
import { Route, Routes ,Redirect, Navigate} from "react-router-dom";
import { routes } from "./configuration/Routes";
function App() {
  return (
    <Fragment>
      <Routes>
        {routes.map((route) => (
          <Route
            exact
            element={<route.component />}
            path={route?.path}
            key={route?.id}
          />
        ))}
        {/* <Route exact path = "/" element={<Navigate to="/blue-green/login"/>}/> */}
      </Routes>
    </Fragment>
  );
}

export default App;
