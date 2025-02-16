import React, { useState, useEffect } from "react";

const EditQuestionModal = ({
  showForm,
  setShowForm,
  currentQuestion,
  roles,
  setRoles,
  handleFormSubmit,
  handleRoleChange,
  error,
}) => {
  const learnerOutcomes = ["6748104066f4648c947d4c33"]; // Example
  const questionTypes = ["MCQ", "Short Answer", "Essay"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const closeModal = () => setShowForm(false);

  return (
    showForm && (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
        onClick={closeModal}
      >
        <div
          className="bg-white p-6 rounded-lg w-96"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl mb-4 text-center">
            {currentQuestion ? "Edit" : "Add"} Question
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Assessment Question
              </label>
              <input
                type="text"
                name="assessmentQuestion"
                defaultValue={currentQuestion?.assessmentQuestion || ""}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Academic Year
              </label>
              <input
                type="text"
                name="academicYear"
                defaultValue={currentQuestion?.academicYear || ""}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Learner Outcome */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Learner Outcome
              </label>
              <select
                name="learnerOutcomeId"
                defaultValue={currentQuestion?.learnerOutcomeId || ""}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Learner Outcome</option>
                {learnerOutcomes.map((lo) => (
                  <option key={lo} value={lo}>
                    {lo}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Question Type
              </label>
              <select
                name="questionType"
                defaultValue={currentQuestion?.questionType || ""}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Question Type</option>
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                name="difficultyLevel"
                defaultValue={currentQuestion?.difficultyLevel || ""}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Difficulty Level</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Roles */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Roles</h3>
              {["admin", "Teacher", "Student"].map((role) => (
                <div key={role} className="mt-2">
                  <div className="text-sm font-medium text-gray-700">
                    {role}
                  </div>
                  {["View", "Edit", "Create", "Delete"].map((permission) => (
                    <div key={permission} className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        checked={roles[role]?.includes(permission) || false}
                        onChange={() => handleRoleChange(role, permission)}
                        className="mr-2"
                      />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditQuestionModal;
