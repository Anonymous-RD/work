import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector and useDispatch
import { createQuestion } from "@/redux/slices/assessmentQuestionsSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";
import {
  fetchClasses,
  fetchSubjects,
  fetchChapters,
  fetchLearnerOutcome,
} from "@/redux/slices/dataSlice"; // Add these imports
import JoditEditor from "jodit-react";
import { Placeholder } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";

const AddAssessmentQuestions = ({ placeholder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    className: "",
    assessmentQuestion: "",
    academicYear: "",
    subjectId: "",
    chapterId: "", // Changed from chapter to chapterId
    learnerOutcomeId: "",
    questionType: "",
    difficultyLevel: "",
    assessmentAnswer: "",
  });

  const [errors, setErrors] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState(""); // State for question content
  const [content1, setContent1] = useState(""); // State for answer content
  const config = useMemo(
    () => ({
      readonly: false, // Jodit options
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );
  const [isBulkAdd, setIsBulkAdd] = useState(false);

  const {
    classes = [],
    subjects = [],
    chapters = [],
    learnerOutcomes = [],
    status,
  } = useSelector((state) => state?.data || {});

  const academicYear = ["2024-2025", "2023-2024", "2022-2023"];
  // const learnerOutcomes = ["6748104066f4648c947d4c33"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const questionType = ["Knowledge", "Understanding","Application"];
  const { setMetadata } = usePageMetadata();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error for the specific field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.academicYear)
      newErrors.academicYear = "Academic Year is required.";
    if (!formData.subjectId) newErrors.subjectId = "Subject is required."; // Changed from formData.subject to formData.subjectId
    if (!formData.learnerOutcomeId)
      newErrors.learnerOutcomeId = "Learner Outcome is required.";
    if (!formData.difficultyLevel)
      newErrors.difficultyLevel = "Difficulty Level is required.";
    if (!formData.chapterId) newErrors.chapterId = "chapter is required.";
    if (!formData.className) newErrors.className = "Class is required.";
    if (!formData.chapterId) newErrors.chapterId = "Chapter is required."; // Changed from chapter to chapterId
    if (!formData.questionType)
      newErrors.questionType = "Question Type is required.";
    if (!content.trim())
      newErrors.assessmentQuestion = "Question content is required.";
    if (!content1.trim())
      newErrors.assessmentAnswer = "Answer content is required.";
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    console.log(" before e ", e);
    e.preventDefault();
    console.log(" after e ", e);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      console.log(" inside e ", e);
      setErrors(formErrors);
      return;
    }
    console.log(" ouside e ", e);

    const questionData = {
      ...formData,
      assessmentQuestion: content,
      assessmentAnswer: content1,
    };

    try {
      console.log("questionData", questionData);
      await dispatch(createQuestion(questionData));
      navigate("/Assessment-Questions");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchClasses()); // Fetch classes
    setMetadata({
      title: "Add Assessment Question",
      backPath: "/Assessment-Questions",
    });
  }, [dispatch, setMetadata]);

  useEffect(() => {
    if (formData.className) {
      dispatch(fetchSubjects(formData.className)); // Fetch subjects when class is selected
    }
  }, [formData.className, dispatch]);

  useEffect(() => {
    if (formData.subjectId) {
      console.log(formData.subjectId);
      dispatch(fetchChapters(formData.subjectId)); // Fetch chapters when subject is selected
    }
  }, [formData.subjectId, dispatch]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        console.log(fileContent); // For now, log the file content
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (formData.chapterId) {
      console.log(formData.chapterId);
      dispatch(fetchLearnerOutcome(formData.chapterId)); // Fetch chapters when subject is selected
    }
  }, [formData.chapterId, dispatch]);

  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl  overflow-y-auto">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
      </div>
      {/* Bulk Add Toggle */}
      <div className="flex items-center mb-8 gap-2.5">
        <label className="text-[20px]  leading-6 font-medium text-[#000000]">
          Bulk Add
        </label>
        <div
          onClick={() => setIsBulkAdd(!isBulkAdd)}
          className={`w-[68px] h-[34px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isBulkAdd ? "bg-lime-300" : "bg-[#EFEFEF]"
          }`}
        >
          <div
            className={`w-6 h-6 pt-1 pl-25 bg-[#D2D2D2] rounded-full shadow-md transform transition-transform duration-300  ${
              isBulkAdd ? "translate-x-8 bg-[#FFF]" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
      {/* Bulk Add Mode */}
      {isBulkAdd ? (
        <div className=" h-[90vh] overflow-y-auto">
          {/* Bulk Upload Form */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center px-11 pt-3 pb-4 max-w-full text-black rounded-xl border border-dashed border-neutral-100 w-[350px] max-md:px-5">
              <img
                loading="lazy"
                src="/cloud-arrow.png"
                alt=""
                className="object-contain aspect-square w-[74px]"
              />
              <div className="mt-3 text-sm font-medium leading-4 text-center w-full">
                Please upload a CSV file to import data in bulk
              </div>
              <label className="text-sm leading-4 text-[#000000] px-12 py-3 mt-3 w-[250px] h-10 bg-[#C8EE44] hover:bg-orange-300 rounded-xl text-center justify-center cursor-pointer">
                Browse File
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <a
              href="/sample.csv"
              download
              className="gap-2.5 py-3 mt-8 text-sm text-[#000] font-medium rounded-lg underline text-center"
              tabIndex="0"
              aria-label="Download sample CSV file"
            >
              Click here to download a sample CSV file
            </a>

            <div className="flex flex-col justify-center mt-8 max-w-full w-[400px]">
              <label
                htmlFor="primaryColumn"
                className="gap-2.5 py-2.5 w-full text-[#1B212D] text-sm font-medium"
              >
                Primary Column(This column will be used to check duplicacy)
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
                <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="mt-8 mb-8">
            <button
              type="submit"
              className="px-14 py-4 mb-8 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto">
          <form
            onSubmit={handleFormSubmit}
            className="space-y-6 w-[100%] min-w-[768px] mb-[100px] overflow-y-auto"
          >
            <div className="flex gap-8 w-[80%] h-full">
              {/* Left Column */}
              <div className="flex flex-col space-y-[30px] flex-1 min-w-[48%]">
                {/* Academic Year */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Academic Year
                  </label>
                  <div className="relative">
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="">Select Academic Year</option>
                    {academicYear.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.academicYear && (
                    <p className="text-red-500 text-sm">
                      {errors.academicYear}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Subject
                  </label>
                  <div className="relative">
                  <select
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                    disabled={!formData.className}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.subjectId && (
                    <p className="text-red-500 text-sm">{errors.subjectId}</p>
                  )}
                </div>

                {/* Learner Outcome */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Learner Outcome
                  </label>
                  <div className="relative">
                  <select
                    name="learnerOutcomeId"
                    value={formData.learnerOutcomeId}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="">Select Learner Outcome</option>
                    {learnerOutcomes.map((lo) => (
                      <option key={lo._id} value={lo._id}>
                        {lo.learnerOutcome}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.learnerOutcomeId && (
                    <p className="text-red-500 text-sm">
                      {errors.learnerOutcomeId}
                    </p>
                  )}
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Difficulty Level
                  </label>
                  <div className="relative">
                  <select
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="">Select Difficulty Level</option>
                    {difficultyLevels.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="text-[#78778B] text-sm font-medium"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.difficultyLevel && (
                    <p className="text-red-500 text-sm">
                      {errors.difficultyLevel}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-[30px] flex-1 min-w-[48%]">
                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Class
                  </label>
                  <div className="relative">
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.className && (
                    <p className="text-red-500 text-sm">{errors.className}</p>
                  )}
                </div>

                {/* Chapter */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Chapter
                  </label>
                  <div className="relative">
                  <select
                    name="chapterId"
                    value={formData.chapterId}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map((chapter) => (
                      <option key={chapter._id} value={chapter._id}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.chapterId && (
                    <p className="text-red-500 text-sm">{errors.chapterId}</p>
                  )}
                </div>

                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Question Type
                  </label>
                  <div className="relative">
                  <select
                    name="questionType"
                    value={formData.questionType}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="">Select Question Type</option>
                    {questionType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.questionType && (
                    <p className="text-red-500 text-sm">
                      {errors.questionType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Question Editor */}
            <div className="w-[80%]">
              <label className="block text-sm font-medium text-[#1b212d]">
                Assessment Question
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onChange={(newContent) => setContent(newContent)}
                tabIndex={1} // Tab index for focus order
              />
              {errors.assessmentQuestion && (
                <p className="text-red-500 text-sm">
                  {errors.assessmentQuestion}
                </p>
              )}
            </div>

            {/* Answer Editor */}
            <div className="w-[80%]">
              <label className="block text-sm font-medium text-[#1b212d]">
                Assessment Answer
              </label>
              <JoditEditor
                ref={editor}
                value={content1}
                config={config}
                onChange={(newContent) => setContent1(newContent)}
                tabIndex={2} // Tab index for focus order
              />
              {errors.assessmentAnswer && (
                <p className="text-red-500 text-sm">
                  {errors.assessmentAnswer}
                </p>
              )}
            </div>
            <div className="my-8">
              <hr className="border-t w-full h-[1px] bg-[#F5F5F5] opacity-[0.5]" />
            </div>

            {/* Submit Button */}
            <div className="mb-[100px] ">
              <button
                type="submit"
                className="px-14 py-4 mb-8 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
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
