import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { fetchBestPractices, deleteBestPractice } from "../../api/api";
import { useHeader } from "../../components/context/HeaderContext";

const BestPractices = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { setTitle } = useHeader();
  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const popoverRef = useRef(null);

  const handleView = (practice) => {
    Swal.fire({
      title: "Best Practice Details",
      html: `
        <p><strong>Title:</strong> ${practice.title}</p>
        <p><strong>Status:</strong> ${practice.status ? "Published" : "Draft"}</p>
        <p><strong>Theme:</strong> ${practice.theme}</p>
        <p><strong>Publish Date:</strong> ${practice.publishDate}</p>
      `,
      confirmButtonColor: "#003765",
    });
  };

  const handleEdit = (practice) => {
    navigate("/editbestpractices", { state: { id: practice.id } });
  };

  const handleDelete = useCallback((practiceId) => {
    Swal.fire({
      title: "Are you sure you want to delete this practice?",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#003765",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteBestPractice(practiceId);
          if (response.message === "Bestpractice deleted successfully") {
            setData((prevData) => prevData.filter((practice) => practice.id !== practiceId));
            Swal.fire("Deleted!", response.message || "The practice has been deleted.", "success");
          } else {
            Swal.fire("Error", response.message || "Failed to delete the practice. Please try again.", "error");
          }
        } catch (error) {
          console.error("Error deleting practice:", error);
          Swal.fire("Error", "Failed to delete the practice. Please try again.", "error");
        }
      }
    });
  }, []);

  const toggleStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const togglePopover = (id) => {
    setOpenPopover(openPopover === id ? null : id);
  };

  useEffect(() => {
    setTitle('Best Practices');
    const fetchData = async () => {
      try {
        const response = await fetchBestPractices();
        const transformedData = response.data.map((practice) => ({
          id: practice._id,
          title: practice.title,
          status: practice.status === "Published",
          theme: practice.themes.map((theme) => theme.name).join(", "),
          publishDate: new Date(practice.createdAt).toLocaleDateString(),
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching best practices:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenPopover(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pt-20 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search for Best Practices"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border border-gray-300 w-full rounded-xl bg-[#F8F8F8]"
          />
          <LuSearch className="absolute h-[16px] w-[16px] left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
        <button
          onClick={() => navigate("/addbestpractices")}
          className="text-white bg-[#003765] px-4 py-2 rounded-xl flex items-center gap-2.5"
        >
          <FaPlus /> Add
        </button>
      </div>

      <div className="relative overflow-x-auto overflow-y-auto rounded-lg">
        <table className="table-auto w-full border-spacing-0">
          <thead className="text-[#929EAE] sticky top-0 z-0">
            <tr className="uppercase text-sm leading-normal font-medium">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-left">Theme</th>
              <th className="px-4 py-2 text-left">Publish Date</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t border-gray-300">
                <td className="px-4 py-2 text-sm text-black">{item.title}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <span className="text-[#78778B] text-sm mr-2">Un Publish</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.status}
                        onChange={() => toggleStatus(item.id)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#003765] rounded-full peer peer-checked:bg-[#003765] peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all`}
                      ></div>
                    </label>
                    <span className="text-[#78778B] text-sm ml-2">Publish</span>
                  </div>
                </td>
                <td className="text-[#78778B] px-4 py-2 text-sm">{item.theme}</td>
                <td className="text-[#1B212D] px-4 py-2 text-sm">{item.publishDate}</td>
                <td className="px-4 py-2 text-center relative">
                  <button
                    onClick={() => togglePopover(item.id)}
                    className="text-[#78778B] hover:text-gray-800"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {openPopover === item.id && (
                    <div
                      ref={popoverRef}
                      className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-0 right-[10px] w-28 z-10"
                    >
                      <button
                        onClick={() => handleView(item)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
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

export default BestPractices;
