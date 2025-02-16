import React, { useState, useEffect, useRef } from "react";
import { assessments } from "@/data/AssessmentData";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import AssessmentCard from "@/components/admin/AssessmentCard";

// Modal for Checkbox Interaction
const CheckboxModal = ({ isVisible, role, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[12px] shadow-lg p-6 w-11/12 max-w-lg max-h-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">Choose Permission</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-2 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>
        {/* <p className="text-gray-700">
          You selected the role: <strong>{role}</strong>.
        </p> */}

        <div className="flex flex-wrap gap-2">
          {["Read", "Write", "Delete"].map((permission) => (
            <label key={permission} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="permission" // Same name for grouping
                value={permission}
                onChange={(e) => {
                  const updatedPermissions = e.target.checked
                    ? [...formData.permission, permission] // Add role if checked
                    : formData.permission.filter((r) => r !== permission); // Remove role if unchecked
                  setFormData({ ...formData, permission: updatedPermissions });
                }}
                className="h-4 w-4 text-lime-400 border-gray-300 rounded focus:ring-lime-400 checked:bg-lime-400"
              />
              <span className="text-gray-800">{permission}</span>
            </label>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2  bg-lime-400 rounded-[16px] hover:bg-lime-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Modal Component
const Modal = ({ assessment, onClose, onSave, isEditing }) => {
  const [formData, setFormData] = useState(assessment || {});
  const [isCheckboxModalVisible, setCheckboxModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (assessment) setFormData(assessment);
  }, [assessment]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "role") {
      const updatedRoles = checked
        ? [...formData.role, value]
        : formData.role.filter((role) => role !== value);

      setFormData({ ...formData, role: updatedRoles });
      setSelectedRole(value); // Set the clicked role
      setCheckboxModalVisible(true); // Show the modal
    } else {
      setFormData({ ...formData, [name]: value  });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!assessment) return null;

  return (
    <div>
      <CheckboxModal
        isVisible={isCheckboxModalVisible}
        role={selectedRole}
        onClose={() => setCheckboxModalVisible(false)}
      />
      <div className="fixed inset-0 bg-gray-800 bg-opacity-5 flex justify-center items-center z-40">
        <div className="bg-white rounded-[12px] shadow-lg p-6 w-11/12 max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isEditing ? "Edit Assessment" : formData.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 p-2 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              <RiCloseLine className="text-lg" />
            </button>
          </div>
          {isEditing && (
            <>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">FLN Monitor Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 pr-4 text-gray-800 placeholder-gray-400 rounded-[12px] focus:outline-none focus:ring-1 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Roles</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "District Admin",
                    "Block Admin",
                    "School Admin",
                    "Mentors",
                    "Teachers",
                  ].map((role) => (
                    <label key={role} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="role"
                        value={role}
                        checked={formData.role.includes(role)}
                        onChange={handleChange}
                        className="h-4 w-4 text-lime-400 border-gray-300 rounded focus:ring-lime-400"
                      />
                      <span className="text-gray-800">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="mt-4">
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-lime-400 text-white rounded-[12px] hover:bg-lime-500 mr-2"
              >
                Add
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-[12px] hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// AssessmentsGrid Component
const AssessmentsGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleAddNewAssessment = () => {
    const newAssessment = {
      name: "",
      submissions: '',
      role: [],
      status: "Draft",
    };
    setSelectedAssessment(newAssessment);
    setIsEditing(true);
  };

  // const filteredAssessments = assessments.filter((assessment) =>
  //   assessment.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  // );

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      assessment.submissions.toString().includes(debouncedQuery) ||
      assessment.role.toLowerCase().includes(debouncedQuery);

    const matchesStatus =
      selectedStatus === "All Status" || assessment.status === selectedStatus;
    const matchesRole =
      selectedRole === "All Roles" || assessment.role === selectedRole;

    return matchesSearch && matchesStatus && matchesRole;
  });
  return (
    <div className="p-6 pt-0">
      {selectedAssessment ? (
        <Modal
          assessment={selectedAssessment}
          onClose={() => {
            setSelectedAssessment(null);
            setIsEditing(false);
          }}
          onSave={(updatedAssessment) => {
            if (isEditing && !selectedAssessment.name) {
              assessments.push(updatedAssessment);
            } else {
              const index = assessments.findIndex(
                (item) => item.name === selectedAssessment.name
              );
              if (index !== -1) {
                assessments[index] = updatedAssessment;
              }
            }
          }}
          isEditing={isEditing}
        />
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="font-semibold text-2xl">FLN Monitoring</h2>
          </div>
          <div className="flex justify-between items-center mb-4 space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
                onClick={handleIconClick}
                />
              <input
                type="text"
                placeholder="Search Assessments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[208px] sm:h-[40px] border border-gray-300 rounded-2xl pl-12 pr-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out"
              />
            </div>
            {/* Filter Dropdowns */}
            <div className="flex space-x-4">
              {/* Add New FLN Set Button */}
              <div
                onClick={handleAddNewAssessment}
                className="relative w-[180px] px-2 bg-lime-400 gap-1 flex items-center border rounded-[10px] cursor-pointer"
              >
                <MdAdd className="font-bold text-2xl" />
                <button className="font-semibold text-base">
                  Add New FLN Set
                </button>
              </div>
              {/* Status Filter */}
              <div className="relative w-[140px] flex">
                <IoFilter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full sm:w-[160px] sm:h-[40px] border border-gray-300 rounded-2xl pl-4 pr-2 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out appearance-none"
                >
                  <option value="All Status">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssessments.map((assessment, index) => (
              <AssessmentCard
                key={index}
                assessment={assessment}
                onView={(selected, editing) => {
                  setSelectedAssessment(selected);
                  setIsEditing(editing);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentsGrid;
