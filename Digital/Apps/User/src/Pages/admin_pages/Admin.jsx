import React from "react";
import Sidebar from "../../components/common/Sidebar/Sidebar";
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-[20px] h-screen overflow-hidden">
        <main className="h-full  ">
          <TopBar/>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
