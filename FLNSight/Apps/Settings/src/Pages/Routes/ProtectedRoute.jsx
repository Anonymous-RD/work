import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.userDetails);
  const authURL ="https://auth-fln.apie.in";

  if (!isAuthenticated || !user) {
    // Redirect to an external authentication URL
    window.location.href = authURL;
    return null; // Prevent rendering anything before redirection
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect internally to "not authorized" page
    return <Navigate to="/not-authorized" replace />;
  }

  // Render child routes if authentication and role checks pass
  return <Outlet />;
};

export default ProtectedRoute;
