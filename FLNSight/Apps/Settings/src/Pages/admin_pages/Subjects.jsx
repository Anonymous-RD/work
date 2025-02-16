import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects, deleteSubject } from "@/redux/slices/subjectsSlice"; 
import { FaPlus } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";

const Subjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const { subjects } = useSelector((state) => state.subjects);


  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const popoverRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSubjects()); 
  }, [dispatch]);

 
  

  const handleAddSubject = () => {
    navigate("/addsubject");
  };

  const handleViewSubject = (subject) => {
    Swal.fire({
      title: "Subject Details",
      html: `<p><strong>Subject Name:</strong> ${subject.name}</p>
             <p><strong>Class Name:</strong> ${(subject.classId.name)}</p> 
             <p><strong>Subject Code:</strong> ${subject.code}</p>`,
      confirmButtonColor: "#C8EE44",
    });
  };

  const handleEditSubject = (subject) => {
    navigate("/editsubject", { state: { subject } });
  };

  const handleDeleteSubject = (subjectId) => {
    Swal.fire({
      title: "Are you sure you want to delete this subject?",
      showCancelButton: true,
      confirmButtonColor: "#C8EE44",
      cancelButtonColor: "#C8EE44",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSubject(subjectId));
      }
    });
  };

  const togglePopover = (subjectId, event) => {
    event.stopPropagation();
    setOpenPopover(openPopover === subjectId ? null : subjectId);
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

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setMetadata({
      title: "Subjects",
      backPath: "/academic",
    });
  }, [setMetadata]);

  return (
    <div className="pr-6 pt-0 max-w-10xl mx-auto">
     
      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/5">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <LuSearch />
          </span>
          <input
            type="text"
            placeholder="Search Subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 border border-gray-200 bg-gray-50 w-full rounded-xl"
          />
        </div>
        <button
          onClick={handleAddSubject}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      {/* Subjects Table */}
      <div className="relative overflow-x-auto overflow-y-auto rounded-lg max-h-[70vh]">
        <table className="min-w-full table-auto border-spacing-0">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-[#929EAE] uppercase text-sm leading-normal font-medium">
              <th className="text-left py-2">Subject Name</th>
              <th className="text-left py-2">Class Name</th>
              <th className="text-left py-2">Subject Code</th>
              <th className="text-center py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr key={subject._id} className="border-t-[0.5px] hover:bg-gray-50">
                <td className="py-3  text-sm whitespace-nowrap">{subject.name}</td>
                <td className="py-3 text-gray-400 text-sm whitespace-nowrap">
                  {subject.classId?.name}
                </td>
                <td className="py-3 text-gray-400 text-sm whitespace-nowrap">{subject.code}</td>
                <td className="py-3 px-4 text-center relative whitespace-nowrap">
                  <button
                    onClick={(e) => togglePopover(subject._id, e)}
                    className="text-gray-400 hover:text-gray-800"
                  >
                    <span className="text-xl">⋮</span>
                  </button>

                  {openPopover === subject._id && (
                    <div
                      ref={popoverRef}
                      className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-0 right-[72px] w-24 z-10 py-1"
                    >
                      <button
                        onClick={() => handleViewSubject(subject)}
                        className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditSubject(subject)}
                        className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(subject._id)}
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

export default Subjects;
