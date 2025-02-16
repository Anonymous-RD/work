import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createQuestion } from "@/redux/slices/assessmentQuestionsSlice";
import { FaArrowLeft } from "react-icons/fa";

const AddAssessmentQuestions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    className: "",
    assessmentQuestion: "",
    academicYear: "",
    subject: "",
    chapter: "",
    learnerOutcomeId: "",
    questionType: "",
    difficultyLevel: "",
  });

  const [isBulkAdd, setIsBulkAdd] = useState(false);

  const academicYear = ["2024-2025", "2023-2024", "2022-2023"];
  const subject = ["Mathematics", "English", "Science"];
  const learnerOutcomes = ["6748104066f4648c947d4c33"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const className = ["Class I", "Class II", "Class III"];
  const chapter = ["Chapter I", "Chapter II", "Chapter III"];
  const questionTypes = ["MCQ", "General"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createQuestion(formData));
      navigate("/admin/Assessment-Questions");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="p-6 max-w-10xl">
      {/* <div className="flex items-center mb-6 gap-5">
        <div>
          <FaArrowLeft
            onClick={() => navigate("/admin/assessment-questions")}
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Add Assesment</h2>
      </div> */}

      {/* Bulk Add Toggle */}
      <div className="flex items-center mb-8">
        <label className="text-2xl font-medium text-gray-700 mr-4">
          Bulk Add
        </label>
        <div
          onClick={() => setIsBulkAdd(!isBulkAdd)}
          className={`relative w-12 h-6 flex-shrink-0 cursor-pointer rounded-full ${
            isBulkAdd ? "bg-lime-300" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
              isBulkAdd ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </div>

      {/* Bulk Add Mode */}
      {isBulkAdd ? (
        <div>
          <div className=" text-xl flex flex-col items-center">
            {/* <label className= "block text-lg font-medium text-gray-700">
     Bulk upload
   </label>
   <input type="file" /> */}
            <div className="flex flex-col items-center px-11 pt-3 pb-4 max-w-full text-black rounded-xl border border-dashed border-neutral-100 w-[350px] max-md:px-5">
              <img
                loading="lazy"
                src="/cloud-arrow.png"
                alt=""
                className="object-contain aspect-square w-[74px]"
              />
              <div className="mt-3 text-center w-full">
                Please upload csv file to import data in bulk
              </div>
              <label className="gap-2.5  px-12 py-2 mt-3 w-[250px] bg-lime-300 rounded-xl min-h-[50px] max-md:px-5 text-center cursor-pointer">
                Browse File
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files[0])} // Replace with your file upload logic
                />
              </label>
            </div>

            <a
              href="/sample.csv"
              download
              className=" gap-2.5  py-3 mt-8 text-black rounded-lg underline text-center"
              tabIndex="0"
              aria-label="Download sample CSV file"
            >
              Click here to download sample CSV file
            </a>

            <div className="flex flex-col justify-center mt-8 max-w-full w-[398px]">
              <label
                htmlFor="primaryColumn"
                className="gap-2.5 py-2.5 w-full text-gray-800 text-sm font-semibold"
              >
                Primary Column (This column will be used to check duplicacy)
              </label>
              <div className="relative">
                <select
                  id="primaryColumn"
                  className="block appearance-none w-full bg-white border border-neutral-100 text-zinc-800 py-3.5 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-gray-500"
                  defaultValue="Block Code"
                >
                  <option value="block">Block Code</option>
                  <option value="district">District Code</option>
                  <option value="state">State Code</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className=" mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold   rounded-xl hover:bg-green-600"
          >
            Add
          </button>
        </div>
      ) : (
        // Single Add Mode
        <div className="h-[600px] overflow-y-auto">
          <form onSubmit={handleFormSubmit} className="space-y-3 w-[80%]">
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
                {/* Academic Year*/}
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Academic Year
                  </label>
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 text-[#78778B] font-medium"
                  >
                    <option value="" className="text-[#78778B] font-medium">
                      Select Academic Year
                    </option>
                    {academicYear.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
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
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600
                     text-[#78778B] font-medium
                    "
                  >
                    <option value="">Select Subject</option>
                    {subject.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Learner Outcome*/}
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Learner Outcome
                  </label>
                  <select
                    name="learnerOutcomeId"
                    value={formData.learnerOutcomeId}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600  text-[#78778B] font-medium"
                  >
                    <option value="">Select</option>
                    {learnerOutcomes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Difficulty Level*/}
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Difficulty Level
                  </label>
                  <select
                    name="difficultyLevel"
                    value={formData.difficultyLevels}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600  text-[#78778B] font-medium"
                  >
                    <option value="">Select Difficulty Level</option>
                    {difficultyLevels.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
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
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600  text-[#78778B] font-medium"
                    required
                    rows="6"
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
                {/* Class*/}
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Class
                  </label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600  text-[#78778B] font-medium"
                  >
                    <option value="">Select Class</option>
                    {className.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Chapter */}
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Select Chapter
                  </label>
                  <select
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600  text-[#78778B] font-medium"
                  >
                    <option value="">Select Chapter</option>
                    {chapter.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Question Type*/}
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Question Type
                  </label>
                  <select
                    name="questionType"
                    value={formData.questionType}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600  text-[#78778B] font-medium"
                  >
                    <option value="">Select Question Type</option>
                    {questionTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] font-medium"
                      >
                        {type}
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
                className="mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300 "
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddAssessmentQuestions;
