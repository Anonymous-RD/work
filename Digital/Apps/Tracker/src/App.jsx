
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import './App.css'
import Layout from "./components/layout/Layout";
import Main from "./Pages/Main";
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { fetchUserDetails } from './redux/slices/fetchUserDetailsSlice';
import ProtectedRoute from './Pages/Routes/ProtectedRoute';
function App() {

  const token = Cookies.get("token"); // Retrieve token from cookies
  console.log(token);
  const { loading } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);
  
  if (loading) {
    return <div class="loader"></div>;
  }
  return (
    
      <Layout>
      <Routes>
      <Route path="/" element={<Navigate to="/tracker" replace />} />

        <Route element={<ProtectedRoute allowedRoles={["admin", "user", "soumya"]}/>}>
        <Route path="/tracker" element={<Main />} />
        
        </Route>
      </Routes>
      </Layout>
  
  )
}

export default App
