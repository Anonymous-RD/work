import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import { NavLink, Outlet } from "react-router-dom";
import TopBar from "../../components/admin/TopBar";
import { PageMetadataProvider } from "../../context/PageMetadataContext";

function Admin() {

  const handleIconClick = () => {
        clearIconState(); // Clear the icon
        navigate(-1); // Navigate to the previous page
      };
  return (
    
    <PageMetadataProvider>
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="fixed left-0 top-0 w-[250px] text-white z-10 h-full" />
      <div className="flex-1 overflow-hidden h-screen ">
        <TopBar
         className="fixed top-0 left-0 w-full bg-gray-200 z-20 h-[64px]"
        onIconClick={handleIconClick} />
        <div className="mt-[4px] ml-[40px] h-full overflow-y-auto">
           <Outlet />
         </div>
      </div>
    </div>
    </PageMetadataProvider>
  );
}

export default Admin;
