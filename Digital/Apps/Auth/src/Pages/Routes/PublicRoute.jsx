import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const usersurl = import.meta.env.VITE_USERS_URL; // URL for authenticated users (e.g., "http://localhost:3001");
  const blogsurl = import.meta.env.VITE_BLOGS_URL; // URL for authenticated users (e.g., "http://localhost:3001");
 
  const { isAuthenticated, user } = useSelector((state) => state.userDetails);

 // Role-based URLs
 const roleUrls = {
  admin: usersurl,  // User Dashboard
  user: blogsurl, // Blog Dashboard
};

  if (isAuthenticated) {
    const redirectUrl = roleUrls[user?.role] || "/not-authorized";
    window.location.href = redirectUrl;
    return null; // Prevent rendering
  }

  return <Outlet />;
};

export default PublicRoute;
