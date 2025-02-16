import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherRow({
  name,
  email,
  phone,
  subject,
  joinDate,
  avatar,
  menuIcon,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const toggleAction = () => setIsProfileOpen(!isProfileOpen);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/EditTeacher");
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsProfileOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleDeleteConfirm = () => {
    // Perform delete logic here
    console.log(`${name} deleted`);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-6 items-center py-5 text-gray-700 text-sm border-b border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 object-cover rounded"
        />
        <span className="truncate text-black font-medium">{name}</span>
      </div>
      <div className="truncate text-gray-500 text-sm font-medium">{email}</div>
      <div className="text-gray-500 text-sm font-medium">{phone}</div>
      <div>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-xs">
          {subject}
        </span>
      </div>
      <div className="text-black font-medium">{joinDate}</div>
      <div className="flex justify-center mr-16">
        <button
          className="p-2 rounded hover:bg-gray-200 transition duration-300"
          onClick={toggleAction}
        >
          <img src={menuIcon} alt="menu" className="w-5 h-5 object-contain" />
        </button>
        {isProfileOpen && (
          <div className="absolute right-36 mt-9 w-36 bg-white rounded-xl shadow-lg py-1 z-10">
            <button className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left">
              View
            </button>
            <button
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col justify-center items-center font-semibold text-gray-800 bg-white rounded-2xl shadow-lg p-6 w-auto text-center">
            <h2 className="text-3xl text-black font-semibold mb-7">
              Are you sure you want to <br /> delete this teacher?
            </h2>
            <div className="flex justify-center gap-7">
              <button
                onClick={closeModal}
                className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
              >
                No
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="gap-2.5 self-stretch px-5 py-3.5 bg-lime-300 text-black rounded-xl w-[123px]"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherRow;
