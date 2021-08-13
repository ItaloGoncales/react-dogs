import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  let { login } = React.useContext(UserContext);

  return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
