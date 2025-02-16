import React, { useState } from "react";

export function StudentRow({
  className,
  id,
  avatarUrl,
  isActive,
  menuIconUrl,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleAction = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className="grid grid-cols-5 items-center border-b border-gray-100 py-3">
      {/* Class Name */}
      <div className="col-span-1  text-gray-800 font-medium text-left">
        {className}
      </div>
      {/* Class Code */}
      <div className="col-span-1 text-gray-500 text-left">{id}</div>
      {/* Teacher Avatar */}
      <div className="col-span-1">
        <img
          src={avatarUrl}
          alt={`Student ${id} avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      {/* Status */}
      <div className="col-span-1 ml-2">
        <button
          className={`px-4 py-2 text-xs font-medium rounded ${
            isActive ? "bg-green-100 text-green-500" : "bg-red-300 text-white"
          }`}
        >
          {isActive ? "Active" : "Deactive"}
        </button>
      </div>
      {/* Action Menu */}
      <div className="col-span-1 relative ml-8">
        <button
          className="p-2 rounded hover:bg-gray-200 transition"
          onClick={toggleAction}
        >
          <img src={menuIconUrl} alt="menu" className="w-5 h-5" />
        </button>
        {isProfileOpen && (
          <div className="absolute top-8 right-48 w-36 bg-white rounded-xl shadow-lg py-1 z-10">
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Activate
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Deactivate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
