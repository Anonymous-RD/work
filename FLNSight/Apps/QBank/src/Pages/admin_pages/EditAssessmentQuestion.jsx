import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateQuestion } from "@/redux/slices/assessmentQuestionsSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";
import {
  fetchClasses,
  fetchSubjects,
  fetchChapters,
  fetchLearnerOutcome,
} from "@/redux/slices/dataSlice";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaChevronDown } from "react-icons/fa";

const EditAssessmentQuestions = ({ placeholder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get the location object

  // Extracting the question data passed from the previous page
  const questionData = location.state?.question || "";

  const [formData, setFormData] = useState({
    className:
      questionData?.learnerOutcomeId?.chapterId?.subjectId?.classId?._id || "",
    assessmentQuestion: questionData?.assessmentQuestion || "",
    academicYear: questionData?.academicYear || "",
    subjectId: questionData?.learnerOutcomeId?.chapterId?.subjectId?._id || "",
    chapterId: questionData?.learnerOutcomeId?.chapterId?._id || "",
    learnerOutcomeId: questionData?.learnerOutcomeId?._id || "",
    questionType: questionData?.questionType || "",
    difficultyLevel: questionData?.difficultyLevel || "",
    assessmentAnswer: questionData?.assessmentAnswer || "",
  });

  const [errors, setErrors] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState(
    questionData?.assessmentQuestion || ""
  ); // State for question content
  const [content1, setContent1] = useState(
    questionData?.assessmentAnswer || ""
  ); // State for answer content
  const config = useMemo(
    () => ({
      readonly: false, // Jodit options
      placeholder: placeholder || "Start typing...",
      height: 300,
    }),
    [placeholder]
  );

  const {
    classes = [],
    subjects = [],
    chapters = [],
    learnerOutcomes = [],
  } = useSelector((state) => state?.data || {});

  const academicYear = ["2024-2025", "2023-2024", "2022-2023"];
  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const questionType = ["Knowledge", "Understanding","Application"];
  const { setMetadata } = usePageMetadata();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "className" && {
        subjectId: "",
        chapterId: "",
        learnerOutcomeId: "",
      }), // Clear related fields if className changes
      ...(name === "subjectId" && { chapterId: "", learnerOutcomeId: "" }), // Clear related fields if subjectId changes
      ...(name === "chapterId" && { learnerOutcomeId: "" }), // Clear learnerOutcomeId if chapterId changes
    }));

    if (name === "className") {
      dispatch(fetchSubjects(value));
    }
    if (name === "subjectId") {
      dispatch(fetchChapters(value));
      console.log("fetchchapters", fetchChapters(value));
    }
    if (name === "chapterId") {
      dispatch(fetchLearnerOutcome(value));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.academicYear)
      newErrors.academicYear = "Academic Year is required.";
    if (!formData.subjectId) newErrors.subjectId = "Subject is required.";
    if (!formData.learnerOutcomeId)
      newErrors.learnerOutcomeId = "Learner Outcome is required.";
    if (!formData.difficultyLevel)
      newErrors.difficultyLevel = "Difficulty Level is required.";
    if (!formData.className) newErrors.className = "Class is required.";
    if (!formData.chapterId) newErrors.chapterId = "Chapter is required.";
    if (!formData.questionType)
      newErrors.questionType = "Question Type is required.";
    if (!content.trim())
      newErrors.assessmentQuestion = "Question content is required.";
    if (!content1.trim())
      newErrors.assessmentAnswer = "Answer content is required.";
    return newErrors;
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const updatedQuestionData = {
      ...formData,
      assessmentQuestion: content,
      assessmentAnswer: content1,
    };

    try {
      dispatch(
        updateQuestion({
          id: questionData._id,
          updatedData: updatedQuestionData,
        })
      );
      console.log("updatedQuestionData", updatedQuestionData);
      navigate("/Assessment-Questions");
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  // Initial fetch for dropdown values
  useEffect(() => {
    dispatch(fetchClasses());
    setMetadata({
      title: "Edit Assessment Question",
      backPath: "/Assessment-Questions",
    });

    // Prefetch data for dropdowns based on the initial form values
    if (formData.className) {
      dispatch(fetchSubjects(formData.className));
    }
    if (formData.subjectId) {
      dispatch(fetchChapters(formData.subjectId));
    }
    console.log("object", formData.chapterId);
    if (formData.chapterId) {
      dispatch(fetchLearnerOutcome(formData.chapterId));
    }
  }, [
    dispatch,
    formData.className,
    formData.subjectId,
    formData.chapterId,
    formData.learnerOutcomeId,
    setMetadata,
  ]);

  return (
    <>
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5] opacity-[0.5]" />
      </div>
      <Scrollbars>
        <form onSubmit={handleFormSubmit} className="space-y-3 w-[100%]">
          <div className="flex gap-8 w-[80%]">
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
                    value={formData.academicYear || "default"}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="default" disabled>
                      Select Academic Year
                    </option>
                    {academicYear.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                </div>
                {errors.academicYear && (
                  <p className="text-red-500 text-sm">{errors.academicYear}</p>
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
                  >
                    <option value="" disabled>
                      Select Subject
                    </option>
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
                    <option value="" disabled>
                      Select Learner Outcome
                    </option>
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
                    value={formData.difficultyLevel || "default"}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="default" disabled>
                      Select Difficulty Level
                    </option>
                    {difficultyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
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
                    <option value="" disabled>
                      Select Class
                    </option>
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
                    <option value="" disabled>
                      Select Chapter
                    </option>
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
                    value={formData.questionType || "default"}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium appearance-none"
                  >
                    <option value="default" disabled>
                      Select Question Type
                    </option>
                    {questionType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                </div>
                {errors.questionType && (
                  <p className="text-red-500 text-sm">{errors.questionType}</p>
                )}
              </div>
            </div>
          </div>
          {/* Question Content */}
          <div className="w-[80%]">
            <label className="block text-sm font-medium text-[#1b212d]">
              Question
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={(newContent) => setContent(newContent)}
              className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium"
            />
            {errors.assessmentQuestion && (
              <p className="text-red-500 text-sm">
                {errors.assessmentQuestion}
              </p>
            )}
          </div>

          {/* Answer Content */}
          <div className="w-[80%]">
            <label className="block text-sm font-medium text-[#1b212d]">
              Answer
            </label>
            <JoditEditor
              ref={editor}
              value={content1}
              config={config}
              onChange={(newContent1) => setContent1(newContent1)}
              className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium"
            />
            {errors.assessmentAnswer && (
              <p className="text-red-500 text-sm">{errors.assessmentAnswer}</p>
            )}
          </div>
          <div className="my-8">
            <hr className="border-t w-full h-[1px] bg-[#F5F5F5] opacity-[0.5]" />
          </div>
          <button
            type="submit"
            className="px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
          >
            Update
          </button>
        </form>
      </Scrollbars>
    </>
  );
};

export default EditAssessmentQuestions;
