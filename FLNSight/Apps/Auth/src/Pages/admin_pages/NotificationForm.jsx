import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { usePageMetadata } from "../../context/PageMetadataContext";
import { FiPlus } from "react-icons/fi";
import { IoIosSave } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

const NotificationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOutcome = location.state?.outcome || null;
  const { setMetadata } = usePageMetadata();
  const scopeOptions = {
    districts: ["District A", "District B", "District C"],
    blocks: ["Block A", "Block B", "Block C"],
    schools: ["School A", "School B", "School C"],
  };

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

  //   useEffect(() => {
  //     // Fetch classes when the component is mounted
  //     dispatch(fetchClasses());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     // Fetch subjects when className changes
  //     if (formData.className) {
  //       dispatch(fetchSubjects(formData.className));
  //     }
  //   }, [formData.className, dispatch]);

  //   useEffect(() => {
  //     // Fetch chapters when subjectId changes
  //     if (formData.subjectId) {
  //       dispatch(fetchChapters(formData.subjectId));
  //     }
  //   }, [formData.subjectId, dispatch]);

  //   useEffect(() => {
  //     setMetadata({
  //       title: "Add FLN Module",
  //       backPath: "/assessment",
  //     });
  //   }, [setMetadata]);

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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItems, setSelectedItems] = useState({
    districts: [],
    blocks: [],
    schools: [],
  });

  const data = {
    districts: ["District A", "District B", "District C"],
    blocks: ["Block A", "Block B", "Block C"],
    schools: ["School A", "School B", "School C"],
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleCheckboxChange = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const renderDropdown = (title, category) => (
    <div className="flex flex-col flex-1">
      <button
        onClick={() => toggleDropdown(category)}
        className="flex overflow-hidden gap-10 justify-between items-center py-3 pr-5 pl-6 rounded-xl border border-solid border-neutral-100 min-h-[48px] max-md:pl-5"
        aria-expanded={openDropdown === category}
        aria-haspopup="true"
      >
        <div className="self-stretch my-auto text-sm font-medium text-gray-500">
          {title}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/c80642a896b0373037748e63576c3299fed711e43fbeaf93b312531d734455ed?apiKey=40e410915e3b45fca05820790b4d2e7d&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
      </button>
      {openDropdown === category && (
        <div className="flex overflow-hidden flex-col flex-1 mt-1.5 bg-white rounded-lg shadow-sm">
          {data[category].map((item, index) => (
            <React.Fragment key={item}>
              <div className="flex gap-2.5 justify-center items-center px-2 py-2 w-full">
                <input
                  type="checkbox"
                  id={`${category}-${index}`}
                  checked={selectedItems[category].includes(item)}
                  onChange={() => handleCheckboxChange(category, item)}
                  className="w-3.5 h-3.5 rounded border border-solid border-zinc-400"
                />
                <label
                  htmlFor={`${category}-${index}`}
                  className="flex-1 shrink self-stretch my-auto basis-0 text-xs"
                >
                  {item}
                </label>
              </div>
              {index < data[category].length - 1 && (
                <div className="w-full border border-solid border-neutral-100 min-h-[1px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl mx-auto overflow-y-auto w-full">
      {/* Submit Button */}

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
          //   onSubmit={handleFormSubmit}
          className="flex flex-wrap gap-5 items-start"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col min-w-[240px] w-[826px] max-md:max-w-full">
            <div className="flex flex-wrap gap-8 text-sm font-medium">
              <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit">
                <label
                  htmlFor="notificationTitle"
                  className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
                >
                  Title
                </label>
                <input
                  id="notificationTitle"
                  type="text"
                  placeholder="Enter Notification Title"
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Notification Title"
                />
              </div>
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
                <div className="flex flex-col justify-center w-full max-w-[398px]">
                  <label
                    htmlFor="notificationMessage"
                    className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
                  >
                    Message
                  </label>
                  <input
                    id="notificationMessage"
                    placeholder="Enter a Notification Message"
                    className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label="Notification Message"
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 mt-5 h-px border border-solid border-neutral-100 max-md:max-w-full" />
            <div className="flex flex-col rounded-none max-w-[826px]">
              <div className="flex flex-wrap gap-5 w-full max-md:max-w-full">
                {renderDropdown("Select District", "districts")}
                {renderDropdown("Select Block", "blocks")}
                {renderDropdown("Select School", "schools")}
              </div>
            </div>

            {/* <div className="flex flex-col justify-center mt-5 w-full text-sm font-medium max-md:max-w-full">
              <div className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap max-md:max-w-full">
                Scope
              </div>
              <div className="flex relative gap-5 items-start w-full text-gray-500 max-md:max-w-full">
                {["district", "block", "school"].map((type) => (
                  <select
                    key={type}
                    className="flex overflow-hidden z-0 flex-1 shrink gap-10 justify-between items-center py-3 pr-5 pl-6 rounded-xl border border-solid basis-0 border-neutral-100 min-h-[48px] min-w-[240px] max-md:pl-5"
                    aria-label={`Select ${type}`}
                  >
                    <option value="">{`Select ${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    }`}</option>
                    {scopeOptions[`${type}s`].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            </div> */}

            {/* Roles Section */}
            {/* <div className="flex flex-col justify-center mt-32 w-full max-md:mt-10 max-md:max-w-full">
              <div className="gap-2.5 py-2.5 pr-2.5 max-w-full text-sm font-medium text-gray-800 whitespace-nowrap min-h-[36px] w-[398px]">
                Roles
              </div>
              <div className="flex flex-wrap gap-10 items-start mt-2 w-full max-md:max-w-full">
                {roles.map((role) => (
                  <div key={role.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id={role.id}
                      checked={selectedRoles[role.id]} // Control checkbox with state
                      onChange={() => handleRoleChange(role.id)} // Toggle role selection
                      className="w-5 h-5 rounded border border-solid border-zinc-400"
                      aria-label={role.label}
                    />
                    <label
                      htmlFor={role.id}
                      className="self-stretch my-auto text-xs capitalize text-zinc-800"
                    >
                      {role.label}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Image Upload Section */}
          <div className="flex overflow-hidden flex-col text-sm font-medium w-[196px]">
            <label
              htmlFor="imageUpload"
              className="gap-2.5 py-2.5 pr-2.5 max-w-full text-gray-800 whitespace-nowrap w-[196px]"
            >
              Image
            </label>
            <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100 max-w-[195px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/f5e5f42a1c31b86264edf580a7885ccfdfc1a5340dbeb5172df93580f12f1445?apiKey=40e410915e3b45fca05820790b4d2e7d&"
                alt="Uploaded Image"
                className="object-contain self-center aspect-square w-[54px]"
              />
              <div className="self-center mt-3 text-center">
                Drag and drop your file
              </div>
              <div className="mt-3 text-center">Or</div>
              <button
                type="button"
                onClick={() => document.getElementById("imageUpload").click()}
                className="gap-2.5 self-stretch py-3.5 pr-4 pl-4 mt-3 w-full bg-lime-300 rounded-xl min-h-[42px]"
              >
                Browse File
              </button>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                aria-label="Upload image"
              />
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
          <span className="w-full">
            <button
              type="button"
              onClick={() => document.getElementById("imageUpload").click()}
              className="gap-2.5 self-stretch py-3.5 pr-4 pl-4 mt-3 mr-24 w-[190px] h-[52px] bg-lime-300 rounded-xl min-h-[42px] font-bold"
            >
              Send
            </button>
          </span>
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

export default NotificationForm;
