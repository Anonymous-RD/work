import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DeleteModal({ onConfirm, open, setOpen,name }) {
  const [visible, setVisible] = useState(false); // Controls animation visibility
  const { loading } = useSelector(
    (state) => state.deleteUser
  );
  useEffect(() => {
    if (open) {
      setVisible(true); // Trigger animation on open
    } else {
      const timeout = setTimeout(() => setVisible(false), 300); // Wait for animation to finish before unmounting
      return () => clearTimeout(timeout); // Cleanup on component unmount
    }
  }, [open]);

  const closeModal = () => setOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <>
      {visible && (
        <div
          id="modal-overlay"
          className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 cursor-default transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleOverlayClick} // Detect clicks on overlay
        >
          <div
            className={`relative p-4 w-full max-w-md max-h-full bg-white shadow dark:bg-gray-700 rounded-[20px] transform transition-transform duration-300 ${
              open ? "scale-100" : "scale-90"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent event propagation to overlay
          >
            <div className="text-center py-3">
              <h3 className="mb-7 text-3xl tracking-wide font-[600]">
                Are you sure you want to delete this user?
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-black bg-[#C8EE44] mr-10 hover:bg-orange-300 rounded-xl !outline-none  font-medium text-sm inline-flex items-center px-12 py-3 text-center"
              >
                No
              </button>
              <button
                onClick={() => {
                  onConfirm();
                 
                }}
                type="button"
                className="text-black bg-[#C8EE44] hover:bg-orange-300 rounded-xl font-medium text-sm inline-flex items-center px-12 py-3 text-center"
              >
                {loading?"Deleting..":"Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
