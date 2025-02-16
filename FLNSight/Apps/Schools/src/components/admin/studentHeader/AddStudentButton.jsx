import React from "react";
import { useNavigate } from "react-router-dom";

function AddStudentButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/students/add"); // Navigate to the Add Student page
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-2.5 items-center px-5 py-3.5 text-sm font-semibold text-gray-800 bg-lime-300 rounded-xl"
      aria-label="Add Student"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffc955f346f963eedcb9ac62114fb99f206c951c9443da9842c8e1d97a58f789?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
      <span className="self-stretch my-auto">Add Student</span>
    </button>
  );
}

export default AddStudentButton;