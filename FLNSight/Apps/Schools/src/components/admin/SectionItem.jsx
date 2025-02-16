import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SectionItem({ sectionName, className, code, imageUrl }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const toggleAction = () => setIsProfileOpen(!isProfileOpen);

  const handleEditClick = () => navigate("/EditSection");

  const openModal = () => {
    setIsModalOpen(true);
    setIsProfileOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log(`${sectionName} deleted`);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center py-5 border-b border-gray-100">
      <div className="w-1/4 text-sm font-medium text-black">
        {sectionName}
      </div>
      <div className="w-1/4 text-sm text-gray-500">{className}</div>
      <div className="w-1/4 text-xs font-semibold text-gray-400">{code}</div>
      <div className="w-1/4 pl-14 lg:pl-14 flex items-center justify-center">
        <button
          onClick={toggleAction}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <img src={imageUrl} alt="Action" className="w-5 h-5" />
        </button>
        {isProfileOpen && (
          <div className="absolute right-40 mt-36 w-36 bg-white rounded-xl shadow-lg py-1 z-10">
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
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col justify-center items-center font-semibold text-gray-800 bg-white rounded-2xl shadow-lg p-6 w-auto text-center">
              <h2 className="text-3xl text-black font-semibold mb-7">
                Are you sure you want to <br /> delete this section?
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
    </div>
  );
}

export default SectionItem;
