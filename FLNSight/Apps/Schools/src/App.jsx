import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Pages/Authentication/Login";
// import ForgotPassword from "./Pages/Authentication/ForgotPassword";
// import MFAAuthenticator from "./Pages/Authentication/MFAAuthenticator";
// import Invitation from "./Pages/Authentication/Invitation";
// import Qr from "./Pages/Authentication/Qr";
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


// import InviteForm from "./Pages/admin_pages/InviteForm";
import { IconProvider } from "./context/IconContext";
import HomePage from "./Pages/admin_pages/HomePage";
import StudentsPage from "./Pages/admin_pages/StudentsPage";
import AddStudentPage from "./Pages/admin_pages/AddStudentPage";
import ViewStudentPage from "./Pages/admin_pages/ViewStudentPage";
import EditStudentPage from "./Pages/admin_pages/EditStudentPage";
import StudentAttendancePage from "./Pages/admin_pages/DailyStudentAttendance";



import TeachersPage from "./Pages/admin_pages/TeachersPage";
import AddTeacherButton from "./components/admin/AddTeacherButton";

import TeacherRow from "./components/admin/TeacherRow";
import { EditTeacher } from "./Pages/admin_pages/EditTeacher";
import { AddTeacher } from "./Pages/admin_pages/AddTeacher";
import LearningMaterial from "./Pages/admin_pages/LearningMaterial";
// import { ClassSetting } from "./Pages/admin_pages/ClassSetting";
import SectionSetting from "./Pages/admin_pages/SectionSetting";
import EditSection from "./Pages/admin_pages/EditSection";
import AddSection from "./Pages/admin_pages/AddSection";
import TeacherAttendance from "./Pages/admin_pages/TeacherAttendance";
import { ClassSetting } from "./Pages/admin_pages/ClassSetting";
import StudentAttendance from "./Pages/admin_pages/StudentAttendance";

function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  const { loading } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    // <>
    // <AssessmentQuestions/>
    // </>
    <IconProvider>
      <Routes>
        {/* Public Routes */}
        {/* <Route element={<PublicRoute redirectTo="admin/dashboard" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<MFAAuthenticator />} />
        <Route path="/qr" element={<Qr />} />
      </Route> */}

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "user", "soumya"]} />
          }
        >
          <Route path="/" element={<Admin />}>
            <Route index element={<Navigate to="/schools" replace />} />
            <Route path="schools" element={<HomePage />}></Route>
            <Route path="students" element={<StudentsPage />}></Route>
            <Route path="students/add" element={<AddStudentPage />} />
            <Route path="students/view/:studentId" element={<ViewStudentPage />} /> 
            <Route path="students/edit/:studentId" element={<EditStudentPage />} />
      
       
            {/* Existing routes */}
            <Route path="/attendance" element={<StudentAttendancePage />} /> 
            
         
        
            
            <Route path="teachers" element={<TeachersPage />}></Route>
            <Route path="/" element={<AddTeacherButton />} />
            <Route path="/AddTeacher" element={<AddTeacher />} />
            <Route path="/" element={<TeacherRow />} />
            <Route path="/EditTeacher" element={<EditTeacher />} />
            <Route
              path="/Learning Materials"
              element={<LearningMaterial />}
            ></Route>
            {/* <Route path="/Settings" element={<ClassSetting />} /> */}
            <Route path="/Settings" element={<SectionSetting />} />
            <Route path="/EditSection" element={<EditSection />} />
            <Route path="/AddSection" element={<AddSection />} />
            {/* <Route path="/Attendance" element={<TeacherAttendance />} /> */}
            <Route path="/Attendance" element={<StudentAttendance />} />


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
    </IconProvider>
  );
}

export default App;














