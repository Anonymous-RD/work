import React, { useState, useRef, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlocks, deleteBlock } from "@/redux/slices/blockSlice";
import { FaPlus } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";

const Blocks = () => {
  const navigate = useNavigate(); 
  const [openPopover, setOpenPopover] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { setMetadata } = usePageMetadata();

  const popoverRef = useRef(null);
  const dispatch = useDispatch();
  const { blocks } = useSelector((state) => state.block);

  useEffect(() => {
    dispatch(fetchBlocks());
  }, [dispatch]);

  const handleAddBlock = () => {
    navigate("/addblock");
  };

  const handleViewBlock = (block) => {
    Swal.fire({
      title: "Block Details",
      html: `<p><strong>Name:</strong> ${block.name}</p><p><strong>District:</strong> ${block.district}</p><p><strong>Code:</strong> ${block.code}</p>`,
      confirmButtonColor: "#C8EE44",
    });
  };

  const handleEditBlock = (block) => {
    navigate(`/editblock`, { state: { block } });
  };


  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      title: "Copied!",
      text: "Block code has been copied to clipboard.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const togglePopover = (blockId, event) => {
    event.stopPropagation(); 
    setOpenPopover(openPopover === blockId ? null : blockId);
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

  const filteredBlocks = blocks.filter((block) =>
    block.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setMetadata({
      title: "Blocks/Zones",
      backPath: "/administrative",
    });
  }, [setMetadata]);

  return (
    <div className=" pr-6 pt-0 max-w-10xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 w-[80%] transform -translate-y-1/2 text-[#363A3F]">
            <LuSearch />
          </span>
          <input
            type="text"
            placeholder="Search Blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border text-[#929EAE] border-[#F5F5F5] w-[80%]  rounded-xl bg-[#F8F8F8] focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          onClick={handleAddBlock}
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
        >
          <FaPlus /> Add Block
        </button>
      </div>

      {/* Blocks Table */}
      <div className="relative overflow-x-auto overflow-y-auto rounded-lg max-h-[70vh] bg-white shadow-sm">
  <table className="min-w-full table-auto">
    <thead>
      <tr className="text-[#929EAE]  uppercase text-sm leading-normal font-medium">
        <th className="text-left py-2">Block Name</th>
        <th className="text-left py-2">District Name</th>
        <th className="text-left py-2">Block Code</th>
        <th className="text-center py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredBlocks.map((block) => (
        <tr key={block._id} className="border-t-[0.5px] hover:bg-gray-50">
          <td className="py-3 text-sm whitespace-nowrap text-[#1B212D]">{block.name}</td>
          <td className="py-3 text-[#78778B] text-sm whitespace-nowrap">
            {block.districtId?.name}
          </td>
          <td className="py-3 text-[#929EAE] flex items-center gap-2 text-sm whitespace-nowrap">
            {block.code}
            <button
              onClick={() => handleCopyCode(block.code)}
              className="text-[#DADADA] hover:text-gray-600"
            >
              <MdContentCopy />
            </button>
          </td>
          <td className="py-3 px-4 text-center relative whitespace-nowrap">
            <button
              onClick={(e) => togglePopover(block._id, e)}
              className="text-gray-400 hover:text-gray-800"
            >
              <span className="text-xl">⋮</span>
            </button>
            {openPopover === block._id && (
              <div
                ref={popoverRef}
                className="absolute overflow-hidden bg-white shadow-2xl rounded-xl mt-0 right-[73px] w-24 z-10 py-1"
              >
                <button
                  onClick={() => handleViewBlock(block)}
                  className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditBlock(block)}
                  className="block w-full px-3 py-1 text-left text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to delete this block?",
                      showCancelButton: true,
                      textColor: "black",
                      confirmButtonColor: "#C8EE44",
                      cancelButtonColor: "#C8EE44",
                      confirmButtonText: "<span style='color: black'>YES</span>",
                      cancelButtonText: "<span style='color: black'>NO</span>",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteBlock(block._id));
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

export default Blocks;
