import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, islogged, ...rest }) => {
  const callComponent = props => {
    if (islogged) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  return <Route {...rest} render={callComponent} />;
};

export default PrivateRoute;
