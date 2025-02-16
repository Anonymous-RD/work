import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLearningOutcome } from "@/redux/slices/LearnenrOutcomeSlice";
import { FaArrowLeft } from "react-icons/fa";

const EditLearnerOutcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentOutcome = location.state?.outcome;

  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    chapter: "",
    loCode: "",
    learnerOutcome: "",
    // nipunCode: "",
  });

  useEffect(() => {
    if (currentOutcome) {
      setFormData({
        className: currentOutcome.className || "",
        subjectId: currentOutcome.subjectId || "",
        chapter: currentOutcome.chapter || "",
        loCode: currentOutcome.loCode || "",
        learnerOutcome: currentOutcome.learnerOutcome || "",
        // nipunCode: currentOutcome.nipunCode || "",
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
        navigate("/admin/Learner-Outcomes");
      }
    } catch (error) {
      console.error("Error updating learner outcome:", error);
    }
  };

  return (
    <div className="p-6 max-w-10xl">
      <div className="flex items-center mb-6 gap-5">
        <div>
          <FaArrowLeft onClick={() => navigate("/admin/Learner-Outcomes")} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Edit Learning Outcome
        </h2>
      </div>
      <div className="h-[600px] overflow-y-auto">

      <form onSubmit={handleFormSubmit} className="space-y-6 w-[80%]">
        <div className="flex flex-wrap gap-8">
          {/* First Div: Class, Chapter, LO Code */}
          <div className="flex flex-col space-y-6 flex-1 min-w-[48%]">
            {/* Class Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Class
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="Select Class"
                className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#000000] placeholder:font-medium"
                required
              />
            </div>

            {/* Chapter */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Chapter
              </label>
              <input
                type="text"
                name="chapter"
                value={formData.chapter}
                onChange={handleInputChange}
                placeholder="Select Chapter"
                className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#000000] placeholder:font-medium"
                required
              />
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
                className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#000000] placeholder:font-medium"
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
              <input
                type="text"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleInputChange}
                placeholder="Select Subject"
                className="w-full mt-2 px-4 py-2 border border-[#f5f5f5] rounded-xl focus:outline-none focus:border-zinc-600 placeholder:text-[#000000] placeholder:font-medium"
                required
              />
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
        </div>

        {/* Buttons */}
        <div>
          <button
            type="submit"
            className="mt-2 px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
          >
            {currentOutcome ? "Update" : "Add"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditLearnerOutcome;
