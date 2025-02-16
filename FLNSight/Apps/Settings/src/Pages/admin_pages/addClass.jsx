import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClass, createClassesBulk } from "@/redux/slices/classesSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { readFile } from "@/utils/fileUpload";
import { processCSV } from "@/utils/csvProcessor"; 


const AddClass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [isBulkAdd, setIsBulkAdd] = useState(false);
  const [errorPlaceholders, setErrorPlaceholders] = useState({
    className: "Enter Class Name",
    classCode: "Enter Class Code",
  });
  const [errorStates, setErrorStates] = useState({
    className: false,
    classCode: false,
  });

  // Bulk-related states
  const [file, setFile] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddClass = () => {
    if (!className || !classCode) {
      setErrorPlaceholders({
        className: className ? "Enter Class Name" : "Class Name is required",
        classCode: classCode ? "Enter Class Code" : "Class Code is required",
      });

      setErrorStates({
        className: !className,
        classCode: !classCode,
      });

      return;
    }

    dispatch(createClass({ name: className, code: classCode }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Class added successfully!",
          confirmButtonColor: "#C8EE44",
        }).then(() => {
          navigate("/classes");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to add class.",
        });
      });
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrorStates((prev) => ({
      ...prev,
      [field]: false,
    }));
    setErrorPlaceholders((prev) => ({
      ...prev,
      [field]: field === "className" ? "Enter Class Name" : "Enter Class Code",
    }));
  };

  const handleFileUpload = (e) => {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
  
      readFile(uploadedFile, (fileContent) => {
        try {
          const requiredFields = ["name", "code"];
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
        createClassesBulk({
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
      navigate("/classes");
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
      title: "Add Class",
      backPath: "/classes",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl mx-auto overflow-y-auto">
      <hr className="mb-6 border-gray-200" />

       {/* Bulk Add Toggle */}
       <div className="flex items-center mb-8">
        <span className="text-[#000000] font-medium mr-3">Bulk Add</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isBulkAdd}
            onChange={() => setIsBulkAdd(!isBulkAdd)}
          />
          <div className="w-14 h-7 bg-[#EFEFEF] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#EFEFEF] rounded-full peer peer-checked:bg-[#c8ee44] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-[#DBDBDB] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
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
                Please upload csv file to import data in bulk. 
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
                  defaultValue="Class Code"
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="code">Class Code</option>
                  <option value="name">Class Name</option>
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
        <div className="bg-white rounded-lg">
        <div className="flex justify-start w-[72%]">
          {/* Class Name */}
          <div className="w-1/2 pr-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={handleInputChange(setClassName, "className")}
              placeholder="Enter class name"
              className={`w-full py-2 px-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400 ${
                errorStates.className ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorStates.className && (
              <p className="text-red-500 text-sm mt-1">{errorPlaceholders.className}</p>
            )}
          </div>
      
          {/* Class Code */}
          <div className="w-1/2 pl-3">
            <label className="block text-gray-700 text-sm font-medium mb-2">Class Code</label>
            <input
              type="text"
              value={classCode}
              onChange={handleInputChange(setClassCode, "classCode")}
              placeholder="Enter class code"
              className={`w-full py-2 px-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400 ${
                errorStates.classCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorStates.classCode && (
              <p className="text-red-500 text-sm mt-1">{errorPlaceholders.classCode}</p>
            )}
          </div>
        </div>
      </div>
       
      )}

        <hr className="mt-16 mb-6 border-gray-200" />

        <div className="">
          <button
          onClick={handleAddClass}
          className="px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
          >
            Add
          </button>
        </div>
    </div>
  );
};
             
export default AddClass;


