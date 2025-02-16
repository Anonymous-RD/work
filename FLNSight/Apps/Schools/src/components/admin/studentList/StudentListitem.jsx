// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const StudentListItem = ({
//   studentImage,
//   studentName,
//   studentId,
//   className,
//   year,
//   parentName,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
//   const [isSelected, setIsSelected] = useState(false); 
//   const navigate = useNavigate();

//   const handleToggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (action) => {
//     if (action === "View") {
//       navigate(`/students/view/${studentId}`); 
//     } else if (action === "Edit") {
//       navigate(`/students/edit/${studentId}`); 
//     } else if (action === "Delete") {
//       setIsDeleteModalOpen(true); // Open the delete confirmation modal
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleDeleteStudent = () => {
//     console.log(`Deleting student: ${studentName}`);
//     setIsDeleteModalOpen(false);
//     // Add delete logic here (e.g., API call to delete student)
//   };

//   return (
//     <div className="flex relative flex-col items-start w-full">
//       <div className="flex z-0 flex-wrap gap-8 items-center">
//         <div className="flex gap-3.5 items-center self-stretch my-auto text-sm font-medium text-gray-800 w-[237px] shrink-0">
//           <img
//             loading="lazy"
//             src={studentImage}
//             alt={`Profile picture of ${studentName}`}
//             className="object-contain shrink-0 self-stretch my-auto w-10 rounded aspect-square"
//           />
//           <div className="self-stretch my-auto rounded-none w-[183px] truncate">
//             {studentName}
//           </div>
//         </div>
//         <div className="self-stretch my-auto text-sm font-medium text-gray-500 w-[123px] shrink-0">
//           {studentId}
//         </div>
//         <div className="self-stretch my-auto text-sm font-semibold text-gray-800 w-[148px] shrink-0">
//           {className}
//         </div>
//         <div className="self-stretch my-auto text-sm font-medium text-gray-800 rounded-none w-[148px] shrink-0">
//           {year}
//         </div>
//         <div className="self-stretch my-auto text-sm font-medium text-gray-500 w-[158px] shrink-0">
//           {parentName}
//         </div>
//         <div className="relative flex gap-2.5 justify-center items-center self-stretch my-auto">
//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <div className="absolute top-0 right-full mr-2 bg-white border border-gray-300 rounded shadow-lg z-10">
//               <div
//                 className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick("View")}
//               >
//                 View
//               </div>
//               <div
//                 className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick("Edit")}
//               >
//                 Edit
//               </div>
//               <div
//                 className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick("Delete")}
//               >
//                 Delete
//               </div>
//             </div>
//           )}

//           {/* Three-dot Icon */}
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca889dcfafd88ca02ad6e05cb434af3961c59d6df8c8c3473aa7c839eb460541?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
//             alt="Actions"
//             className="object-contain aspect-[0.25] w-[5px] cursor-pointer ml-7 shrink-0"
//             onClick={handleToggleDropdown} 
//           />
//         </div>

//         {/* Checkbox */}
//         <div className="self-stretch my-auto w-[30px] flex justify-center ml-14 shrink-0">
//           <input
//             type="checkbox"
//             checked={isSelected}
//             onChange={() => setIsSelected(!isSelected)} // Toggle selection state
//             className="w-5 h-5 accent-lime-300"
//           />
//         </div>
//       </div>

//       {/* Modal for delete confirmation */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="flex flex-col justify-center items-center font-semibold text-gray-800 bg-white rounded-2xl shadow-lg p-6 w-auto text-center">
//             <h2 className="text-3xl text-black font-semibold mb-7">
//               Are you sure you want to <br />
//               delete this student?
//             </h2>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
//                 onClick={() => setIsDeleteModalOpen(false)} // Close modal
//               >
//                 No
//               </button>
//               <button
//                 className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
//                 onClick={handleDeleteStudent} // Handle delete
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentListItem;





//right code 

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const StudentListItem = ({
//   studentImage,
//   studentName,
//   studentId,
//   className,
//   year,
//   parentName,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isSelected, setIsSelected] = useState(false);
//   const navigate = useNavigate();

//   const handleToggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (action) => {
//     if (action === "View") {
//       navigate(`/students/view/${studentId}`);
//     } else if (action === "Edit") {
//       navigate(`/students/edit/${studentId}`);
//     } else if (action === "Delete") {
//       setIsDeleteModalOpen(true);
//     }
//     setIsDropdownOpen(false);
//   };

//   const handleDeleteStudent = () => {
//     console.log(`Deleting student: ${studentName}`);
//     setIsDeleteModalOpen(false);
//   };

//   return (
//     <div className="flex relative flex-col items-start w-full">
//       <div className="flex z-0 flex-wrap gap-8 items-center">
//         <div className="flex gap-3.5 items-center self-stretch my-auto text-sm font-medium text-gray-800 w-[237px] shrink-0">
//           <img
//             loading="lazy"
//             src={studentImage}
//             alt={`Profile picture of ${studentName}`}
//             className="object-contain shrink-0 self-stretch my-auto w-10 rounded aspect-square"
//           />
//           <div className="self-stretch my-auto rounded-none w-[183px] truncate">
//             {studentName}
//           </div>
//         </div>
//         <div className="self-stretch my-auto text-sm font-medium text-gray-500 w-[123px] shrink-0">
//           {studentId}
//         </div>
//         <div className="self-stretch my-auto text-sm font-semibold text-gray-800 w-[148px] shrink-0">
//           {className}
//         </div>
//         <div className="self-stretch my-auto text-sm font-medium text-gray-800 rounded-none w-[148px] shrink-0">
//           {year}
//         </div>
//         <div className="self-stretch my-auto text-sm font-medium text-gray-500 w-[158px] shrink-0">
//           {parentName}
//         </div>
//         <div className="relative flex gap-2.5 justify-center items-center self-stretch my-auto">
//           {isDropdownOpen && (
//             <div className="absolute top-0 right-full mr-2 bg-white border border-gray-300 rounded shadow-lg z-10">
//               <div
//                 className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick("View")}
//               >
//                 View
//               </div>
//               <div
//                 className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick("Edit")}
//               >
//                 Edit
//               </div>
//               <div
//                 className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleOptionClick("Delete")}
//               >
//                 Delete
//               </div>
//             </div>
//           )}
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca889dcfafd88ca02ad6e05cb434af3961c59d6df8c8c3473aa7c839eb460541?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
//             alt="Actions"
//             className="object-contain aspect-[0.25] w-[5px] cursor-pointer ml-7 shrink-0"
//             onClick={handleToggleDropdown}
//           />
//         </div>
//         <div className="self-stretch my-auto w-[30px] flex justify-center ml-14 shrink-0">
//           <input
//             type="checkbox"
//             checked={isSelected}
//             onChange={() => setIsSelected(!isSelected)}
//             className="w-5 h-5 accent-lime-300"
//           />
//         </div>
//       </div>
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="flex flex-col justify-center items-center font-semibold text-gray-800 bg-white rounded-2xl shadow-lg p-6 w-auto text-center">
//             <h2 className="text-3xl text-black font-semibold mb-7">
//               Are you sure you want to <br />
//               delete this student?
//             </h2>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
//                 onClick={() => setIsDeleteModalOpen(false)}
//               >
//                 No
//               </button>
//               <button
//                 className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
//                 onClick={handleDeleteStudent}
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentListItem;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentListItem = ({
  studentImage,
  studentName,
  studentId,
  className,
  year,
  parentName,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (action) => {
    if (action === "View") {
      navigate(`/students/view/${studentId}`);
    } else if (action === "Edit") {
      navigate(`/students/edit/${studentId}`);
    } else if (action === "Delete") {
      setIsDeleteModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  const handleDeleteStudent = () => {
    console.log(`Deleting student: ${studentName}`);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex relative flex-col items-start w-full">
      <div className="flex z-0 flex-wrap gap-8 items-center">
        <div className="self-stretch my-auto w-[30px] flex justify-center shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => setIsSelected(!isSelected)}
            className="w-5 h-5 accent-lime-300"
          />
        </div>
        <div className="flex gap-3.5 items-center self-stretch my-auto text-sm font-medium text-gray-800 w-[237px] shrink-0">
          <img
            loading="lazy"
            src={studentImage}
            alt={`Profile picture of ${studentName}`}
            className="object-contain shrink-0 self-stretch my-auto w-10 rounded aspect-square"
          />
          <div className="self-stretch my-auto rounded-none w-[183px] truncate">
            {studentName}
          </div>
        </div>
        <div className="self-stretch my-auto text-sm font-medium text-gray-500 w-[123px] shrink-0">
          {studentId}
        </div>
        <div className="self-stretch my-auto text-sm font-semibold text-gray-800 w-[148px] shrink-0">
          {className}
        </div>
        <div className="self-stretch my-auto text-sm font-medium text-gray-800 rounded-none w-[148px] shrink-0">
          {year}
        </div>
        <div className="self-stretch my-auto text-sm font-medium text-gray-500 w-[158px] shrink-0">
          {parentName}
        </div>
        <div className="relative flex gap-2.5 justify-center items-center self-stretch my-auto">
          {isDropdownOpen && (
            <div className="absolute top-0 right-full mr-2 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div
                className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("View")}
              >
                View
              </div>
              <div
                className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("Edit")}
              >
                Edit
              </div>
              <div
                className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("Delete")}
              >
                Delete
              </div>
            </div>
          )}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca889dcfafd88ca02ad6e05cb434af3961c59d6df8c8c3473aa7c839eb460541?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
            alt="Actions"
            className="object-contain aspect-[0.25] w-[5px] cursor-pointer ml-7 shrink-0"
            onClick={handleToggleDropdown}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col justify-center items-center font-semibold text-gray-800 bg-white rounded-2xl shadow-lg p-6 w-auto text-center">
            <h2 className="text-3xl text-black font-semibold mb-7">
              Are you sure you want to <br />
              delete this student?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                No
              </button>
              <button
                className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
                onClick={handleDeleteStudent}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListItem;




