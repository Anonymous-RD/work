import React from "react";
import Sidebar from "../../components/admin/sidebar";
import { NavLink, Outlet } from "react-router-dom";
import TopBar from "../../components/admin/TopBar";

function Admin() {
  return (
    // <div className="">
    //   {/* <Sidebar></Sidebar> */}
    //   <NavLink to="/admin/home">Home</NavLink>
    //   <NavLink to="/admin/user">user</NavLink>
    //   <Outlet />
    // </div>
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[50px] pt-8">
        <TopBar></TopBar>
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
