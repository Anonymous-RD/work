import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import MFAAuthenticator from "./Pages/Authentication/MFAAuthenticator";
import Invitation from "./Pages/Authentication/Invitation";
import Qr from "./Pages/Authentication/Qr";
// import Admin from "./components/layouts/Admin";
import NotAuthorized from "./Pages/Authentication/NotAuthorized";
// import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/main";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedRoute from "./Pages/Routes/ProtectedRoute";
import PublicRoute from "./Pages/Routes/PublicRoute";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./redux/slices/fetchUserDetailsSlice";
import Users from "./Pages/admin_pages/Users";
import Error from "./Pages/admin_pages/Error";
import Admin from "./Pages/admin_pages/Admin";
import Dashboard from "./Pages/admin_pages/Dashboard";
function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  const { loading } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute redirectTo="/dashboard" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<MFAAuthenticator />} />
        <Route path="/qr" element={<Qr />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={<ProtectedRoute allowedRoles={["admin", "user", "soumya"]} />}
      >
        <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin", "soumya"]} />}>
        <Route path="/" element={<Main />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Dashboard  */}
      <Route path="/admin" element={<Admin />}>
        {/* <Route index element={<HomePage />}></Route> */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="*" element={<Error />} />
        {/* <Route index element={<HomePage />} /> */}
        {/* <Route path="projects" element={<ProjectsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="e-learning" element={<ELearningPage />} />
          <Route path="study-data" element={<StudyDataPage />} />
          <Route path="study-reports" element={<StudyReportsPage />} />
          <Route path="forms" element={<FormsPage />} /> */}
        {/* <Route path="users" element={<UsersPage />} /> */}
        {/* <Route path="roles" element={<RolesPage />} /> */}
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
