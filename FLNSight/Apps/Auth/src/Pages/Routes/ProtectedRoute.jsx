// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated,user } = useSelector((state) => state.userDetails);

  console.log(isAuthenticated,user);
  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : allowedRoles && !allowedRoles.includes(user?.role) ? (
    <Navigate to="/not-authorized" />
  ) : (
    <Outlet />
  )
  
  // if (!isAuthenticated) {
  //   // If not authenticated, redirect to login
  //   return <Navigate to="/login" />;
  // }
 
  // if (allowedRoles && !allowedRoles.includes(user?.role)) {
  //   // If the role doesn't match, redirect to not authorized
  //   return <Navigate to="/not-authorized" />;
  // }

  // // If authenticated and role matches, render the child routes
  // return <Outlet />;
};

export default ProtectedRoute;
