import React, { useState, useEffect, useRef } from "react";
import { assessments } from "@/data/AssessmentData";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";

// Modal Component
const Modal = ({ assessment, onClose, onSave, isEditing }) => {
  const [formData, setFormData] = useState(assessment || {});

  useEffect(() => {
    if (assessment) setFormData(assessment);
  }, [assessment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!assessment) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Assessment" : assessment.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            &times;
          </button>
        </div>

        <div>
          {isEditing ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Submissions
                </label>
                <input
                  type="number"
                  name="submissions"
                  value={formData.submissions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Contributor">Contributor</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-2">
                <strong>Status:</strong> {assessment.status}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Submissions:</strong> {assessment.submissions}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Role:</strong> {assessment.role}
              </p>
            </>
          )}
        </div>

        <div className="mt-4 text-right">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
            >
              Save
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// AssessmentCard Component
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
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-md ${getStatusColor(
            assessment.status
          )}`}
        >
          {assessment.status}
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

      <h3 className="text-sm font-semibold text-gray-800">{assessment.name}</h3>

      <div className="mb-2">
        <p className="text-xs text-gray-400">SUBMISSIONS</p>
        <p className="text-lg font-bold text-gray-800">
          {assessment.submissions}
        </p>
      </div>

      <div
        className="w-full p-3 rounded-md"
        style={{ backgroundColor: "#EDEEEB" }}
      >
        <div className="flex items-center">
          <p className="text-xs text-gray-500">Roles</p>
          <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-md">
            {assessment.role}
          </span>
        </div>
      </div>
    </div>
  );
};

// AssessmentsGrid Component
const AssessmentsGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);
  const filterSelectRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFilterIconClick = () => {
    if (filterSelectRef.current) {
      filterSelectRef.current.focus();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSave = (updatedAssessment) => {
    const index = assessments.findIndex(
      (item) => item.name === selectedAssessment.name
    );
    if (index !== -1) {
      assessments[index] = updatedAssessment;
    }
  };

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      assessment.submissions.toString().includes(debouncedQuery) ||
      assessment.role.toLowerCase().includes(debouncedQuery);

    const [filterType, filterValue] = selectedFilter.split(":");
    const matchesFilter =
      selectedFilter === "Filter" ||
      (filterType === "Status" && assessment.status === filterValue) ||
      (filterType === "Role" && assessment.role === filterValue);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
            onClick={handleIconClick}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Assessments"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[208px] sm:h-[40px] border border-gray-300 rounded-2xl pl-12 pr-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
  <IoFilter
    onClick={handleFilterIconClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
  />
  <select
    ref={filterSelectRef}
    value={selectedFilter}
    onChange={(e) => setSelectedFilter(e.target.value)}
    className="w-full sm:w-[160px] sm:h-[40px] border border-gray-300 rounded-2xl pl-12 pr-2 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out appearance-none"
  >
    {/* Default Filter Option */}
    <option value="Filter" disabled>
      Filter
    </option>
    {/* Status Options */}
    <optgroup label="Status">
      <option value="Status:All">All Status</option>
      <option value="Status:Draft">Draft</option>
      <option value="Status:Published">Published</option>
      <option value="Status:Closed">Closed</option>
    </optgroup>
    {/* Role Options */}
    <optgroup label="Role">
      <option value="Role:All">All Roles</option>
      <option value="Role:Admin">Admin</option>
      <option value="Role:User">User</option>
      <option value="Role:Viewer">Viewer</option>
      <option value="Role:Contributor">Contributor</option>
    </optgroup>
  </select>
</div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssessments.map((assessment, index) => (
          <AssessmentCard
            key={index}
            assessment={assessment}
            onView={(assessment, editing = false) => {
              setSelectedAssessment(assessment);
              setIsEditing(editing);
            }}
          />
        ))}
      </div>

      <Modal
        assessment={selectedAssessment}
        onClose={() => {
          setSelectedAssessment(null);
          setIsEditing(false);
        }}
        onSave={handleSave}
        isEditing={isEditing}
      />
    </div>
  );
};

export default AssessmentsGrid;
