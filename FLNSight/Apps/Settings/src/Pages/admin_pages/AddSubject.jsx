import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "@/redux/slices/classesSlice";
import { createSubject, createSubjectsBulk } from "@/redux/slices/subjectsSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { readFile } from "@/utils/fileUpload";
import { processCSV } from "@/utils/csvProcessor";
import Swal from "sweetalert2";


const AddSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [isBulkAdd, setIsBulkAdd] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    subjectName: "",
    subjectCode: "",
    selectedClassId: "",
  });

  // Bulk-related states
  const [file, setFile] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useSelector((state) => state.classes.classes);
  const classesStatus = useSelector((state) => state.classes.status);
  const subjectStatus = useSelector((state) => state.subjects.status);

  useEffect(() => {
    if (classesStatus === "idle") {
      dispatch(fetchClasses());
    }
  }, [classesStatus, dispatch]);

  const validateInputs = () => {
    const errors = {};

    if (!subjectName.trim()) errors.subjectName = "Subject Name is required.";
    else if (subjectName.length < 3) errors.subjectName = "Subject Name must be at least 3 characters.";

    if (!subjectCode.trim()) errors.subjectCode = "Subject Code is required.";
    else if (!/^[A-Za-z0-9]+$/.test(subjectCode)) errors.subjectCode = "Subject Code must be alphanumeric.";

    if (!selectedClassId) errors.selectedClassId = "Please select a class.";

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubject = async () => {
    if (!validateInputs()) return;

    const selectedClass = classes.find((cls) => cls._id === selectedClassId);

    if (!selectedClass) {
      alert("Selected class not found.");
      return;
    }

    const newSubject = {
      name: subjectName,
      code: subjectCode,
      classId: selectedClass._id,
    };

    try {
      await dispatch(createSubject(newSubject)).unwrap();
      alert("Subject added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to add subject:", error);
      alert("Error adding subject. Please try again.");
    }
  };

  const handleFileUpload = (e) => {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
        
      readFile(uploadedFile, (fileContent) => {
      try {
      const requiredFields = ["name", "code", "classCode"];
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
      createSubjectsBulk({
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
      navigate("/subjects");
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
      title: "Add Subjects",
      backPath: "/subjects",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 max-w-4xl">
      

      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>

      {/* Bulk Add Toggle */}
      <div className="flex items-center mb-6 space-x-4">
        <span className="text-gray-700 font-medium">Bulk Add</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isBulkAdd}
            onChange={() => setIsBulkAdd(!isBulkAdd)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-lime-300">
            <div className="w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-5"></div>
          </div>
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
                  <option value="code">Subject Code</option>
                  <option value="name">Subject Name</option>
                  <option value="classCode">Class Code</option>
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
          <div className="grid grid-cols-5 gap-6">
            {/* Subject Name Input */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">Subject Name</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder={errorMessages.subjectName || "Enter subject name"}
                className={`w-full py-2 px-3 border rounded-xl ${
                  errorMessages.subjectName ? "border-red-500 placeholder-red-500" : "border-gray-300"
                }`}
              />
            </div>

            {/* Class Dropdown */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Class</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className={`w-full py-2 px-3 border rounded-xl ${
                  errorMessages.selectedClassId ? "border-red-500 placeholder-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  {errorMessages.selectedClassId || "Select a class"}
                </option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Code Input */}
            <div className="col-span-2 row-start-2">
              <label className="block text-gray-700 font-medium mb-2">Subject Code</label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder={errorMessages.subjectCode || "Enter subject code"}
                className={`w-full py-2 px-3 border rounded-xl ${
                  errorMessages.subjectCode ? "border-red-500 placeholder-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <hr className="mt-16  mb-6 border-gray-200" />
          
          <div className="">
            <button
              type="button"
              onClick={handleAddSubject}
              className="px-12 py-3 bg-lime-300 text-black font-bold rounded-xl hover:bg-orange-300"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubject;















