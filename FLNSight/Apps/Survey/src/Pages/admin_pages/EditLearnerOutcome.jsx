import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  fetchSubjects,
  fetchChapters,
} from "@/redux/slices/dataSlice";
import { updateLearningOutcome } from "@/redux/slices/LearnenrOutcomeSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";

const EditLearningOutcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOutcome = location.state?.outcome || null; // Getting the outcome from location
  const { setMetadata } = usePageMetadata();

  // State to handle form data and validation errors
  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    chapterId: "",
    loCode: "",
    learnerOutcome: "",
  });
  const [errors, setErrors] = useState({});

  // Fetching data (classes, subjects, and chapters) from Redux
  const { classes = [], subjects = [], chapters = [], status } = useSelector((state) => state?.data || {});

  useEffect(() => {
    // Fetch classes when the component is mounted
    dispatch(fetchClasses());
  }, [dispatch]);
  console.log("currentOutcome", currentOutcome);

  useEffect(() => {
    // Fetch subjects when className changes
    if (formData.className) {
      dispatch(fetchSubjects(formData.className));
    }
  }, [formData.className, dispatch]);

  useEffect(() => {
    // Fetch chapters when subjectId changes
    if (formData.subjectId) {
      dispatch(fetchChapters(formData.subjectId));
    }
  }, [formData.subjectId, dispatch]);

  // Populate form data if editing an existing outcome
  useEffect(() => {
    if (currentOutcome) {
      setFormData({
        className: currentOutcome?.chapterId?.subjectId?.classId?._id || "",
        subjectId: currentOutcome?.chapterId?.subjectId?._id || "",
        chapterId: currentOutcome?.name || "",
        loCode: currentOutcome.loCode || "",
        learnerOutcome: currentOutcome.learnerOutcome || "",
      });
    }
  }, [currentOutcome]);

  useEffect(() => {
    setMetadata({
      title: "Edit Learner Outcome",
      backPath: "/Learner-Outcomes",
    });
  }, [setMetadata]);

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

  // Validate the form before submitting
  const validateForm = () => {
    let validationErrors = {};

    if (!formData.className) validationErrors.className = "Class is required.";
    if (!formData.subjectId) validationErrors.subjectId = "Subject is required.";
    if (!formData.chapterId) validationErrors.chapterId = "Chapter is required.";
    if (!formData.loCode) validationErrors.loCode = "LO Code is required.";
    if (!formData.learnerOutcome) validationErrors.learnerOutcome = "Learner Outcome is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      await dispatch(
        updateLearningOutcome({
          id: currentOutcome._id, // Current outcome's ID
          updatedData: formData, // Form data to be updated
        })
      );
      navigate("/Learner-Outcomes"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating outcome:", error);
    }
  };
  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl mx-auto overflow-y-auto overflow-x-auto">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
      </div>
      {/* Form for editing learner outcome */}
      <div className="overflow-y-auto max-h-[80vh] pr-4 overflow-x-auto">
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6 w-[100%] min-w-[768px]"
        >
          <div className="flex gap-8 w-[80%]">
            {/* First Div: Class, Chapter, LO Code */}
            <div className="flex flex-col space-y-[30px] flex-1 min-w-[48%]">
              {/* Class Name */}
              <div>
                <label className="block text-sm font-medium text-[#1b212d]">
                  Class
                </label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium"
                >
                  <option value="" className="text-[#78778B] font-medium">
                    Select Class
                  </option>
                  {classes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.className && (
                  <span className="text-red-500">{errors.className}</span>
                )}
              </div>

              {/* Chapter */}
              <div>
                <label className="block text-sm font-medium text-[#1b212d]">
                  Chapter
                </label>
                <select
                  name="chapterId"
                  value={formData.chapterId}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium"
                >
                  <option value="" className="text-[#78778B] font-medium">
                    Select Chapter
                  </option>
                  {chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.name}
                    </option>
                  ))}
                </select>
                {errors.chapterId && (
                  <span className="text-red-500">{errors.chapterId}</span>
                )}
              </div>

              {/* LO Code */}
              <div>
                <label className="block text-sm font-medium text-[#1b212d]">
                  LO Code
                </label>
                <input
                  type="text"
                  name="loCode"
                  value={formData.loCode}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm font-medium"
                  placeholder="Enter LO Code"
                />
                {errors.loCode && (
                  <span className="text-red-500">{errors.loCode}</span>
                )}
              </div>
            </div>

            {/* Second Div: Subject, Learner Outcome */}
            <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-[#1b212d]">
                  Subject
                </label>
                <select
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#78778B] font-medium"
                >
                  <option value="" className="text-[#78778B] font-medium">
                    Select Subject
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {errors.subjectId && (
                  <span className="text-red-500">{errors.subjectId}</span>
                )}
              </div>

              {/* Learner Outcome */}
              <div>
                <label className="block text-sm font-medium text-[#1b212d]">
                  Learner Outcome
                </label>
                <textarea
                  name="learnerOutcome"
                  value={formData.learnerOutcome}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 text-[#78778B] font-medium"
                  rows={6}
                  placeholder="Enter Learner Outcome"
                />
                {errors.learnerOutcome && (
                  <span className="text-red-500">{errors.learnerOutcome}</span>
                )}
              </div>
            </div>
          </div>

          <div className="my-8">
            <hr className="border-t mt-8 w-full h-[1px] bg-[#F5F5F5] opacity-[0.5]" />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="px-14 py-4 mb-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLearningOutcome;
