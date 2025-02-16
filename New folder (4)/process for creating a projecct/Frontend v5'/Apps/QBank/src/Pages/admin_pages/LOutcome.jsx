import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLearningOutcomes,
  deleteLearningOutcome,
} from "@/redux/slices/LearnenrOutcomeSlice";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
// import { useIcon } from "../../context/IconContext";
import { useIconContext } from "../../context/IconContext";
import LearningOutcomeModal from "./AddLearnerOutcome";
import { LuSearch } from "react-icons/lu"; // Import the modal

const Loutcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { outcomes } = useSelector((state) => state.learningOutcome);

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
        setLoading(false);
      })
      .catch((error) => {
        // Handle error and set loading to false if fetch fails
        setLoading(false);
        setError("An error occurred while fetching the data.");
      });
  }, [dispatch]);

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
    navigate("/admin/Add-Learner-Outcome");
  };

  const handleEditOutcome = (selectedOutcome) => {
    setIconState("icon");

    navigate(`/admin/Edit-Learner-Outcome/${selectedOutcome._id}`, {
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
    <div className="p-6 max-w-10xl mx-auto ">
      {/* <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Learner Outcomes</h1>
      </header> */}
      {/* Search Input */}
      <div className="mb-6 flex justify-between items-center">
        {/* Input field with Search Icon as button */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Learning Outcomes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[80%] px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:outline-none bg-[#F8F8F8]"
          />
          {/* Search Icon inside the input */}
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => console.log("Search clicked")} // Add your search logic here
          >
            <LuSearch />
          </button>
        </div>

        <button
          onClick={handleAddOutcome}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-lime-300 hover:bg-orange-300 rounded-xl"
        >
          <FaPlus /> Add Learner Outcome
        </button>
      </div>

      {/* Show loading spinner if data is being fetched */}
      {loading ? (
        <div className=" h-40">
          <h1>Loading...</h1>
        </div>
      ) : (
        // Outcomes Table
        <div className="overflow-x-auto rounded-lg max-h-[70vh] h-screen overflow-y-auto">
          <table className="min-w-full table-auto">
            <thead className="">
              <tr className="text-[#929EAE] uppercase text-sm leading-normal font-medium">
                <th className="px-4 py-2 text-left w-1/6">Class</th>
                <th className="px-4 py-2 text-left w-1/6">Subject</th>
                <th className="px-4 py-2 text-left w-1/6">Chapter</th>
                <th className="px-4 py-2 text-left w-1/6">LO Code</th>
                <th className="px-4 py-2 text-left w-3/6">Learning Outcome</th>
                <th className="px-4 py-2 text-left w-1/6">Nipun Code</th>
                <th className="px-4 py-2 text-center w-1/6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOutcomes.map((outcome) => (
                <tr
                  key={outcome._id}
                  className="border-t hover:bg-gray-50 h-16"
                >
                  <td className="px-4 py-2 font-semibold">
                    {outcome.className}
                  </td>
                  <td className="px-4 py-2">{outcome.subjectId}</td>
                  <td className="px-4 py-2">{outcome.chapter}</td>
                  <td className="px-4 py-2">{outcome.loCode}</td>
                  <td className="px-4 py-2">{outcome.learnerOutcome}</td>
                  <td className="px-4 py-2">---</td>
                  <td className="px-4 py-2 text-center relative">
                    {/* Three dots for actions */}
                    <button
                      onClick={() => togglePopover(outcome._id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <span className="text-xl">⋮</span>
                    </button>

                    {/* Popover menu for Edit and Delete */}
                    {openPopover === outcome._id && (
                      <div
                        ref={popoverRef}
                        className="absolute bg-white border border-gray-300 rounded-xl  mt-2 right-0 w-40 z-10"
                      >
                        <button
                          onClick={() => handleEditOutcome(outcome)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-md" // rounded top button
                        >
                          Edit
                        </button>

                        {/* Horizontal Line */}
                        <div className="border-t border-gray-300"></div>

                        <button
                          onClick={() => {
                            Swal.fire({
                              title:
                                "Are you sure you want to delete this outcome?",
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
                                popup: "rounded-2xl p-6", // Apply rounded corners and padding to the popup
                                confirmButton: "rounded-xl px-10 py-2 text-lg", // Apply styling to the "Yes" button
                                cancelButton: "rounded-lg px-6 py-2 text-lg", // Apply styling to the "No" button
                                actions: "space-x-10", // Add space between buttons
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteLearningOutcome(outcome._id));
                              }
                            });
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-b-md" // rounded bottom button
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
