import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/fetchUserDetailsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const handlelogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      Dashboard
      <button onClick={handlelogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
