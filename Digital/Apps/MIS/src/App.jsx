import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Pages/admin_pages/Admin";
import InviteForm from "./Pages/admin_pages/InviteForm";
import EditForm from "./Pages/admin_pages/EditForm";
import Users from "./Pages/admin_pages/Users";
import Main from "./Pages/main";
import Login from "./Pages/Authentication/Login";
import NotAuthorized from "./Pages/Authentication/NotAuthorized";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedRoute from "./Pages/Routes/ProtectedRoute";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./redux/slices/fetchUserDetailsSlice";
import Mis from "./Pages/admin_pages/Mis";
import Project_Mis1 from "./Pages/User_pages/Project_Mis";
import Project_Mis2 from "./Pages/User_pages/Project_Mis1";

function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.userDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(token));
    }
  }, [token, dispatch]);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/users" replace />} />

      {/* Protected Routes */}
      <Route
        element={<ProtectedRoute allowedRoles={["admin", "user", "soumya"]} />}
      >
        <Route element={<Admin />}>
          <Route path="users" element={<Users />} />
          <Route path="project-mis" element={<Mis />} />
          <Route path="project-mis1" element={<Project_Mis1 />} />
          <Route path="project-mis2" element={<Project_Mis2 />} />

          <Route path="invite" element={<InviteForm />} />
          <Route path="edit" element={<EditForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>

      {/* Redirects for other roles */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "soumya"]} />}>
        <Route path="/admin" element={<Main />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

      {/* Not Authorized */}
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* 404 Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
