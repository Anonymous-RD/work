import React from "react";

const UsersPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <table className="w-[90%] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">1</td>
            <td className="border border-gray-300 p-2">John Doe</td>
            <td className="border border-gray-300 p-2">john@example.com</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">2</td>
            <td className="border border-gray-300 p-2">Jane Smith</td>
            <td className="border border-gray-300 p-2">jane@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
