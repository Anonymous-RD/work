import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import {
  createLearningOutcome,
  updateLearningOutcome,
} from "@/redux/slices/LearnenrOutcomeSlice";

const AddLearnerOutcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOutcome = location.state?.outcome || null;

  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    chapter: "",
    loCode: "",
    learnerOutcome: "",
    // nipunCode: "",
  });

  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const className = ["Class I", "Class II", "Class III"];
  const subjectId = ["Math", "English", "Science"];
  const chapter = ["Chapter I", "Chapter II", "Chapter III"];

  useEffect(() => {
    if (currentOutcome) {
      setFormData({
        className: currentOutcome.className || "",
        subjectId: currentOutcome.subjectId || "",
        chapter: currentOutcome.chapter || "",
        loCode: currentOutcome.loCode || "",
        learnerOutcome: currentOutcome.learnerOutcome || "",
        nipunCode: currentOutcome.nipunCode || "",
      });
    }
  }, [currentOutcome]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentOutcome) {
        await dispatch(
          updateLearningOutcome({
            id: currentOutcome._id,
            updatedData: formData,
          })
        );
      } else {
        await dispatch(createLearningOutcome(formData));
      }
      navigate("/admin/Learner-Outcomes");
    } catch (error) {
      console.error("Error saving outcome:", error);
    }
  };

  return (
    <div className="p-6 max-w-10xl mx-auto">
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {currentOutcome ? "Edit" : "Add"} Learning Outcome
      </h2> */}
      {/* <div className="flex items-center mb-6 gap-5">
        <div>
          <FaArrowLeft onClick={() => navigate("/admin/Learner-Outcomes")} />
          <FaArrowLeft onClick={() => navigate("/admin/Learner-Outcomes")} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {currentOutcome ? "Edit" : "Add"} Learner Outcome
        </h2>
      </div> */}
      {/* Custom Toggle Switch */}
      <div className="mb-6 flex items-center">
        <label className="text-2xl font-medium text-gray-700 mr-4">
          Bulk Add
        </label>
        <div
          onClick={() => setShowForm((prev) => !prev)} // Toggle visibility
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            showForm ? "bg-lime-300" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              showForm ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      {/* Conditional Rendering */}
      {showForm ? (
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
        <div>
          <div className="h-[600px] overflow-y-auto">
            <form onSubmit={handleFormSubmit} className="space-y-3 w-[80%]">
              <div className="flex flex-wrap gap-8">
                {/* First Div: Class, Chapter, LO Code */}
                <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
                  {/* Class Name */}
                  <div>
                    <label className="block text-lg font-medium text-gray-700">
                      Class
                    </label>
                    <select
                      name="className"
                      value={formData.className}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 text-[#78778B] font-medium"
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
                      Chapter
                    </label>
                    <select
                      name="chapter"
                      value={formData.chapter}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 text-[#78778B] font-medium"
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

                  {/* LO Code */}
                  <div>
                    <label className="block text-lg font-medium text-gray-700">
                      LO Code
                    </label>
                    <input
                      type="text"
                      name="loCode"
                      value={formData.loCode}
                      placeholder="Enter LO Code"
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#78778B] placeholder:font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Second Div: Subject, Learner Outcome */}
                <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
                  {/* Subject ID */}
                  <div>
                    <label className="block text-lg font-medium text-gray-700">
                      Subject
                    </label>
                    <select
                      name="subjectId"
                      value={formData.subjectId}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600"
                    >
                      <option value="">Select Subject</option>
                      {subjectId.map((type) => (
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
                      Learner Outcome
                    </label>
                    <textarea
                      name="learnerOutcome"
                      value={formData.learnerOutcome}
                      onChange={handleInputChange}
                      placeholder="Enter Learner Outcome"
                      className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#78778B] placeholder:font-medium"
                      required
                      rows="6"
                      style={{ maxHeight: "calc(1em * 10 + 2rem)" }} // Adjust for font size and padding
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        const maxHeight = (e.target.scrollHeight / 10) * 10; // Approximate max height for 10 rows
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div>
                <button
                  type="submit"
                  className=" mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold   rounded-xl hover:bg-orange-300"
                >
                  {currentOutcome ? "Update" : "Add"}
                </button>
                {/* <button
                type="button"
                onClick={() => navigate("/admin/Learner-Outcomes")}
                className=" mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold   rounded-xl hover:bg-orange-300"
              >
                Back
              </button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLearnerOutcome;
