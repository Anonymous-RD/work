import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function AddTeacherButton() {
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    navigate("/AddTeacher"); // Redirect to AddTeacher page
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center px-4 py-2 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold text-gray-800 
                 bg-lime-300 hover:bg-lime-400 transition rounded-lg sm:rounded-xl 
                 mt-4 sm:mt-2 mx-4 sm:mx-8"
      tabIndex={0}
      aria-label="Add Teacher"
    >
      {/* Plus Icon */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffc955f346f963eedcb9ac62114fb99f206c951c9443da9842c8e1d97a58f789"
        alt="Add"
        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
      />
      <span className="hidden sm:inline">Add Teacher</span>
      <span className="sm:hidden">Add</span>
    </button>
  );
}
