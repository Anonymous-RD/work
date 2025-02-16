import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestions,
  deleteQuestion,
} from "@/redux/slices/assessmentQuestionsSlice";
import Swal from "sweetalert2";
import { FiPlus } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import { useIconContext } from "../../context/IconContext";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

// Function to strip HTML tags
const stripHtmlTags = (htmlString) => {
  return htmlString.replace(/<[^>]*>/g, ""); // Removes all HTML tags
};

const AssessmentQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state) => state.assessmentQuestions);

  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const popoverRef = useRef(null);
  const { setIconState } = useIconContext();
  const { setMetadata } = usePageMetadata();
  console.log("questions",questions)

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     await dispatch(fetchQuestions());
    //     console.log("fetch", fetchQuestions);
    //   } catch (error) {
    //     console.error("Failed to load data.", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    setLoading(true);
    dispatch(fetchQuestions())
      .unwrap()
      .then(() => {
        // Set loading state to false after data is fetched
        console.log(" fetched", fetchQuestions);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error and set loading to false if fetch fails
        setLoading(false);
        setError("An error occurred while fetching the data.");
      });
    console.log("fetch", fetchQuestions);

    //  dispatch(fetchQuestions())
  }, [dispatch]);

  useEffect(() => {
    setMetadata({ title: "Assessment Questions", backPath: null });
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

  const togglePopover = (questionId) => {
    setOpenPopover(openPopover === questionId ? null : questionId);
  };

  const filteredQuestions = questions.filter((question) =>
    question.assessmentQuestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditQuestion = (selectedQuestion) => {
    setIconState("icon");
    console.log("object", selectedQuestion);
    navigate(`/Edit-Assessment-Question/${selectedQuestion._id}`, {
      state: { question: selectedQuestion },
    });
  };

  return (
    <>
      {/* Search and Add Question */}
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Assessments questions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[294px] px-4 py-3 pl-[54px] border border-[#F5F5F5] text-sm rounded-xl focus:outline-none bg-[#F8F8F8] text-[#929EAE]"
          />
          <LuSearch className="absolute left-3 size-6  mt-[-2px] top-1/2 transform -translate-y-1/2 text-[#363A3F]" />
        </div>
        <button
          onClick={() => {
            setIconState("icon");
            navigate("/Add-Assessment-Question");
          }}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-[#1B212D] bg-lime-300 hover:bg-orange-300 rounded-xl"
        >
          <FiPlus size={24} /> Add Question
        </button>
      </div>
      <div className="py-4">
        <hr className="border-t w-full h-[1px] opacity-[0.5] bg-[#F5F5F5]" />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative pb-6 flex-1 w-100 overflow-x-hidden overflow-y-auto rounded-lg">
          <Scrollbars>
            <table className="table-auto border-spacing-0 mb-[74px]">
              <thead className="sticky top-0 bg-white  z-10">
                <tr className="text-[#929EAE] uppercase text-[12px] leading-normal font-semibold">
                  <th className="px-4 py-2 text-left  whitespace-nowrap w-[110px]">
                    Aca.Year
                  </th>
                  <th className="px-4 py-2 text-left w-[125px]">Class</th>
                  <th className="px-4 py-2 text-left  whitespace-nowrap w-[110px]">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-left  whitespace-nowrap w-[180px]">
                    Chapter
                  </th>
                  <th className="px-4 py-2 text-left  whitespace-nowrap w-[110px]">
                    Lo Code
                  </th>
                  <th className="px-4 py-2 text-left  whitespace-nowrap w-[180px]">
                    Question Type
                  </th>
                  <th className="px-4 py-2 text-left  whitespace-nowrap w-[180px]">
                    Difficulty Level
                  </th>
                  <th className="px-4 py-2 text-left w-1/6">Question</th>
                  <th className="px-4 py-2 text-center whitespace-nowrap w-[110px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question) => (
                  <tr
                    key={question._id}
                    className="border-b border-[#F5F5F5] hover:bg-gray-50 h-16"
                  >
                    <td className="px-4 py-2 text-[#78778B] whitespace-nowrap text-sm font-medium w-[110px]">
                      {question.academicYear}
                    </td>
                    <td className="px-4 py-2 text-[#1B212D] text-sm font-medium w-[125px]">
                      {
                        question.learnerOutcomeId.chapterId.subjectId.classId
                          .name
                      }
                    </td>
                    <td className="px-4 py-2 text-[#78778B] whitespace-nowrap text-sm font-medium w-[110px]">
                      {question.learnerOutcomeId.chapterId.subjectId.name}
                    </td>
                    <td className="px-4 py-2 text-[#78778B] whitespace-nowrap text-sm font-medium w-[180px]">
                      {question.learnerOutcomeId.chapterId.name}
                    </td>
                    <td className="px-4 py-2 text-[#78778B] whitespace-nowrap text-sm font-medium w-[110px]">
                      {question.learnerOutcomeId.loCode}
                    </td>
                    <td className="px-4 py-2 text-[#78778B] whitespace-nowrap text-sm font-medium w-[180px]">
                      {question.questionType}
                    </td>
                    <td className="px-4 py-2 text-[#78778B] whitespace-nowrap text-sm font-medium w-[180px]">
                      {question.difficultyLevel}
                    </td>
                    <td
                      className="px-4 py-2 text-[#78778B] text-sm font-medium"
                      dangerouslySetInnerHTML={{
                        __html: question.assessmentQuestion,
                      }}
                    ></td>
                    <td className="px-4 py-2 text-center whitespace-nowrap relative w-[110px]">
                      {" "}
                      <button
                        onClick={() => togglePopover(question._id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <span className="text-xl">⋮</span>
                      </button>
                      {openPopover === question._id && (
                        <div
                          ref={popoverRef}
                          className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-2 mr-2 right-[30px] w-40 z-10"
                        >
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-t-md hover"
                          >
                            Edit
                          </button>
                          <div className="border-t border-gray-300 opcaity-[0.5]"></div>
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
                                  popup: "rounded-2xl p-10",
                                  confirmButton:
                                    "rounded-lg px-10 py-2 text-lg",
                                  cancelButton: "rounded-lg px-10 py-2 text-lg",
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
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default AssessmentQuestions;
