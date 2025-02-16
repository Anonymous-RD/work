import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDistricts, deleteDistrict } from "@/redux/slices/districtSlice";
import { FaPlus } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";

const District = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();
  const { districts } = useSelector((state) => state.district);

  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const popoverRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

  const handleAddDistrict = () => {
    navigate("/adddistrict");
  };

  const handleViewDistrict = (district) => {
    Swal.fire({
      title: "District Details",
      html: `
        <p><strong>District Name:</strong> ${district.name}</p>
        <p><strong>District Code:</strong> ${district.code}</p>
      `,
      confirmButtonColor: "#C8EE44",
    });
  };

    const handleEditDistrict = (district) => {
    navigate("/editdistrict", { state: { district } });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      title: "Copied!",
      text: "District code has been copied to clipboard.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const togglePopover = (districtId) => {
    setOpenPopover(openPopover === districtId ? null : districtId);
  };

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  

  useEffect(() => {
    setMetadata({
      title: "Districts",
      backPath: "/administrative",
    });
  }, [setMetadata]);

  return (
    <div className="pr-6 pt-0 max-w-10xl mx-auto">
      {/* Search and Add District */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search Districts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border text-[#929EAE] border-[#F5F5F5] w-[80%]  rounded-xl bg-[#F8F8F8] focus:outline-none focus:border-gray-400"
          />
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#363A3F]" />
        </div>
        <button
          onClick={handleAddDistrict}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-[#C8EE44] hover:bg-orange-300 rounded-xl"
        >
          <FaPlus /> Add District
        </button>
      </div>

      <div className="relative overflow-x-auto overflow-y-auto rounded-lg max-h-[70vh]">
        <table className="min-w-full table-auto border-spacing-0">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-[#929EAE] uppercase text-sm leading-normal font-medium">
              <th className="py-2 text-left">District Name</th>
              <th className="py-2 text-left">District Code</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDistricts.map((district) => (
              <tr
                key={district._id}
                className="border-b hover:bg-gray-50 h-16"
              >
                <td className="py-2 text-[#1B212D] text-sm font-medium ">
                  {district.name}
                </td>
                <td className=" text-[#929EAE] py-2  gap-2 text-sm ">
                  {district.code}
                  <button
                    onClick={() => handleCopyCode(district.code)}
                    className="text-[#DADADA] hover:text-gray-600"
                  >
                    <MdContentCopy />
                  </button>
                </td>
                <td className="px-4 py-2 text-center relative">
                  <button
                    onClick={() => togglePopover(district._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <span
                      className="text-xl "
                    >
                      ⋮
                    </span>

                  </button>
                  {openPopover === district._id && (
                    <div
                      ref={popoverRef}
                      className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-1 right-[110px] w-28 z-10 py-1  "
                    >
                      <button
                        onClick={() => handleViewDistrict(district)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                          onClick={() => handleEditDistrict(district)}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure you want to delete this district?",
                            showCancelButton: true,
                            confirmButtonColor: "#C8EE44",
                            cancelButtonColor: "#C8EE44",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(deleteDistrict(district._id));
                            }
                          });
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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

export default District;











