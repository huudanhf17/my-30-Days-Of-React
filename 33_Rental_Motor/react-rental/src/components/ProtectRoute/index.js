import React from "react";
import { Redirect, Route } from "react-router";

function ProtectRoute({ isAuth: isAuth, component: Component, ...rest }) {
  function checkNull() {
    return (
      <Route
        render={(props) => {
          if (isAuth === null) {
            checkNull();
          } else if (isAuth === true) {
            return <Component {...props} {...rest} />;
          } else if (isAuth === 1) {
            return <Redirect to="/" />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/signin", state: { from: props.location } }}
              />
            );
          }
        }}
      ></Route>
    );
  }

  return checkNull();
}

export default ProtectRoute;
