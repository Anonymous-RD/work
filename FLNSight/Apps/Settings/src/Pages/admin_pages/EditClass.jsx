import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateClass } from "@/redux/slices/classesSlice";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { usePageMetadata } from "../../context/PageMetadataContext";

const EditClass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { setMetadata } = usePageMetadata();
  // Extract class data passed through navigation
  const classData = location.state?.classInfo || { id: null, name: "", code: "" };

  const [className, setClassName] = useState(classData.name);
  const [classCode, setClassCode] = useState(classData.code);

  const handleUpdateClass = () => {
    if (!className || !classCode) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in both Class Name and Class Code.",
      });
      return;
    }

    dispatch(updateClass({ id: classData._id, updatedData: { name: className, code: classCode } }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Class updated successfully!",
          confirmButtonColor: "#C8EE44",
        }).then(() => {
          navigate("/classes"); // Redirect back to Classes page
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to update class.",
        });
      });
  };

  useEffect(() => {
    setMetadata({
      title: "Edit Class",
      backPath: "/classes",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 max-w-6xl">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>
      <div className="bg-white shadow-sm rounded-lg">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter Class Name"
              className="w-full py-2 px-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Class Code</label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter Class Code"
              className="w-full py-2 px-3 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        <hr className="mt-16  mb-6 border-gray-200" />
        <div className="">
          <button
            onClick={handleUpdateClass}
            className="px-12 py-3 font-semibold text-gray-800 bg-lime-300 rounded-xl"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClass;
