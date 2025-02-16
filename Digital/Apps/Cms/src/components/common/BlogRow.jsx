import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const BlogRow = React.memo(({ item, onView, onEdit, onDelete, onToggleStatus }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => {
    setOpenPopover(!openPopover);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <tr key={item.id} className="border-t border-gray-300">
      <td className="px-4 py-2 text-sm text-black">{item.title}</td>
      <td className="px-4 py-2">
        <div className="flex items-center justify-center">
          <span className="text-[#78778B] text-sm mr-2">Draft</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => onToggleStatus(item.id)}
              className="sr-only peer"
            />
            <div
              className={`w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#003765] rounded-full peer peer-checked:bg-[#003765] peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all`}
            ></div>
          </label>
          <span className="text-[#78778B] text-sm ml-2">Publish</span>
        </div>
      </td>
      <td className="text-[#78778B] px-4 py-2 text-sm">{item.author}</td>
      <td className="text-[#78778B] px-4 py-2 text-sm">{item.theme}</td>
      <td className="text-[#1B212D] px-4 py-2 text-sm">{item.publishDate}</td>
      <td className="px-4 py-2 text-center relative">
        <button
          onClick={togglePopover}
          className="text-[#78778B] hover:text-grxay-800"
        >
          <BsThreeDotsVertical />
        </button>
        {openPopover && (
          <div
            ref={popoverRef}
            className="absolute bg-white shadow-lg rounded-lg mt-2 right-0 z-10 w-32"
          >
            <button
              onClick={() => onView(item)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              View
            </button>
            <button
              onClick={() => onEdit(item)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
});

export default BlogRow;