import React, { useState, useEffect } from "react";

function NoUserModal({open,setOpen}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const closeModal = () => setOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  // Add or remove the "overflow-hidden" class on <body> when modal state changes
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <div>
     

      {/* Modal */}
      {open && (
        <div
          id="modal-overlay"
          className="fixed font-[600] inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 "
          onClick={handleOverlayClick} // Close modal if clicked outside content
        >
          <div className="relative p-10 w-full max-w-md max-h-full bg-white shadow dark:bg-gray-700 rounded-[20px]">
     
            
            {/* Modal Content */}
            <div className="flex flex-col items-center gap-3">
                {svgs.mail}
              <h3 className="text-3xl tracking-wide">
              User does not exist
              </h3>
              <h5 className="text-[#78778B] font-normal tracking-wide text-center text-nowrap text-sm">
              <p>User with the email address xyz@email.com does not exits.</p>
              <p>You can invite this email address.</p>
              </h5>
              <button className="bg-[#C8EE44] w-[90%] rounded-xl text-[600] py-3" onClick={()=>{setOpen(false);navigate("/schools")}}>Invite</button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoUserModal;

const svgs={
    mail:<svg className="mb-3" width="59" height="47" viewBox="0 0 59 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M52.833 11.8332L29.4997 26.4165L6.16634 11.8332V5.99984L29.4997 20.5832L52.833 5.99984M52.833 0.166504H6.16634C2.92884 0.166504 0.333008 2.76234 0.333008 5.99984V40.9998C0.333008 42.5469 0.947589 44.0307 2.04155 45.1246C3.13551 46.2186 4.61924 46.8332 6.16634 46.8332H52.833C54.3801 46.8332 55.8638 46.2186 56.9578 45.1246C58.0518 44.0307 58.6663 42.5469 58.6663 40.9998V5.99984C58.6663 2.76234 56.0413 0.166504 52.833 0.166504Z" fill="black"/>
    </svg>
    
}