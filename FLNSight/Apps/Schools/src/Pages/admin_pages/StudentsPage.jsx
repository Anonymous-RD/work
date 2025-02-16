// ori
// import React from "react";
// import SearchBar from "@/components/admin/studentHeader/SearchBar.jsx";
// import PromoteButton from "@/components/admin/studentHeader/PromoteButton.jsx";
// import AddStudentButton from "@/components/admin/studentHeader/AddStudentButton.jsx";
// import StudentTable from "@/components/admin/studentHeader/StudentTable.jsx";
// import StudentList from "@/components/admin/studentList/StudentList.jsx";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function StudentsPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dynamicHeaderTitle = location.state?.headerTitle || "Student List";

//   // Handle Add Student Button Click
//   const handleAddStudentClick = () => {
//     navigate("/students/add");
//   };

//   return (
//     <div className="flex h-screen">
      

//         {/* Search bar and buttons */}
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <SearchBar />
//           </div>
//           <div className="flex gap-4 shrink-0">
//             <PromoteButton />
//             <AddStudentButton onClick={handleAddStudentClick} />
//           </div>
//         </div>

//         {/* Table and student list */}
//         <div className="flex-1 grid grid-rows-8 gap-2 overflow-hidden">
//           <div className="mt-6">
//             <StudentTable />
//           </div>
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//         </div>
//       </div>
   
//   );
// }







//this is ori
// import React, { useEffect } from "react";
// import SearchBar from "@/components/admin/studentHeader/SearchBar.jsx";
// import PromoteButton from "@/components/admin/studentHeader/PromoteButton.jsx";
// import AddStudentButton from "@/components/admin/studentHeader/AddStudentButton.jsx";
// import StudentTable from "@/components/admin/studentHeader/StudentTable.jsx";
// import StudentList from "@/components/admin/studentList/StudentList.jsx";
// import { useNavigate, useLocation } from "react-router-dom";
// import { usePageMetadata } from "@/context/PageMetadataContext";

// export default function StudentsPage() {
//   const navigate = useNavigate();
//   const location = useLocation();


//   // Handle Add Student Button Click
//   const handleAddStudentClick = () => {
//     navigate("/students/add");
//   };


//   const { setMetadata } = usePageMetadata();        
//    useEffect(() => {
//     setMetadata({
//       title: "Students",
//       backPath: null ,
//     });
//   }, [setMetadata]);




//   return (



    
//     <div className="flex flex-col  px-6">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mt-4">
//         {/* Search bar */}
//         <div className="w-1/3 mb-8 ">
//           <SearchBar />
//         </div>
//         {/* Buttons */}
//         <div className="flex gap-4 mb-4 mr-8">
//           <PromoteButton />
//           <AddStudentButton onClick={handleAddStudentClick} />
//         </div>
//       </div>

//       {/* Main Content Section */}
//       <div className="flex-1 mt-5 overflow-auto">
//         <div className="grid grid-rows-auto gap-7">
//           <StudentTable />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//           <StudentList />
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect } from "react";
import SearchBar from "@/components/admin/studentHeader/SearchBar.jsx";
import PromoteButton from "@/components/admin/studentHeader/PromoteButton.jsx";
import AddStudentButton from "@/components/admin/studentHeader/AddStudentButton.jsx";
import StudentTable from "@/components/admin/studentHeader/StudentTable.jsx";
import StudentList from "@/components/admin/studentList/StudentList.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { usePageMetadata } from "@/context/PageMetadataContext";

export default function StudentsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Add Student Button Click
  const handleAddStudentClick = () => {
    navigate("/students/add");
  };

  const { setMetadata } = usePageMetadata();        
  useEffect(() => {
    setMetadata({
      title: "Students",
      backPath: null,
    });
  }, [setMetadata]);

  return (
    <div className="flex flex-col h-screen px-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mt-4">
        {/* Search bar */}
        <div className="w-1/3 mb-8">
          <SearchBar />
        </div>
        {/* Buttons */}
        <div className="flex gap-4 mb-4 mr-8">
          <PromoteButton />
          <AddStudentButton onClick={handleAddStudentClick} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 mt-5 overflow-auto pb-8">
        <div className="grid grid-rows-auto gap-8">
          <StudentTable />
          <StudentList />
          <StudentList />
          <StudentList />
          <StudentList />
          <StudentList />
          <StudentList />
          <StudentList />
        </div>
      </div>
    </div>
  );
}