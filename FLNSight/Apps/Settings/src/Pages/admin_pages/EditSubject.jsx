import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSubject } from "@/redux/slices/subjectsSlice";
import Swal from "sweetalert2";
import { fetchClasses } from "@/redux/slices/classesSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";

const EditSubject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { setMetadata } = usePageMetadata();
  const subjectData = location.state?.subject || { id: null, name: "", code: "", classId: "" };

  const [subjectName, setSubjectName] = useState(subjectData.name);
  const [subjectCode, setSubjectCode] = useState(subjectData.code);
  const [selectedClassId, setSelectedClassId] = useState(subjectData.classId?._id || "");
  const [errorMessages, setErrorMessages] = useState({
    subjectName: "",
    subjectCode: "",
    selectedClassId: "",
  });

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

  const handleUpdateSubject = () => {
    if (!validateInputs()) return;

    const updatedData = { name: subjectName, code: subjectCode, classId: selectedClassId };

    dispatch(updateSubject({ id: subjectData._id, updatedData }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Subject updated successfully!",
          confirmButtonColor: "#C8EE44",
        }).then(() => {
          navigate("/subjects");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to update subject.",
        });
      });
  };

  useEffect(() => {
    setMetadata({
      title: "Edit Subjects",
      backPath: "/subjects",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 max-w-4xl">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>
      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Subject Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder={errorMessages.subjectName || "Enter Subject Name"}
              className={`w-full py-2 px-3 border rounded-xl ${
                errorMessages.subjectName ? "border-red-500 placeholder-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className={`w-full py-2 px-3 border rounded-xl ${
                errorMessages.selectedClassId ? "border-red-500 placeholder-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                {errorMessages.selectedClassId || "Select a Class"}
              </option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 row-start-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Subject Code</label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder={errorMessages.subjectCode || "Enter Subject Code"}
              className={`w-full py-2 px-3 border rounded-xl ${
                errorMessages.subjectCode ? "border-red-500 placeholder-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <hr className="mt-16  mb-6 border-gray-200" />

        <div className="">
          <button
            onClick={handleUpdateSubject}
            className={`px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300 ${
              subjectStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={subjectStatus === "loading"}
          >
            {subjectStatus === "loading" ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubject;



















