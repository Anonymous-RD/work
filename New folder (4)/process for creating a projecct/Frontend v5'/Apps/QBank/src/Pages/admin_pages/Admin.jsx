import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import TopBar from "../../components/admin/TopBar";
import { useIconContext } from "../../context/IconContext"; // Import the custom hook

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
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="fixed left-0 top-0 w-[250px] text-white z-10 h-full" />
      <div className="flex-1 h-screen overflow-hidden">
        {/* Pass the icon prop to the TopBar and handle icon click */}
        <TopBar icon={currentIcon} onIconClick={handleIconClick} />
        <div className="mt-[4px] ml-[40px] h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
