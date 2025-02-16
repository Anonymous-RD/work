// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "../../components/admin/Sidebar";
// import { useIconContext } from "../../context/IconContext";
// import { PageMetadataProvider } from "../../context/PageMetadataContext";

// function Admin() {
//   const navigate = useNavigate();
//   const { icon, clearIconState } = useIconContext();
//   const currentIcon = icon ? true : false;

//   const handleIconClick = () => {
//     clearIconState();
//     navigate(-1);
//   };

//   return (
//     <PageMetadataProvider>
//       <div className="flex h-screen overflow-hidden min-w-[1024px]">
//         <Sidebar className="fixed left-0 top-0 w-[250px] text-white z-10 h-full" />
//         <div className="flex-1 h-screen overflow-hidden ml-[280px]">
//           <div className="mt-[4px] ml-[40px] h-full overflow-y-auto">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </PageMetadataProvider>
//   );
// }

// export default Admin;



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
      <div className="flex h-screen overflow-hidden min-w-[1024px]">
        <Sidebar className="fixed left-0 top-0 w-[250px] text-white z-10 h-full" />
        <div className="flex-1 h-screen overflow-hidden ml-[280px]">
          {/* Pass the icon prop to the TopBar and handle icon click */}
          <TopBar icon={currentIcon} onIconClick={handleIconClick} />
          <div className="mt-[4px] ml-[40px] h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </PageMetadataProvider>
  );
}

export default Admin;