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
import { FiPlus } from "react-icons/fi";
import { IoIosSave } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import FormBuilderComponent from "./FormBuilderComponent";

const AddFlnModule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOutcome = location.state?.outcome || null;
  const { setMetadata } = usePageMetadata();

  const [formData, setFormData] = useState({
    moduleName: "",
    module: "Select a Module Type",
    questionType: "",
    questionType2: "",
    questionType3: "",
    difficultyLevel: "",
    difficultyLevel2: "",
    difficultyLevel3: "",
    dropdownValue: "Select", // New dropdown value
    preferences: {
      districtAdmin: false,
      blockAdmin: false,
      schoolAdmin: false,
      mentors: false,
      teachers: false, // New checkbox
    },
  });

  const [preferencesMessages, setPreferencesMessages] = useState({
    districtAdmin: "",
    blockAdmin: "",
    schoolAdmin: "",
    mentors: "",
    teachers: "",
  });

  const [currentCheckbox, setCurrentCheckbox] = useState(""); // To know which checkbox opened the modal

  const [modalOptions, setModalOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const [confirmedPreferences, setConfirmedPreferences] = useState({
    districtAdmin: false,
    blockAdmin: false,
    schoolAdmin: false,
    mentors: false,
    teachers: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  function modalOptionChangeHandler(event) {
    const { name, checked } = event.target;

    setModalOptions((prev) => ({ ...prev, [name]: checked }));
  }

  function changeHandler(event) {
    const { name, checked, type } = event.target;

    if (name in formData.preferences) {
      // Every time the checkbox is clicked, open the modal
      setCurrentCheckbox(name);
      setIsModalOpen(true);

      // Set the modal options based on previously selected options
      const previouslySelectedOptions =
        preferencesMessages[name]?.split(", ") || [];
      setModalOptions({
        option1: previouslySelectedOptions.includes("R"),
        option2: previouslySelectedOptions.includes("W"),
        option3: previouslySelectedOptions.includes("D"),
      });
    } else {
      // Handle regular input fields (like text or email)
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : event.target.value,
      }));
    }
  }

  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const questionType = ["Knowledge", "Skill/understanding", "Application"];
  const questionType2 = ["Knowledge", "Skill/understanding", "Application"];
  const questionType3 = ["Knowledge", "Skill/understanding", "Application"];
  const difficultyLevel = ["Easy", "Medium", "Hard"];
  const difficultyLevel2 = ["Easy", "Medium", "Hard"];
  const difficultyLevel3 = ["Easy", "Medium", "Hard"];

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
    setMetadata({
      title: "Add FLN Module",
      backPath: "/assessment",
    });
  }, [setMetadata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Only extract the necessary fields for submission
    const { chapterId, loCode, learnerOutcome } = formData;
  };

  function submitHandler(event) {
    event.preventDefault();
    console.log("Final Form Data:");
    console.log(formData);
    console.log("Messages for Checkboxes:");
    console.log(preferencesMessages);
  }

  function closeModal() {
    // If no options are selected, uncheck the form checkbox and clear preferences message
    const isAnyOptionSelected = Object.values(modalOptions).some(
      (value) => value === true
    );

    if (!isAnyOptionSelected) {
      // Uncheck the form preference if no option was selected in the modal
      setFormData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, [currentCheckbox]: false },
      }));

      // Clear the preference message for the current checkbox
      setPreferencesMessages((prev) => ({
        ...prev,
        [currentCheckbox]: "",
      }));
    } else {
      // Set the preference to true after modal confirmation if any option is selected
      setFormData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, [currentCheckbox]: true },
      }));

      // Set preference message for the current checkbox based on selected options
      const updatedMessage = Object.keys(modalOptions)
        .filter((key) => modalOptions[key]) // Only checked options
        .map((key) => (key === "option1" ? "R" : key === "option2" ? "W" : "D"))
        .join(", ");

      setPreferencesMessages((prev) => ({
        ...prev,
        [currentCheckbox]: updatedMessage, // Update the message for the current checkbox
      }));

      // Mark this preference as confirmed
      setConfirmedPreferences((prev) => ({
        ...prev,
        [currentCheckbox]: true,
      }));
    }

    // Reset modal options and close it
    setModalOptions({ option1: false, option2: false, option3: false });
    setIsModalOpen(false);
  }

  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl mx-auto overflow-y-auto">
      {/* Submit Button */}
      <div className="flex flex-row-reverse ">
        <button
          type="submit"
          className="flex gap-2 px-8 text-sm py-3  bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
        >
          <IoIosSave size={24} />
          Save
        </button>
      </div>
      <div className="py-4">
        {/* <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" /> */}
      </div>

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
            {/* FLN Module Name, FLN Module Type */}
            <div className="flex  flex-1 space-x-7">
              {/* FLN Module Name*/}
              <div className=" min-w-[48%]">
                <label className="block text-sm font-medium text-[#1b212d]">
                  FLN Module Name
                </label>
                <input
                  type="text"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#A2A2AB]  font-medium "
                  placeholder="Enter a Module Name"
                  required
                />
              </div>

              {/* FLN Module Type */}
              <div className="min-w-[48%] relative">
                <label className="block text-sm font-medium text-[#1b212d]">
                  FLN Module Type
                </label>
                <div className="relative">
                  <select
                    id="module"
                    name="module"
                    value={formData.module} // Make sure this matches the state property
                    onChange={handleInputChange}
                    className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600  text-sm text-[#A2A2AB]  font-medium appearance-none "
                  >
                    <option
                      value="Select Module"
                      className="text-[#A2A2AB] font-medium"
                    >
                      Select a Module Type
                    </option>
                    {/* Default option */}
                    <option value="sassessment">Static Assessment</option>
                    <option value="dassessment">Dynamic Assessment</option>
                  </select>
                  <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Roles</h3>
              <div className="flex gap-2.5">
                {Object.keys(formData.preferences).map((key) => (
                  <div key={key} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name={key}
                        checked={formData.preferences[key]}
                        onChange={changeHandler}
                        className="h-4 w-4 accent-lime-300 border-[AEAEB2] rounded "
                      />
                      <span className="mr-6 ml-2 gap-2 text-gray-700 capitalize">
                        {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                      </span>
                    </label>
                    {/* Display dynamic messages below checkboxes */}
                    {preferencesMessages[key] && (
                      <div className="text-sm text-gray-500 ml-6">
                        {preferencesMessages[key]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-2">
            <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
          </div>

          <div>
            {formData.module === "sassessment" && (
              <div className="mt-0">
                <div>Build Static Assessment Form</div>
                <FormBuilderComponent></FormBuilderComponent>
              </div>
            )}

            {formData.module === "dassessment" && (
              <div>
                <div>
                  <h3 className="text-base font-medium text-[#1B212D]">
                    Question Type Settings
                  </h3>
                  <div className="flex flex-1 space-x-7 mt-8">
                    <div className="min-w-[32%] relative">
                      <label className="block text-sm font-medium text-[#1b212d]">
                        Question Type
                      </label>
                      <div className="relative">
                        <select
                          name="questionType"
                          value={formData.questionType}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select Question Type</option>
                          {Array.from(new Set(questionType)).map(
                            (type, index) => (
                              <option
                                key={`question-type-${index}`}
                                value={type}
                              >
                                {type}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="numberOfQuestions1"
                        className="block text-sm font-medium text-[#1b212d]"
                      >
                        Number of Questions
                      </label>
                      <div className="relative">
                        <select
                          name="numberOfQuestions1"
                          value={formData.numberOfQuestions1}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select</option>
                          {[...Array(10).keys()].map((num) => (
                            <option
                              key={`number-of-questions-${num + 1}`}
                              value={num + 1}
                            >
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 space-x-7 mt-8">
                    <div className="min-w-[32%] relative">
                      <label className="block text-sm font-medium text-[#1b212d]">
                        Question Type
                      </label>
                      <div className="relative">
                        <select
                          name="questionType2"
                          value={formData.questionType2}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select Question Type</option>
                          {Array.from(new Set(questionType2)).map(
                            (level, index) => (
                              <option
                                key={`difficulty-level-${index}`}
                                value={level}
                              >
                                {level}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="numberOfDifficultyQuestions"
                        className="block text-sm font-medium text-[#1b212d]"
                      >
                        Number of Questions
                      </label>
                      <div className="relative">
                        <select
                          name="numberOfQuestions2"
                          value={formData.numberOfQuestions2}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select</option>
                          {[...Array(10).keys()].map((num) => (
                            <option
                              key={`difficulty-questions-${num + 1}`}
                              value={num + 1}
                            >
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 space-x-7 mt-8">
                    <div className="min-w-[32%] relative">
                      <label className="block text-sm font-medium text-[#1b212d]">
                        Question Type
                      </label>
                      <div className="relative">
                        <select
                          name="questionType3"
                          value={formData.questionType3}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select Question Type</option>
                          {Array.from(new Set(questionType3)).map(
                            (level, index) => (
                              <option
                                key={`difficulty-level-${index}`}
                                value={level}
                              >
                                {level}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="numberOfDifficultyQuestions"
                        className="block text-sm font-medium text-[#1b212d]"
                      >
                        Number of Questions
                      </label>
                      <div className="relative">
                        <select
                          name="numberOfQuestions3"
                          value={formData.numberOfQuestions3}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select</option>
                          {[...Array(10).keys()].map((num) => (
                            <option
                              key={`difficulty-questions-${num + 1}`}
                              value={num + 1}
                            >
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
                </div>

                <div>
                  <h3 className="text-base font-medium text-[#1B212D]">
                    Difficulty Settings
                  </h3>
                  <div className="flex flex-1 space-x-7 mt-8">
                    <div className="min-w-[32%]">
                      <label className="block text-sm font-medium text-[#1b212d]">
                        Difficulty Level
                      </label>
                      <div className="relative">
                        <select
                          name="difficultyLevel"
                          value={formData.difficultyLevel}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select Difficulty Type</option>
                          {Array.from(new Set(difficultyLevel)).map(
                            (level, index) => (
                              <option
                                key={`difficulty-level-${index}`}
                                value={level}
                              >
                                {level}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="numberOfDifficultyQuestions"
                        className="block text-sm font-medium text-[#1b212d]"
                      >
                        Number of Questions
                      </label>
                      <div className="relative">
                        <select
                          name="numberOfDifficultyQuestions"
                          value={formData.numberOfDifficultyQuestions}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select</option>
                          {[...Array(10).keys()].map((num) => (
                            <option
                              key={`difficulty-questions-${num + 1}`}
                              value={num + 1}
                            >
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 space-x-7 mt-8">
                    <div className="min-w-[32%]">
                      <label className="block text-sm font-medium text-[#1b212d]">
                        Difficulty Level
                      </label>
                      <div className="relative">
                        <select
                          name="difficultyLevel2"
                          value={formData.difficultyLevel2}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select Difficulty Type</option>
                          {Array.from(new Set(difficultyLevel2)).map(
                            (type, index) => (
                              <option
                                key={`question-type-${index}`}
                                value={type}
                              >
                                {type}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="difficultOfQuestions"
                        className="block text-sm font-medium text-[#1b212d]"
                      >
                        Number of Questions
                      </label>
                      <div className="relative">
                        <select
                          name="difficultOfQuestions"
                          value={formData.difficultOfQuestions}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option
                            value=""
                            className="text-[#78778B] font-medium"
                          >
                            Select
                          </option>
                          {[...Array(10).keys()].map((num) => (
                            <option
                              key={`number-of-questions-${num + 1}`}
                              value={num + 1}
                            >
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 space-x-7 mt-8">
                    <div className="min-w-[32%]">
                      <label className="block text-sm font-medium text-[#1b212d]">
                        Difficulty Level
                      </label>
                      <div className="relative">
                        <select
                          name="difficultyLevel3"
                          value={formData.difficultyLevel3}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="">Select Difficulty Type</option>
                          {Array.from(new Set(difficultyLevel3)).map(
                            (level, index) => (
                              <option
                                key={`difficulty-level-${index}`}
                                value={level}
                              >
                                {level}
                              </option>
                            )
                          )}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="difficultOfQuestions2"
                        className="block text-sm font-medium text-[#1b212d]"
                      >
                        Number of Questions
                      </label>
                      <div className="relative">
                        <select
                          name="difficultOfQuestions2"
                          value={formData.difficultOfQuestions2}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3.5 pr-8 leading-12 border border-[#f5f5f5] rounded-[10px] focus:outline-none focus:border-zinc-600 text-sm text-[#000000] opacity-[0.5] font-medium appearance-none"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {[...Array(10).keys()].map((num) => (
                            <option
                              key={`difficulty-questions-${num + 1}`}
                              value={num + 1}
                            >
                              {num + 1}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute top-1/2 right-4 mt-1 w-3 transform -translate-y-1/2 text-[#000000] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ">
            <div className="bg-white  rounded-[20px] shadow-md w-1/3">
              <h3 className="text-lg pl-6 pt-6 font-medium text-[#000000] mb-4">
                Choose Permission
              </h3>
              <div className="py-4">
                <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
              </div>

              <div className="flex gap-10 pl-6 pb-6">
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="option1"
                      checked={modalOptions.option1}
                      onChange={modalOptionChangeHandler}
                      className="h-5 w-5 accent-lime-300  border-[AEAEB2] rounded "
                    />
                    <span className="ml-2 text-[#2C2C2E]">Read</span>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="option2"
                      checked={modalOptions.option2}
                      onChange={modalOptionChangeHandler}
                      className="h-5 w-5 accent-lime-300  border-[AEAEB2] rounded "
                    />
                    <span className="ml-2 text-[#2C2C2E]">Write</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="option3"
                      checked={modalOptions.option3}
                      onChange={modalOptionChangeHandler}
                      className="h-5 w-5 accent-lime-300  border-[AEAEB2] rounded del"
                    />
                    <span className="ml-2 text-[#2C2C2E]">Delete</span>
                  </label>
                </div>
              </div>

              <div className="pl-6 pb-6">
                <button
                  onClick={closeModal}
                  className="px-14 py-3.5 mb-4 bg-[#C8EE44] text-[#1B212D] font-bold rounded-xl  hover:bg-orange-300"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFlnModule;
