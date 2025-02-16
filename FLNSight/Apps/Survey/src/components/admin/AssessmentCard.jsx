import React, { useEffect, useRef, useState } from 'react'
import { IoEllipsisVertical } from "react-icons/io5";


const AssessmentCard = ({ assessment, onView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Draft":
        return "bg-orange-100 text-orange-600";
      case "Published":
        return "bg-green-100 text-green-600";
      case "Closed":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#F5F5F5] rounded-[16px] relative flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className='p-4'>
          <h3 className="text-lg font-medium text-[#1B212D]">
            Monthly Assessment
          </h3>
        </span>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="relative  text-gray-400 hover:text-gray-600"
        >
         <div className='p-4'> <IoEllipsisVertical size={18} /></div>
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute  items-start justify-items-start	 top-10 right-6 bg-white border rounded-[16px] w-24 z-10"
          >
            {/* <button
              className="block w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => {
                onView(assessment, false);
                setShowMenu(false);
              }}
            >
              View
            </button> */}
            <button
              className="block text-left w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => {
                onView(assessment, true);
                setShowMenu(false);
              }}
            >
              Edit
            </button>

            {/* Horizontal Rule */}
            <hr className="border-gray-300 opacity-[0.5] w-full"  />

            <button className="block text-left w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
      </div>

      <hr className="border-[#131826] opacity-[0.1]" />
      <div className="flex justify-between p-4">
        <div className="mb-2">
          <p className="text-xs text-[#ADA9B4] font-medium pb-2">SUBMISSIONS</p>
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold text-[#161619] h-8">
              120
            </p>
          </div>
        </div>
        <div className='mt-[16px] h-8 bg-[#D9FFE9] rounded'><span className='py-4 px-2 text-xs font-medium text-[#27AE60]'>Survey</span></div>
      </div>
    </div>
  );
};

export default AssessmentCard