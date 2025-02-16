import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Authentication/Login";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import MFAAuthenticator from "./Pages/Authentication/MFAAuthenticator";
import Invitation from "./Pages/Authentication/Invitation";
import Qr from "./Pages/Authentication/Qr";
import Admin from "./Pages/admin_pages/Admin";
import HomePage from "./Pages/admin_pages/HomePage";
import Users from "./Pages/admin_pages/Users";
import Error from "./Pages/admin_pages/Error";
import Dashboard from "./Pages/admin_pages/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/MFA" element={<MFAAuthenticator />} />
        <Route path="/invitation" element={<Invitation />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="*" element={<Error />} />

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
      </Routes>
    </div>
  );
}

export default App;
