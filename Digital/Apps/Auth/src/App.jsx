import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import MFAAuthenticator from "./Pages/Authentication/MFAAuthenticator";
import Qr from "./Pages/Authentication/Qr";
import NotAuthorized from "./Pages/Authentication/NotAuthorized";
import PageNotFound from "./Pages/PageNotFound";
import PublicRoute from "./Pages/Routes/PublicRoute";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./redux/slices/fetchUserDetailsSlice";
import "./App.css";
import PasswordReset from "./Pages/Authentication/PasswordReset";

function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  const usersurl = import.meta.env.VITE_USERS_URL; // URL for authenticated users (e.g., "http://localhost:3001");
  const blogsurl = import.meta.env.VITE_BLOGS_URL; // URL for authenticated users (e.g., "http://localhost:3001");
 
  const { loading, isAuthenticated, user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  // Role-based URLs
  const roleUrls = {
    admin: usersurl,  // User Dashboard
    user: blogsurl, // Blog Dashboard
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(token));
    }
  }, [token, dispatch]);



  // Redirect logic for authenticated users
  if (isAuthenticated) {
    const redirectUrl = roleUrls[user?.role] || "/not-authorized";
    window.location.href = redirectUrl;
    return null; // Prevent rendering
  }

  return (
    <Routes>
      {/* Redirect root to /login if not authenticated */}
      <Route path="/" element={<Navigate to="/login" replace={true} />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<MFAAuthenticator />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Route>

      {/* Not Authorized Route */}
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* 404 Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
