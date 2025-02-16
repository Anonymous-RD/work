import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects } from "@/redux/slices/subjectsSlice";
import { createChapter, createChaptersBulk } from "@/redux/slices/chaptersSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { readFile } from "@/utils/fileUpload";
import { processCSV } from "@/utils/csvProcessor";
import Swal from "sweetalert2";

const AddChapter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const [chapterName, setChapterName] = useState("");
  const [chapterCode, setChapterCode] = useState("");
  const [isBulkAdd, setIsBulkAdd] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    chapterName: "",
    chapterCode: "",
    selectedSubjectId: "",
  });

  // Bulk-related states
  const [file, setFile] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleAddChapter = async () => {
    if (!validateInputs()) return;

    const newChapter = {
      name: chapterName,
      code: chapterCode,
      subjectId: selectedSubjectId,
    };

    try {
      await dispatch(createChapter(newChapter)).unwrap();
      alert("Chapter added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to add chapter:", error);
      alert("Error adding chapter. Please try again.");
    }
  };

    const handleFileUpload = (e) => {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
        
      readFile(uploadedFile, (fileContent) => {
      try {
      const requiredFields = ["name", "code", "subjectCode"];
      const { headers, dataRows } = processCSV(fileContent, requiredFields);
      console.log("CSV Headers:", headers);
      console.log("CSV Data Rows:", dataRows);
        
      setUsers(dataRows);
      Swal.fire({
      icon: "success",
      title: "Success",
      text: "CSV file processed successfully!",
      });
      } catch (error) {
      Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
      });
      }
    });
  };
        
    const handleSubmitUsers = () => {
      if (users.length === 0) {
      Swal.fire({
      icon: "error",
      title: "Error",
      text: "No data to process. Please upload a valid CSV file.",
      });
      return;
      }
        
      setLoading(true);
      dispatch(
      createChaptersBulk({
      checkField: selectedField,
      datas: users,
      })
      )
      .unwrap()
      .then(() => {
      Swal.fire({
      icon: "success",
      title: "Success",
      text: "Bulk districts added successfully!",
      });
      setUsers([]);
      navigate("/chapters");
      })
      .catch((error) => {
      Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Failed to process bulk upload.",
      });
    })
      .finally(() => {
      setLoading(false);
    });
  };
        

  useEffect(() => {
    setMetadata({
      title: "Add Chapter",
      backPath: "/chapters",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 max-w-6xl">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>

      {/* Bulk Add Toggle */}
      <div className="flex items-center mb-6">
        <span className="text-gray-700 font-medium mr-3">Bulk Add</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isBulkAdd}
            onChange={() => setIsBulkAdd(!isBulkAdd)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-lime-300 rounded-full peer peer-checked:bg-lime-300 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>

      {isBulkAdd ? (
        <div>
          <div className="text-xl flex flex-col items-center">
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
              <label className="gap-2.5 px-12 py-2 mt-3 w-[250px] bg-lime-300 rounded-xl min-h-[50px] max-md:px-5 text-center cursor-pointer">
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
              className="gap-2.5 py-3 mt-8 text-black rounded-lg underline text-center"
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
                  defaultValue="Chapter Code"
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="code">Chapter Code</option>
                  <option value="name">Chapter Name</option>
                  <option value="subjectCode">Subject Code</option>
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
          onClick={handleSubmitUsers}
          className="mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
          disabled={loading}
          >
          {loading ? "Processing..." : "Add"}
        </button>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <div className="grid grid-cols-6 gap-6">
            {/* Chapter Name Input */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">Chapter Name</label>
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                placeholder={errorMessages.chapterName || "Enter chapter name"}
                className={`w-full py-2 px-3 border rounded-xl ${
                  errorMessages.chapterName ? "border-red-500 placeholder-red-500" : "border-gray-300"
                }`}
              />
            </div>

            {/* Subject Dropdown */}
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
                  {errorMessages.selectedSubjectId || "Select a subject"}
                </option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter Code Input */}
            <div className="col-span-2 row-start-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">Chapter Code</label>
              <input
                type="text"
                value={chapterCode}
                onChange={(e) => setChapterCode(e.target.value)}
                placeholder={errorMessages.chapterCode || "Enter chapter code"}
                className={`w-full py-2 px-3 border rounded-xl ${
                  errorMessages.chapterCode ? "border-red-500 placeholder-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <hr className="mt-16 mb-6 border-gray-200" />

          <div className="">
            <button
              onClick={handleAddChapter}
              className={`px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300 ${

              chapterStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={chapterStatus === "loading"}
          >
            {chapterStatus === "loading" ? "Adding..." : "Add"}
          </button>
          </div>
       </div>
      )}
    </div>
  );
};
export default AddChapter;
















