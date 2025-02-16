import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import TopBar from "../../components/admin/TopBar";
import { useIconContext } from "../../context/IconContext"; // Import the custom hook
import { PageMetadataProvider } from "../../context/PageMetadataContext";

function Admin() {
  const navigate = useNavigate();
  const { icon, clearIconState } = useIconContext(); // Get the current icon from context and the clear function
  const currentIcon = icon ? true : false;

  // Function to handle icon click (clear the icon and navigate back)
  const handleIconClick = () => {
    clearIconState(); // Clear the icon
    navigate(-1); // Navigate to the previous page
  };

  return (
    <PageMetadataProvider>
      <div className="flex h-full overflow-hidden min-w-[1024px] wrapper">
        <Sidebar />
        <div className="px-[30px] flex-1 flex flex-col h-screen overflow-hidden">
          {/* Pass the icon prop to the TopBar and handle icon click */}
          <TopBar icon={currentIcon} onIconClick={handleIconClick} />
          <Outlet />
        </div>
      </div>
    </PageMetadataProvider>
  );
}

export default Admin;
