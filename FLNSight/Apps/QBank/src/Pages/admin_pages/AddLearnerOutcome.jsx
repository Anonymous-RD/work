import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  fetchSubjects,
  fetchChapters,
} from "@/redux/slices/dataSlice";
import {
  createLearningOutcome,
  updateLearningOutcome,
} from "@/redux/slices/LearnenrOutcomeSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { FaChevronDown } from "react-icons/fa";

const AddLearnerOutcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOutcome = location.state?.outcome || null;
  const { setMetadata } = usePageMetadata();

  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    chapterId: "",
    loCode: "",
    learnerOutcome: "",
  });

  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [errors, setErrors] = useState({}); // State for form validation errors

  // Access Redux state for classes, subjects, and chapters
  const {
    classes = [],
    subjects = [],
    chapters = [],
    status,
  } = useSelector((state) => state?.data || {});

  useEffect(() => {
    // Fetch classes when the component is mounted
    dispatch(fetchClasses());
  }, [dispatch]);

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

  useEffect(() => {
    if (currentOutcome) {
      setFormData({
        className: currentOutcome.className || "",
        subjectId: currentOutcome.subjectId || "",
        chapterId: currentOutcome.chapter || "",
        loCode: currentOutcome.loCode || "",
        learnerOutcome: currentOutcome.learnerOutcome || "",
      });
    }
  }, [currentOutcome]);

  useEffect(() => {
    setMetadata({
      title: "Add Learner Outcome",
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

  // const validateForm = () => {
  //   let validationErrors = {};

  //   if (!formData.className) validationErrors.className = "Class is required.";
  //   if (!formData.subjectId)
  //     validationErrors.subjectId = "Subject is required.";
  //   if (!formData.chapterId)
  //     validationErrors.chapterId = "Chapter is required.";
  //   if (!formData.loCode) validationErrors.loCode = "LO Code is required.";
  //   if (!formData.learnerOutcome)
  //     validationErrors.learnerOutcome = "Learner Outcome is required.";

  //   setErrors(validationErrors);
  //   return Object.keys(validationErrors).length === 0; // Returns true if no errors
  // };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Only extract the necessary fields for submission
    const { chapterId, loCode, learnerOutcome } = formData;

    // Construct the payload to send to the backend
    const payload = {
      chapterId, // This comes from formData or might be empty
      loCode, // This comes from formData
      learnerOutcome, // This comes from formData
    };

    // Check if required fields are present
    if (chapterId && loCode && learnerOutcome) {
      try {
        // Check if currentOutcome exists (for update scenario)
        if (currentOutcome) {
          // Update existing learner outcome
          await dispatch(
            updateLearningOutcome({
              id: currentOutcome._id, // Assuming _id exists on currentOutcome
              updatedData: payload, // Send only the necessary fields
            })
          );
        } else {
          // Create new learner outcome
          await dispatch(createLearningOutcome(payload));
        }

        // Redirect to learner outcomes page after success
        navigate("/Learner-Outcomes");
      } catch (error) {
        console.error("Error saving outcome:", error);
      }
    } else {
      // Handle case where any required field is missing
      console.error("Please fill in all required fields.");
      setErrors({
        chapterId: !chapterId ? "Chapter is required." : "",
        loCode: !loCode ? "LO Code is required." : "",
        learnerOutcome: !learnerOutcome ? "Learner Outcome is required." : "",
      });
    }
  };

  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl  overflow-y-auto">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
      </div>
      <div className="flex items-center mb-8 gap-2.5">
        <label className="text-[20px] leading-6 font-medium text-[#000000]">
          Bulk Add
        </label>
        <div
          onClick={() => setShowForm((prev) => !prev)} // Toggle visibility
          className={`w-[68px] h-[34px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            showForm ? "bg-lime-300" : "bg-[#EFEFEF]"
          }`}
        >
          <div
            className={`w-6 h-6 pt-1 pl-25 bg-[#D2D2D2] rounded-full shadow-md transform transition-transform duration-300 ${
              showForm ? "translate-x-8 && bg-[#FFF]" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Conditional Rendering */}
      {showForm ? (
        <div className="overflow-y-auto mb-[100px]">
          {/* Bulk Upload Form */}
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center px-11 pt-3 pb-4 max-w-full text-black rounded-xl border border-dashed border-neutral-100 w-[350px] max-md:px-5">
              <img
                loading="lazy"
                src="/cloud-arrow.png"
                alt="upload"
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
              className="gap-2.5 py-3 mt-8 text-[#1B212D] text-sm font-medium rounded-lg underline text-center"
              tabIndex="0"
              aria-label="Download sample CSV file"
            >
              Click here to download a sample CSV file
            </a>

            <div className="flex flex-col justify-center mt-8 max-w-full w-[406px]">
              <label
                htmlFor="primaryColumn"
                className="gap-2.5 py-2.5 w-full text-[#1B212D] text-sm font-medium "
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
                <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 px-14 mb-8 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
          >
            Add
          </button>
        </div>
      ) : (
        <div
          className="overflow-y-auto max-h-[80vh] pr-4 overflow-x-auto"
          // style={{
          //   scrollbarWidth: "none", // For Firefox
          //   msOverflowStyle: "none", // For IE and Edge
          // }}
        >
          <form
            onSubmit={handleFormSubmit}
            className="space-y-6 w-[100%] min-w-[1024px] pb-[100px]"
          >
            <div className="flex gap-8 w-[80%]">
              {/* First Div: Class, Chapter, LO Code */}
              <div className="flex flex-col space-y-[30px] flex-1 min-w-[48%]">
                {/* Class Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Class
                  </label>
                  <div className="relative">
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium appearance-none"
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
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
                  {errors.className && (
                    <span className="text-red-500">{errors.className}</span>
                  )}
                </div>
                {/* Chapter */}
                <div>
                  <label className="block text-sm font-medium text-[#1b212d]">
                    Chapter
                  </label>
                  <div className="relative">
                  <select
                    name="chapterId" // Change from 'chapter' to 'chapterId'
                    value={formData.chapterId} // Make sure this matches the state property
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium appearance-none "
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
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>

                  {errors.chapter && (
                    <span className="text-red-500">{errors.chapter}</span>
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
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium "
                    // className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium "
                    // className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm font-medium"
                    placeholder="Enter LO Code"
                    required
                  />
                  {errors.loCode && (
                    <span className="text-red-500">{errors.loCode}</span>
                  )}
                </div>
              </div>

              {/* Second Div: Subject, Chapter, Learner Outcome */}
              <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
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
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium appearance-none "
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
                  <FaChevronDown className="absolute top-1/2 right-6 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                  </div>
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
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#78778B]  font-medium "
                    // className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm font-medium"
                    rows={6}
                    placeholder="Enter Learner Outcome"
                  />
                  {errors.learnerOutcome && (
                    <span className="text-red-500">
                      {errors.learnerOutcome}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="my-8">
              <hr className="border-t w-full h-[1px] bg-[#F5F5F5] opacity-[0.5]" />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-14 py-4 mb-4 text-black font-bold rounded-xl bg-[#C8EE44] hover:bg-orange-300"
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

export default AddLearnerOutcome;
