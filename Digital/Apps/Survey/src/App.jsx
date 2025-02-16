import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import MFAAuthenticator from "./Pages/Authentication/MFAAuthenticator";
import Qr from "./Pages/Authentication/Qr";
import NotAuthorized from "./Pages/Authentication/NotAuthorized";
import Main from "./Pages/main";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedRoute from "./Pages/Routes/ProtectedRoute";
import PublicRoute from "./Pages/Routes/PublicRoute";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./redux/slices/fetchUserDetailsSlice";

import Error from "./Pages/admin_pages/Error";
import Admin from "./Pages/admin_pages/Admin";
import "./App.css";
import SurveyList from "./Pages/admin_pages/SurveysList";
import { ViewSurvey } from "./Pages/admin_pages/ViewSurvey";
import { EditSurvey } from "./Pages/admin_pages/Editsurvey";
import { AddSurvey } from "./Pages/admin_pages/Addsurvey";
import HomePage from "./Pages/admin_pages/HomePage";
function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  console.log(token);
  const { loading } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/survey" replace />} />
      <Route path="/:id" element={<HomePage />} />
      {/* Protected Routes */}
      <Route
      element={<ProtectedRoute allowedRoles={["admin", "user", "soumya"]} />}
      >
        <Route path="" element={<Admin />}>
          <Route path="survey" element={<SurveyList />} />
          <Route path="/add" element={<AddSurvey />} />
          <Route path="/edit/:id" element={<EditSurvey />} />
          <Route path="/view" element={<ViewSurvey />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin", "soumya"]} />}>
        <Route path="/" element={<Main />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* 404 Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
