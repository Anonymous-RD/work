import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import {
  updateQuestion,
  fetchQuestions,
} from "@/redux/slices/assessmentQuestionsSlice";

const EditAssessmentQuestion = () => {
  const { id } = useParams(); // Extract ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions } = useSelector((state) => state.assessmentQuestions);
  const questionToEdit = questions.find((question) => question._id === id);

  const [formData, setFormData] = useState({
    class: "",
    assessmentQuestion: "",
    academicYear: "",
    subject: "",
    chapter: "",
    learnerOutcomeId: "",
    questionType: "",
    difficultyLevel: "",
  });

  const learnerOutcomes = ["6748104066f4648c947d4c33"];
  const questionTypes = ["MCQ", "General"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const className = ["Class I", "Class II", "Class III"];
  const chapterName = ["Chapter I", "Chapter II", "Chapter III"];
  const subjectName = ["Hindi", "English", "Science"];

  // Pre-fill the form with existing question data
  useEffect(() => {
    if (!questionToEdit) {
      dispatch(fetchQuestions()); // Fetch questions if not already in the store
    } else {
      setFormData({
        assessmentQuestion: questionToEdit.assessmentQuestion || "",
        academicYear: questionToEdit.academicYear || "",
        learnerOutcomeId: questionToEdit.learnerOutcomeId || "",
        questionType: questionToEdit.questionType || "",
        difficultyLevel: questionToEdit.difficultyLevel || "",
      });
    }
  }, [questionToEdit, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateQuestion({ id, updatedData: formData }));
      navigate("/admin/Assessment-Questions");
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  if (!questionToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-10xl">
      {/* <div className="flex items-center mb-6 gap-5">
        <div>
          <FaArrowLeft
            onClick={() => navigate("/admin/Assessment-Questions")}
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Edit Assessment Question
        </h2>
      </div> */}
      <div className="h-[600px] overflow-y-auto">
        <form onSubmit={handleFormSubmit} className="space-y-3 w-[80%]">
          <div className="flex flex-wrap gap-8">
            {/*Academic Year, Subject , Learner Outcome ,Difficulty Level*/}
            <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
              {/* Academic Year*/}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Academic Year
                </label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                  placeholder="Enter Academic Year"
                />
              </div>
              {/* Subject */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Select Class</option>
                  {subjectName.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learner Outcome */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Learner Outcome
                </label>
                <select
                  name="learnerOutcomeId"
                  value={formData.learnerOutcomeId}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Select Learner Outcome</option>
                  {learnerOutcomes.map((lo) => (
                    <option key={lo} value={lo}>
                      {lo}
                    </option>
                  ))}
                </select>
              </div>
              {/* Difficulty Level */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Select Difficulty Level</option>
                  {difficultyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learner Outcome */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Question
                </label>
                <textarea
                  name="assessmentQuestion"
                  value={formData.assessmentQuestion}
                  onChange={handleInputChange}
                  placeholder="Type Question here"
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#000000] placeholder:font-medium"
                  required
                  rows="6"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                ></textarea>
              </div>
            </div>
            {/*Class, Chapter , Question Type , */}
            <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
              {/* Class */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Class
                </label>
                <select
                  name="difficultyLevel"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Select Class</option>
                  {className.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              {/* Chapter */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Chapter
                </label>
                <select
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Select Chapter</option>
                  {chapterName.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              {/* Question Type */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Question Type
                </label>
                <select
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                >
                  <option value="">Select Question Type</option>
                  {questionTypes.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div>
            <button
              type="submit"
              className=" mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssessmentQuestion;
