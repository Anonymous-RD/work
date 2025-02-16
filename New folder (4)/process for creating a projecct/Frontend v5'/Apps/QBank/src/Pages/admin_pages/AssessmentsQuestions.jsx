import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestions,
  deleteQuestion,
} from "@/redux/slices/assessmentQuestionsSlice";
import Swal from "sweetalert2";
import QuestionFormModal from "./AddAssessmentQuestion"; // Import the new modal component
import { LuSearch } from "react-icons/lu"; // Import the modal
import { useIconContext } from "../../context/IconContext";

import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const AssessmentQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state) => state.assessmentQuestions);

  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isBulkAdd, setIsBulkAdd] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const popoverRef = useRef(null);
  const { setIconState } = useIconContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        await dispatch(fetchQuestions());
      } catch (error) {
        setError("Failed to load data.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
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

  const togglePopover = (questionId) => {
    setOpenPopover(openPopover === questionId ? null : questionId);
  };

  const filteredQuestions = questions.filter((question) =>
    question.assessmentQuestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditQuestion = (selectedQuestion) => {
    setIconState("icon");

    navigate(`/admin/Edit-Assessment-Question/${selectedQuestion._id}`, {
      state: { question: selectedQuestion },
    });
  };

  return (
    <div className="p-6 max-w-10xl mx-auto">
      {/* Search Input */}
      <header className="mb-8">
        {/* <h1 className="text-3xl font-bold text-gray-900">
          Assessment Questions
        </h1> */}
      </header>

      {/* Loading Spinner */}

      {/* Search and Add Question */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Assessments questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border border-gray-300 w-[80%] rounded-xl bg-[#F8F8F8]"
          />
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>

        <button
          onClick={() => {
            setIconState("icon");

            navigate("/admin/Add-Assessment-Question");
          }}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-lime-300 hover:bg-orange-300 rounded-xl"
        >
          <FaPlus /> Add Question
        </button>
      </div>

      {loading ? (
        <div>
          {" "}
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg max-h-[60vh] overflow-y-auto pb-24">
          <table className="min-w-full table-auto">
            <thead className="">
              <tr className="text-[#929EAE] uppercase text-sm leading-normal font-medium">
                <td className="px-4 py-2 text-left w-1/12">Aca. Year</td>
                <td className="px-4 py-2 text-left w-1/12">Class</td>
                <td className="px-4 py-2 text-left w-1/12">Subject</td>
                <td className="px-4 py-2 text-left w-1/12">Chapter</td>
                <td className="px-4 py-2 text-left w-1/12">Lo Code</td>
                <td className="px-4 py-2 text-left w-1/12">Question Type</td>
                <td className="px-4 py-2 text-left w-1/12">
                  Difficulty Level{" "}
                </td>
                <td className="px-4 py-2 text-left w-3/12">Question</td>
                <td className="px-4 py-2 text-center w-1/12">Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question) => (
                <tr key={question._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{question.academicYear}</td>
                  <td className="px-4 py-2 font-semibold">Class 1</td>
                  <td className="px-4 py-2">Hindi</td>
                  <td className="px-5 py-2">Chapter A</td>
                  <td className="px-4 py-2">{question.learnerOutcomeId}</td>
                  <td className="px-4 py-2">{question.questionType}</td>
                  <td className="px-4 py-2">{question.difficultyLevel}</td>
                  <td className="px-4 py-2">{question.assessmentQuestion}</td>
                  <td className="px-4 py-2 text-center relative">
                    <button
                      onClick={() => togglePopover(question._id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <span className="text-xl">⋮</span>
                    </button>

                    {openPopover === question._id && (
                      <div
                        ref={popoverRef}
                        className="absolute bg-white border border-gray-300 rounded-xl  mt-2 right-0 w-40 z-10"
                      >
                        <button
                          onClick={() => {
                            handleEditQuestion(question);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-md"
                        >
                          Edit
                        </button>

                        <div className="border-t border-gray-300"></div>

                        <button
                          onClick={() => {
                            Swal.fire({
                              title:
                                "Are you sure you want to delete this assessment question?",
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
                                popup: "rounded-2xl p-6",
                                confirmButton: "rounded-xl px-10 py-2 text-lg",
                                cancelButton: "rounded-lg px-6 py-2 text-lg",
                                actions: "space-x-10",
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteQuestion(question._id));
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

export default AssessmentQuestions;
