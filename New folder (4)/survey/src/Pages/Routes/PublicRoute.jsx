// PublicRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ redirectTo = "/dashboard" }) => {
  const { isAuthenticated } = useSelector((state) => state.userDetails);
  console.log("PUBLIC ROUTE++++++", isAuthenticated);

  // If the user is authenticated, redirect to the protected page (e.g., Dashboard)
  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // If the user is not authenticated, render the child routes (e.g., Login)
  return <Outlet />;
};

export default PublicRoute;
