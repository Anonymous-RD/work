import React from "react"; 
import Sidebar from "../../components/admin/Sidebar";
import { NavLink, Outlet } from "react-router-dom";
import TopBar from "../../components/admin/TopBar";
import { PageMetadataProvider } from "../../context/PageMetadataContext";

function Admin() {
  const getIconForRoute = (route) => {
    const routeConfig = {
      "/Add-Learner-Outcome": "/backicon.png",
      "/settings": "/icons/settings-icon.png",
      // Add other routes and their icons here
    };
    console.log(getIconForRoute);

    return routeConfig[route] || null; // Return the icon path or null if no icon
  };

  const icon = getIconForRoute(location.pathname);
  return (
    <PageMetadataProvider>
      <div className="flex h-screen overflow-hidden min-w-[1024px]">
        <Sidebar className="fixed left-0 top-0 w-[250px] text-white z-10 h-full"  />
        {/* Main content area */}
        <div className="flex-1 h-screen overflow-hidden ml-[280px]">
          <TopBar icon={icon}/>
          <div className="mt-[4px] ml-[40px] h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </PageMetadataProvider>

    // <div className="flex h-screen overflow-hidden">
    //   {/* Sidebar with fixed positioning */}
    //   <Sidebar className="fixed left-0 top-0 w-[250px]  text-white z-10 h-full" />

    //   {/* Main content area */}
    //   <div className="flex-1  h-screen overflow-hidden">
    //     {/* Topbar with fixed positioning */}
    //     <TopBar
    //       className="fixed top-0 left-0 w-full bg-gray-200 z-20 h-[64px]"
    //       icon={icon}
    //     />

    //     {/* Content below the topbar, scrollable */}
    //     <div className="mt-[4px] ml-[40px] h-full overflow-y-auto">
    //       <Outlet className="" />
    //     </div>
    //   </div>
    // </div>

  );
}

export default Admin;
