import React, { lazy, Suspense } from "react";
import CommonInput from "./CommonInput";
import { Card } from "@mui/material";
import "../css/Login.css";
const Button = lazy(() => import("./Button"));

const LoginCard = (props) => {
  const { loginInputs, formSubmit } = props;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Card className="loginCard">
          <h3 className="loginTitle">{props.title}</h3>
          <form className="loginForm" onSubmit={formSubmit}>
            {loginInputs.map((input, index) => (
              <CommonInput
                className="inputStyle"
                key={index}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                error={input.error}
                reset={input.reset}
                value={input.value}
                onChange={input.onChange}
                onBlur={input.onBlur}
              />
            ))}

            <Button
              className="loginButton"
              //   disabled={disableEnter}
              color="primary"
              variant="contained"
              name={props.name}
              type="submit"
            />
          </form>
        </Card>
      </div>
    </Suspense>
  );
};

export default LoginCard;
