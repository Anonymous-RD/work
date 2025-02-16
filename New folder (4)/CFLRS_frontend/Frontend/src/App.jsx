import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Authentication/Login";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import MFAAuthenticator from "./Pages/Authentication/MFAAuthenticator";
import Invitation from "./Pages/Authentication/Invitation";
import Qr from "./Pages/Authentication/Qr";
import Admin from "./components/layouts/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/MFA",
    element: <MFAAuthenticator />,
  },
  {
    path: "/invitation",
    element: <Invitation />,
  },
  {
    path: "/qr",
    element: <Qr />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
