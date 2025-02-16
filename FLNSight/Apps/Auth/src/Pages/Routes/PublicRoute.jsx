// PublicRoute.js
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const PublicRoute = ({ redirectTo = "Dashboard" }) => {
//   const { isAuthenticated } = useSelector((state) => state.userDetails);
//   console.log("PUBLIC ROUTE++++++", isAuthenticated);

//   // If the user is authenticated, redirect to the protected page (e.g., Dashboard)
//   if (isAuthenticated) {
//     return <Navigate to={redirectTo} />;
//   }

//   // If the user is not authenticated, render the child routes (e.g., Login)
//   return <Outlet />;
// };

// export default PublicRoute;

// PublicRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userDetails);
  console.log("PUBLIC ROUTE++++++", isAuthenticated, user);

  // Define role-based redirection URLs
  const roleUrls = {
    admin: import.meta.env.VITE_USERS_URL || "/admin-dashboard", // Admin dashboard URL
    user: import.meta.env.VITE_SCHOOLS_URL || "/schools", // User school URL
  };

  // If the user is authenticated, redirect based on their role
  if (isAuthenticated) {
    const redirectUrl = roleUrls[user?.role] || "/not-authorized"; // Fallback for unknown roles
    return <Navigate to={redirectUrl} replace />;
  }

  // If the user is not authenticated, render the child routes (e.g., Login)
  return <Outlet />;
};

export default PublicRoute;
