import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ allowedRole }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token')
  return isLoggedIn ? (
    <Navigate to="/dasboard" replace />

  ) : (
    <Outlet />
  );
}

ProtectedRoute.propTypes = {
  allowedRole: PropTypes.string,
};

export default ProtectedRoute;