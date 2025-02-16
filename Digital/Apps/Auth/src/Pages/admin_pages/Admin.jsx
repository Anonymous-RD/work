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
    <div className="flex h-screen">
      <Sidebar className=" left-0  w-[250px] bg-gray-800 text-white" />
      <div className="flex-1 ml-[50px] h-screen ">
        <main className="">
          <TopBar />
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>

    //    <div className="flex h-screen">
    //    <Sidebar className="fixed top-0 left-0 h-screen w-[250px] bg-gray-800 text-white" />
    //    <div className="flex-1 ml-[250px] h-screen">
    //      <TopBar className="fixed top-0 left-[250px] right-0 h-[64px] bg-gray-200 z-10" />
    //      <main className="pt-[64px] h-screen overflow-y-auto">
    //        <Outlet />
    //      </main>
    //    </div>
    //  </div>
  );
}

export default Admin;
