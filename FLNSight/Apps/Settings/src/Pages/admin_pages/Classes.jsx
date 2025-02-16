import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses, deleteClass } from "@/redux/slices/classesSlice";
import { FaPlus } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";

const Classes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const { classes } = useSelector((state) => state.classes);

  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const popoverRef = useRef(null);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleAddClass = () => {
    navigate("/addclass");
  };

  const handleViewClass = (classInfo) => {
    Swal.fire({
      title: "Class Details",
      html: `<p><strong>Name:</strong> ${classInfo.name}</p><p><strong>Code:</strong> ${classInfo.code}</p>`,
      confirmButtonColor: "#C8EE44",
    });
  };

  const handleEditClass = (classInfo) => {
    navigate("/editclass", { state: { classInfo } });
  };

  const togglePopover = (classId, event) => {
    event.stopPropagation();
    setOpenPopover(openPopover === classId ? null : classId);
  };

  const closePopover = () => {
    setOpenPopover(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const filteredClasses = classes.filter((classInfo) =>
    classInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setMetadata({
      title: "Classes",
      backPath: "/academic",
    });
  }, [setMetadata]);

  return (
    <div className="pt-0 pr-6 max-w-10xl mx-auto">
      {/* Search and Add Class */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#363A3F]">
            <LuSearch />
          </span>
          <input
            type="text"
            placeholder="Search Classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border text-[#929EAE] border-[#F5F5F5] w-[80%]  rounded-xl bg-[#F8F8F8] focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          onClick={handleAddClass}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
        >
          <FaPlus /> Add Class
        </button>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto overflow-y-auto rounded-lg max-h-[80vh]  pb-24">
        <table className="min-w-full table-auto border-spacing-0">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-[#929EAE] uppercase text-sm leading-normal font-medium">
              <th className="text-left py-2">Class Name</th>
              <th className="text-left py-2">Class Code</th>
              <th className="text-center py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((classInfo) => (
              <tr key={classInfo.id} className="border-t hover:bg-gray-50">
                <td className="py-3 text-[#1B212D] text-sm whitespace-nowrap">
                  {classInfo.name}
                </td>
                <td className="py-3 text-[#929EAE] text-sm whitespace-nowrap">
                  {classInfo.code}
                </td>
                <td className="py-3 px-4 text-center relative whitespace-nowrap">
                  <button
                    onClick={(e) => togglePopover(classInfo._id, e)}
                    className="text-gray-400 hover:text-gray-800"
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                  {openPopover === classInfo._id && (
                    <div
                      ref={popoverRef}
                      className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-0 right-[77px] w-24 z-10 py-1"
                    >
                      <button
                        onClick={() => handleViewClass(classInfo)}
                        className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClass(classInfo)}
                        className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure you want to delete this class?",
                            showCancelButton: true,
                            confirmButtonColor: "#C8EE44",
                            cancelButtonColor: "#C8EE44",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(deleteClass(classInfo._id));
                            }
                          });
                        }}
                        className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
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
    </div>
  );
};

export default Classes;

