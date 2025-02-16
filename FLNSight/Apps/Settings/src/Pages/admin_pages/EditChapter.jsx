import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateChapter } from "@/redux/slices/chaptersSlice";
import Swal from "sweetalert2";
import { fetchSubjects } from "@/redux/slices/subjectsSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";

const EditChapter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { setMetadata } = usePageMetadata();
  const chapterData = location.state?.chapter || { id: null, name: "", code: "", subjectId: null };

  const [chapterName, setChapterName] = useState(chapterData.name);
  const [chapterCode, setChapterCode] = useState(chapterData.code);
  const [selectedSubjectId, setSelectedSubjectId] = useState(chapterData.subjectId?._id || "");
  const [errorMessages, setErrorMessages] = useState({
    chapterName: "",
    chapterCode: "",
    selectedSubjectId: "",
  });

  const subjects = useSelector((state) => state.subjects.subjects);
  const subjectsStatus = useSelector((state) => state.subjects.status);
  const chapterStatus = useSelector((state) => state.chapters.status);

  useEffect(() => {
    if (subjectsStatus === "idle") {
      dispatch(fetchSubjects());
    }
  }, [subjectsStatus, dispatch]);

  const validateInputs = () => {
    const errors = {};

    if (!chapterName.trim()) errors.chapterName = "Chapter Name is required.";
    else if (chapterName.length < 3) errors.chapterName = "Chapter Name must be at least 3 characters.";

    if (!chapterCode.trim()) errors.chapterCode = "Chapter Code is required.";
    else if (!/^[A-Za-z0-9]+$/.test(chapterCode)) errors.chapterCode = "Chapter Code must be alphanumeric.";

    if (!selectedSubjectId) errors.selectedSubjectId = "Please select a subject.";

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateChapter = () => {
    if (!validateInputs()) return;

    const updatedData = { name: chapterName, code: chapterCode, subjectId: selectedSubjectId };

    dispatch(updateChapter({ id: chapterData._id, updatedData }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Chapter updated successfully!",
          confirmButtonColor: "#C8EE44",
        }).then(() => {
          navigate("/chapters");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to update chapter.",
        });
      });
  };

  useEffect(() => {
    setMetadata({
      title: "Edit Chapter",
      backPath: "/chapters",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 max-w-4xl">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Chapter Name</label>
            <input
              type="text"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder={errorMessages.chapterName || "Enter Chapter Name"}
              className={`w-full py-2 px-3 border rounded-xl ${
                errorMessages.chapterName ? "border-red-500 placeholder-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className={`w-full py-2 px-3 border rounded-xl ${
                errorMessages.selectedSubjectId ? "border-red-500 placeholder-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                {errorMessages.selectedSubjectId || "Select a Subject"}
              </option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 row-start-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Chapter Code</label>
            <input
              type="text"
              value={chapterCode}
              onChange={(e) => setChapterCode(e.target.value)}
              placeholder={errorMessages.chapterCode || "Enter Chapter Code"}
              className={`w-full py-2 px-3 border rounded-xl ${
                errorMessages.chapterCode ? "border-red-500 placeholder-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <hr className="mt-16  mb-6 border-gray-200" />

        <div className="">
          <button
            onClick={handleUpdateChapter}
            className={`px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300 ${
              chapterStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={chapterStatus === "loading"}
          >
            {chapterStatus === "loading" ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChapter;









