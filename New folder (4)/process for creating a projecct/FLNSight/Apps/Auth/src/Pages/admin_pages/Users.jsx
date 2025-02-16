import React, { useState } from "react";
import { userData } from "@/data/UserData";
import { FiSearch } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { IoFilter } from "react-icons/io5";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(""); // Unified filter state

  // Filter and Search Logic
  const applyFilters = () => {
    return userData.filter((user) => {
      const matchesSearchTerm = searchTerm
        ? `${user.username} ${user.email} ${user.phone} ${user.role}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;

      const matchesFilter = filter
        ? user.role === filter || user.approvalStatus === filter
        : true;

      return matchesSearchTerm && matchesFilter;
    });
  };

  const filteredUsers = applyFilters();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen p-6">
      {/* Search and Filters Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/3">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-6 h-6" />
          <input
            type="text"
            placeholder="Search Users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[209px] sm:h-[52px] border border-gray-300 rounded-2xl pl-12 pr-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Unified Filter Dropdown */}
        <div className="flex gap-4 items-center">
          {/* Invite User Button */}
          <button className="flex items-center gap-2 bg-lime-400 text-[#1B212D] font-semibold rounded-xl hover:bg-lime-500 px-4 py-2 w-[120px] h-[40px] sm:w-[158px] sm:h-[52px]">
            <LuPlus className="w-6 h-6" /> Invite User
          </button>
          <div className="relative w-full sm:w-1/3 flex justify-between">
            <div>
              {" "}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-[116px] sm:h-[52px] border border-gray-300 rounded-2xl pl-4 pr-8 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out appearance-none"
              >
                <option value="">All</option>
                <optgroup label="Roles">
                  <option value="Role1">Role1</option>
                  <option value="Role2">Role2</option>
                  <option value="Role3">Role3</option>
                </optgroup>
                <optgroup label="Approval Status">
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </optgroup>
              </select>
            </div>
            <div className="absolute top-1/2 right-1 transform -translate-y-1/2">
              <IoFilter className="text-gray-700 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <table className="table-auto w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium">
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone No.</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status of Approval</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.approvalStatus === "Approved"
                        ? "bg-green-100 text-green-600"
                        : user.approvalStatus === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {user.approvalStatus}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="text-gray-600 hover:text-gray-800">
                    ...
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-2 text-center text-gray-600 italic"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
