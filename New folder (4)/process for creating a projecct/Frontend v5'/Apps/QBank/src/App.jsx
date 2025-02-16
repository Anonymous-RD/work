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
import LOutcome from "./Pages/admin_pages/LOutcome";
import AssessmentQuestions from "./Pages/admin_pages/AssessmentsQuestions";
import AddAssessmentQuestion from "./Pages/admin_pages/AddAssessmentQuestion";
import EditAssessmentQuestion from "./Pages/admin_pages/EditAssessmentQuestion";
import AddLearnerOutcome from "./Pages/admin_pages/AddLearnerOutcome";
import EditLearnerOutcome from "./Pages/admin_pages/EditLearnerOutcome";
// import InviteForm from "./Pages/admin_pages/InviteForm";
import { IconProvider } from "./context/IconContext";
import { HistoryProvider } from "./context/HistoryContext"; // Import the context
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
    <IconProvider>
      <HistoryProvider>
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
            <Route path="/admin" element={<Admin />}>
              <Route
                index
                element={<Navigate to="/admin/Learner-Outcomes" replace />}
              />
              <Route path="Learner-Outcomes" element={<LOutcome />}></Route>
              <Route
                path="Add-Learner-Outcome"
                element={<AddLearnerOutcome />}
                state={{ icon: "icon" }}
              ></Route>
              <Route
                path="Edit-Learner-Outcome/:id"
                element={<EditLearnerOutcome />}
                state={{ icon: "icon" }}
              ></Route>

              <Route
                path="/admin/Add-Assessment-Question"
                element={<AddAssessmentQuestion />}
              ></Route>
              <Route
                path="Edit-Assessment-Question/:id"
                element={<EditAssessmentQuestion />}
              ></Route>
              {/* <Route
            path="/admin/addAssessment"
            element={<AddAssessmentQuestion />}
          />
          <Route
            path="/admin/addAssessment/:id"
            element={<EditAssessmentQuestion />}
          /> */}
              <Route
                path="Assessment-Questions"
                element={<AssessmentQuestions />}
              ></Route>
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
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "soumya"]} />}
          >
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
      </HistoryProvider>
    </IconProvider>
  );
}

export default App;
