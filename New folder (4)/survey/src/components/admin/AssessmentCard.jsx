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
    <div className="bg-gray-100 rounded-[16px] shadow-md p-3 relative flex flex-col space-y-3">
      <div className="flex justify-between items-center mb-2">
        <span>
          <h3 className="text-lg font-medium text-gray-800">
            {assessment.name}
          </h3>
        </span>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600"
        >
          <IoEllipsisVertical size={18} />
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute top-8 right-0 bg-white border rounded shadow-lg w-24"
          >
            <button
              className="block w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => {
                onView(assessment, false);
                setShowMenu(false);
              }}
            >
              View
            </button>
            <hr className="border-gray-300" />
            <button
              className="block w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => {
                onView(assessment, true);
                setShowMenu(false);
              }}
            >
              Edit
            </button>

            {/* Horizontal Rule */}
            <hr className="border-gray-300" />

            <button className="block w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
      </div>

      <hr className="border-gray-200" />
      <div className="flex justify-between">
        <div className="mb-2">
          <p className="text-xs text-gray-400">SUBMISSIONS</p>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-gray-700 h-8">
              {assessment.submissions}
            </p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-xs text-gray-400">SURVEYS</p>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-gray-700 h-8">
              {assessment.surveys}
            </p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-xs text-gray-400">ASSESSMENTS</p>
          <div className="flex flex-row justify-between">
            <p className="text-xl font-bold text-gray-700 h-8">
              {assessment.assessments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard