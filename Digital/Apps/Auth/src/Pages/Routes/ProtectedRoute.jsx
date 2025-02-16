// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const authurl = import.meta.env.VITE_AUTH_URL;
const awptrackerurl = import.meta.env.VITE_TRACKER_URL;
const usersurl = import.meta.env.VITE_USERS_URL;
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated,user } = useSelector((state) => state.userDetails);

  console.log(isAuthenticated,user);
  return !isAuthenticated ? (
    <Navigate to="/login" />
  ) : allowedRoles && !allowedRoles.includes(user?.role) ? (
    <Navigate to="/not-authorized" />
  ) : (
    window.location.href =usersurl
  )
  
};

export default ProtectedRoute;
