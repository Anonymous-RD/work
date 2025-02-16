import React from "react";
import Sidebar from "../../components/admin/Sidebar";
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
      <Sidebar className="fixed left-0  w-[250px] bg-gray-800 text-white" />
      <div className="flex-1 ml-[30px] h-screen overflow-hidden">
        <main className="h-full ">
          <TopBar className="bg-gray-200 w-full h-[64px] " />
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
