import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotifyModal({open, setOpen,name,email}) {
const [apiResponse, setApiResponse] = useState();
const navigate = useNavigate();
const fetchUserDetails = async () => {
  
    try {
      const response = await axios.get(
        `https://us-central1-firecmsdemo.cloudfunctions.net/userdetails/search?query=${email}`
      );
      setApiResponse(response.data);
      console.log(apiResponse)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }

};
  useEffect(() => {
    

    if (email)fetchUserDetails();
  }, []);

  useEffect(() => {
    console.log(apiResponse)
  }, [apiResponse])
  

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
      {(
        <div
          id="modal-overlay"
          className={`${open?"flex":"hidden"} fixed font-[600] inset-0 z-50 items-center justify-center w-full h-full bg-black bg-opacity-60 `}
          onClick={handleOverlayClick} // Close modal if clicked outside content
        >
          <div className="relative p-10 py-14 w-full max-w-md max-h-full bg-white shadow dark:bg-gray-700 rounded-[20px]">
     
            
            {/* Modal Content */}
            <div className="flex flex-col items-center gap-4">
             
              <div className="flex gap-5 items-center">
                    <img src="https://picsum.photos/id/237/200/300" className="rounded-full h-14 w-14"/>
                  <div className="font-[500] tracking-wide text-nowrap ">
                  {name || "Loading..."}
                  <p className="text-[#929EAE] text-xl"> {email || "Fetching email..."}</p>
                  </div>
              </div>
              <p className="text-[#929EAE] text-[13px] text-nowrap font-normal">User with the email address {email} exists.</p>
              <button className="bg-[#C8EE44] w-full rounded-xl text-[600] py-3"  onClick={()=>{setOpen(false);navigate("/schools")}}>Notify</button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotifyModal;

const svgs={
    mail:<svg className="mb-3" width="59" height="47" viewBox="0 0 59 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M52.833 11.8332L29.4997 26.4165L6.16634 11.8332V5.99984L29.4997 20.5832L52.833 5.99984M52.833 0.166504H6.16634C2.92884 0.166504 0.333008 2.76234 0.333008 5.99984V40.9998C0.333008 42.5469 0.947589 44.0307 2.04155 45.1246C3.13551 46.2186 4.61924 46.8332 6.16634 46.8332H52.833C54.3801 46.8332 55.8638 46.2186 56.9578 45.1246C58.0518 44.0307 58.6663 42.5469 58.6663 40.9998V5.99984C58.6663 2.76234 56.0413 0.166504 52.833 0.166504Z" fill="black"/>
    </svg>
    
}