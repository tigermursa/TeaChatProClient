/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const accessToken = Cookies.get("access_token");

  // Check if either user._id exists in localStorage or access_token exists in cookies
  const isAuthenticated = user._id || accessToken;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
