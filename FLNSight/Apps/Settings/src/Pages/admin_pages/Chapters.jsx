import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchChapters, deleteChapter } from "@/redux/slices/chaptersSlice";
import { FaPlus} from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";

const Chapters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const { chapters } = useSelector((state) => state.chapters); 

  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const popoverRef = useRef(null);

  useEffect(() => {
    dispatch(fetchChapters());
  }, [dispatch]);

  const handleAddChapter = () => {
    navigate("/addchapter");
  };

  const handleViewChapter = (chapter) => {
    Swal.fire({
      title: "Chapter Details",
      html: `
        <p><strong>Chapter Name:</strong> ${chapter.name}</p>
        <p><strong>Subject Name:</strong> ${chapter.subjectId?.name || "Unknown"}</p>
        <p><strong>Chapter Code:</strong> ${chapter.code || "N/A"}</p> 
      `,
      confirmButtonColor: "#C8EE44",
    });
  };

  const handleEditChapter = (chapter) => {
    navigate(`/editchapter`, { state: { chapter } });
  };

  const handleDeleteChapter = (chapterId) => {
    Swal.fire({
      title: "Are you sure you want to delete this chapter?",
      showCancelButton: true,
      confirmButtonColor: "#C8EE44",
      cancelButtonColor: "#C8EE44",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteChapter(chapterId));
      }
    });
  };

  const togglePopover = (chapterId, event) => {
    event.stopPropagation();
    setOpenPopover(openPopover === chapterId ? null : chapterId);
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

  const filteredChapters = chapters.filter((chapter) =>
    chapter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setMetadata({
      title: "Chapters",
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
            placeholder="Search Chapters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 border border-gray-200 bg-gray-50 w-full rounded-xl"
          />
        </div>
        <button
          onClick={handleAddChapter}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
        >
          <FaPlus /> Add Chapter
        </button>
      </div>
     {/* Chapters Table */}
<div className="relative overflow-x-auto overflow-y-auto rounded-lg max-h-[70vh]">
  <div className="">
    <table className="min-w-full table-auto border-spacing-0">
    <thead className="sticky top-0 bg-white z-10">
        <tr className="text-gray-400 uppercase text-sm leading-normal font-medium">
          <th className="text-left py-2">Chapter Name</th>
          <th className="text-left py-2">Subject Name</th>
          <th className="text-left py-2">Chapter Code</th>
          <th className="text-center py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredChapters.map((chapter) => (
          <tr key={chapter._id} className="border-t-[0.5px] hover:bg-gray-50">
            <td className="py-3 text-sm whitespace-nowrap">{chapter.name}</td>
            <td className="py-3 text-gray-400 text-sm whitespace-nowrap">
              {chapter.subjectId?.name || "Unknown"}
            </td>
            <td className="py-3 text-gray-400 text-sm whitespace-nowrap">{chapter.code}</td>
            <td className="py-3 px-4 text-center relative whitespace-nowrap">
              <button
                onClick={(e) => togglePopover(chapter._id, e)}
                className="text-gray-400 hover:text-gray-800"
              >
                <span className="text-xl">⋮</span>
              </button>

              {openPopover === chapter._id && (
                <div
                  ref={popoverRef}
                  className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-0 right-[77px] w-24 z-10 py-1"
                >
                  <button
                    onClick={() => handleViewChapter(chapter)}
                    className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditChapter(chapter)}
                    className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteChapter(chapter._id)}
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

    </div>
  );
};

export default Chapters;




