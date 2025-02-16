import React from "react";

const QuestionForm = ({
  currentQuestion,
  roles,
  setRoles,
  setShowForm,
  error,
  setError,
  handleFormSubmit,
}) => {
  const learnerOutcomes = ["6748104066f4648c947d4c33"];
  const questionTypes = ["MCQ", "Short Answer", "Essay"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];

  const handleRoleChange = (role, permission) => {
    setRoles((prevRoles) => {
      const updatedRoles = { ...prevRoles };
      const existingPermissions = updatedRoles[role] || [];

      if (existingPermissions.includes(permission)) {
        updatedRoles[role] = existingPermissions.filter(
          (p) => p !== permission
        );
        if (updatedRoles[role].length === 0) delete updatedRoles[role];
      } else {
        updatedRoles[role] = [...existingPermissions, permission];
      }
      return updatedRoles;
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {currentQuestion ? "Edit Question" : "Add New Question"}
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Question</label>
            <textarea
              name="assessmentQuestion"
              defaultValue={
                currentQuestion ? currentQuestion.assessmentQuestion : ""
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Question Type</label>
            <select
              name="questionType"
              defaultValue={currentQuestion ? currentQuestion.questionType : ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              {questionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Difficulty Level</label>
            <select
              name="difficultyLevel"
              defaultValue={
                currentQuestion ? currentQuestion.difficultyLevel : ""
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Roles</label>
            <div className="flex flex-wrap">
              {["Admin", "User", "Guest"].map((role) => (
                <div key={role} className="mr-4 mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={roles[role] || []}
                    onChange={() => handleRoleChange(role, "read")}
                    id={role}
                  />
                  <label htmlFor={role} className="ml-2">
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              {currentQuestion ? "Save Changes" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
