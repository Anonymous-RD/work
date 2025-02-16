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
// import Users from "./Pages/admin_pages/Users";
import Error from "./Pages/admin_pages/Error";
import Admin from "./Pages/admin_pages/Admin";
// import Dashboard from "./Pages/admin_pages/Dashboard";
import "./App.css";
// import LOutcome from "./Pages/admin_pages/LOutcome";
import AssessmentQuestions from "./Pages/admin_pages/Administrative";
// import AddAssessmentQuestion from "./Pages/admin_pages/AddAssessmentQuestion";
// import EditAssessmentQuestion from "./Pages/admin_pages/EditAssessmentQuestion";
// import AddLearnerOutcome from "./Pages/admin_pages/AddLearnerOutcome";
// import EditLearnerOutcome from "./Pages/admin_pages/EditLearnerOutcome";
import Administrative from "./Pages/admin_pages/Administrative";
import District from "./Pages/admin_pages/Districts";
import Blocks from "./Pages/admin_pages/Blocks";
import AddDistrict from "./Pages/admin_pages/AddDistrict";
import AddBlock from "./Pages/admin_pages/AddBlock";
import Academic from "./Pages/admin_pages/Academic";
import Classes from "./Pages/admin_pages/Classes";
import Subjects from "./Pages/admin_pages/Subjects";
import Chapters from "./Pages/admin_pages/Chapters";
import AddClass from "./Pages/admin_pages/addClass";
import AddSubject from "./Pages/admin_pages/AddSubject";
import AddChapter from "./Pages/admin_pages/AddChapter";
import EditDistrict from "./Pages/admin_pages/EditDistrict";
import EditBlock from "./Pages/admin_pages/EditBlock";
import EditClass from "./Pages/admin_pages/EditClass";
import EditSubject from "./Pages/admin_pages/EditSubject";
import EditChapter from "./Pages/admin_pages/EditChapter";


// import Settings from "./Pages/admin_pages/Settings";

// import InviteForm from "./Pages/admin_pages/InviteForm";
function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  const { loading } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  if (loading) {
    return <div class="loader"></div>;
  }
  return (
    // <>
    // <AssessmentQuestions/>
    // </>
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute redirectTo="admin/settings" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<MFAAuthenticator />} />
        <Route path="/qr" element={<Qr />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={<ProtectedRoute allowedRoles={["admin", "user", "soumya"]} />}
      >
        <Route path="/" element={<Admin />}>

          <Route index element={<Navigate to="/administrative" replace />} />
          <Route path="administrative" element={<Administrative />}></Route>
          <Route path="districts" element={<District />}></Route>
          <Route path="blocks" element={<Blocks />}></Route>
          <Route path="adddistrict" element={<AddDistrict />}></Route>
          <Route path="addblock" element={<AddBlock />}></Route> 
          <Route path="editdistrict" element={<EditDistrict />}></Route> 
          <Route path="editblock" element={<EditBlock />}></Route> 
          <Route path="academic" element={<Academic />}></Route> 
          <Route path="classes" element={<Classes />}></Route> 
          <Route path="subjects" element={<Subjects />}></Route> 
          <Route path="chapters" element={<Chapters />}></Route> 
          <Route path="addclass" element={<AddClass />}></Route> 
          <Route path="addsubject" element={<AddSubject />}></Route> 
          <Route path="addchapter" element={<AddChapter />}></Route> 
          <Route path="editclass" element={<EditClass />}></Route> 
          <Route path="editsubject" element={<EditSubject />}></Route> 
          <Route path="editchapter" element={<EditChapter/>}></Route> 
      

          {/* <Route index element={<Navigate to="/admin/settings" replace />} />
          <Route path="settings" element={<Settings />}></Route> */}


          {/* <Route index element={<Navigate to="/admin/users" replace />} /> */}
          {/* todo: Add the following routes */}
          {/* <Route path="aq" element={<AssessmentQuestions />} /> */}
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
        {/* <Route path="/" element={<Main />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route> */}
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin", "soumya"]} />}>
        <Route path="/" element={<Main />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Dashboard  */}
      {/* <Route path="/admin" element={<Admin />}>
        // <Route index element={<HomePage />}></Route>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="*" element={<Error />} />
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="e-learning" element={<ELearningPage />} />
        <Route path="study-data" element={<StudyDataPage />} />
        <Route path="study-reports" element={<StudyReportsPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
      </Route> */}

      {/* 404 Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
