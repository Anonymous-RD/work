import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLearningOutcomes,
  deleteLearningOutcome,
} from "@/redux/slices/LearnenrOutcomeSlice";
import Swal from "sweetalert2";
import { FiPlus } from "react-icons/fi";
// import { useIcon } from "../../context/IconContext";
import { useIconContext } from "../../context/IconContext";
import LearningOutcomeModal from "./AddLearnerOutcome";
import { LuSearch } from "react-icons/lu"; // Import the modal
import { usePageMetadata } from "../../context/PageMetadataContext";

const Loutcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { outcomes } = useSelector((state) => state.learningOutcome);
  const { setMetadata } = usePageMetadata();

  // Local loading state
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [currentOutcome, setCurrentOutcome] = useState(null);
  const [error, setError] = useState(null);
  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const popoverRef = useRef(null);
  const { setIconState } = useIconContext();
  useEffect(() => {
    // Set loading state to true before fetching
    setLoading(true);

    dispatch(fetchLearningOutcomes())
      .unwrap()
      .then(() => {
        // Set loading state to false after data is fetched
        console.log(" fetched", fetchLearningOutcomes);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error and set loading to false if fetch fails
        setLoading(false);
        setError("An error occurred while fetching the data.");
      });
  }, [dispatch]);

  useEffect(() => {
    setMetadata({ title: "Learner Outcomes", backPath: null }); // No back button
  }, [setMetadata]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpenPopover(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddOutcome = () => {
    setIconState("icon");
    navigate("/Add-Learner-Outcome");
  };

  const handleEditOutcome = (selectedOutcome) => {
    setIconState("icon");

    navigate(`/Edit-Learner-Outcome/${selectedOutcome._id}`, {
      state: { outcome: selectedOutcome },
    });
  };

  const togglePopover = (outcomeId) => {
    setOpenPopover(openPopover === outcomeId ? null : outcomeId);
  };

  const filteredOutcomes = outcomes.filter((outcome) =>
    outcome.learnerOutcome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pr-6 pt-0 max-w-10xl mx-auto font-kumbh">
      {/* <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learner Outcomes</h1>
      </header> */}
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        {/* Input field with Search Icon as button */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Learner Outcomes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[294px] px-4 py-3 pl-[54px] border border-[#F5F5F5] text-sm rounded-xl focus:outline-none bg-[#F8F8F8] text-[#929EAE]"
          />
          {/* Search Icon inside the input */}
          <LuSearch className="absolute left-3 size-6 mt-[-2px] top-1/2 transform -translate-y-1/2 text-[#363A3F]" />
        </div>

        <button
          onClick={handleAddOutcome}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-sm text-[#1B212D] bg-lime-300 hover:bg-orange-300 rounded-xl"
        >
          <FiPlus size={24} /> Add Learner Outcome
        </button>
      </div>
      <div className="py-4">
        <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
      </div>
      {/* Show loading spinner if data is being fetched */}
      {loading ? (
        <div className=" h-40">
          <h1>Loading...</h1>
        </div>
      ) : (
        // Outcomes Table
        <div
          className="relative overflow-x-auto overflow-y-auto rounded-lg max-h-[80vh] min-w-[1024px]  pb-24"
          // style={{
          //   scrollbarWidth: "none", // For Firefox
          //   msOverflowStyle: "none", // For IE and Edge
          // }}
        
        >
          <table className="table-auto border-spacing-0">
            <thead className="sticky top-0 bg-white  z-10">
              <tr className="text-[#929EAE] uppercase text-[12px] leading-normal font-semibold">
                <th className="px-4 py-2 text-left w-[12%]">Class</th>
                <th className="px-4 py-2 text-left w-[12%]">Subject</th>
                <th className="px-4 py-2 text-left w-[12%]">Chapter</th>
                <th className="px-4 py-2 text-left w-[12%]">LO Code</th>
                <th className="px-4 py-2 text-left w-[30%]">
                  Learning Outcome
                </th>
                <th className="px-4 py-2 text-left w-[20%]">Nipun Code</th>
                <th className="px-4 py-2 text-center w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOutcomes.map((outcome) => (
                <tr
                  key={outcome._id}
                  className="border-b border-[#F5F5F5] hover:bg-gray-50 h-16 "
                >
                  <td className="px-4 py-2 text-[#1B212D] text-sm font-medium">
                    {outcome.chapterId.subjectId.classId.name}
                  </td>
                  <td className="px-4 py-2 text-[#78778B] text-sm font-medium">
                    {outcome.chapterId.subjectId.name}
                  </td>
                  <td className="px-4 py-2 text-[#78778B] text-sm font-medium">
                    {outcome.chapterId.name}
                  </td>
                  <td className="px-4 py-2 text-[#78778B] text-sm font-medium">
                    {outcome.loCode}
                  </td>
                  <td className="px-4 py-2 text-[#78778B] text-sm font-medium">
                    {outcome.learnerOutcome}
                  </td>
                  <td className="px-4 py-2 text-[#78778B] text-sm font-medium">
                    ---
                  </td>
                  <td className="px-8 py-2 text-center relative">
                    <button
                      onClick={() => togglePopover(outcome._id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <span className="text-xl">⋮</span>
                    </button>

                    {openPopover === outcome._id && (
                      <div
                        ref={popoverRef}
                        className="absolute overflow-hidden bg-white  shadow-2xl rounded-xl  mt-2 mr-2 right-[30px] w-40 z-10"
                      >
                        <button
                          onClick={() => handleEditOutcome(outcome)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-md hover"
                        >
                          Edit
                        </button>
                        <div className="border-t border-gray-300 opacity-[0.5]"></div>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title:
                                "Are you sure you want to delete this learner outcome?",
                              showCancelButton: true,
                              textColor: "black",
                              confirmButtonColor: "#C8EE44",
                              cancelButtonColor: "#C8EE44",
                              confirmButtonText:
                                "<span class='text-black p-4'>YES</span>",
                              cancelButtonText:
                                "<span class='text-black p-4'>NO</span>",
                              reverseButtons: true,
                              customClass: {
                                popup: "rounded-2xl p-10", // Optional: add padding to the popup
                                confirmButton: "rounded-lg px-10 py-2 text-lg",
                                cancelButton: "rounded-lg px-10 py-2 text-lg",
                                actions: "space-x-10", // For button alignment
                              },
                              didOpen: () => {
                                const popup = Swal.getPopup();
                                popup.style.width = "410px"; // Set width to 410px (adjust as needed)
                                popup.style.height = "250px"; // Set height to 242px (adjust as needed)
                                popup.style.borderRadius = "20px"; // Rounded corners

                                // Add padding to the bottom of the popup to create space below the buttons
                                popup.style.paddingBottom = "20px"; // Adjust this value for the desired space
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteLearningOutcome(outcome._id));
                              }
                            });
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-b-md"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Loutcome;
