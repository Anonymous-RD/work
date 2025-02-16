import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TopBar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const navigate=useNavigate()
  
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full p-2 py-5 pt-7 bg-white kumbhsans pr-7">
      <h1 className="self-stretch my-auto text-2xl font-semibold text-gray-800">
        {/* Study Data */}
        <div className="flex gap-3 px-1">
        {["invite","edit"].includes(location.pathname.split('/').filter(Boolean).pop()) && <button onClick={()=>navigate("/users")}>{svgs.arrow}</button>}
          <h2>{location.pathname.split('/').filter(Boolean).pop().replace(/^./, char => char.toUpperCase())}</h2>
        </div>
      </h1>
      <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
        <nav className="flex gap-10 items-start self-stretch my-auto">
          <button
            aria-label="Search"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#929EAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.0004 21L16.6504 16.65" stroke="#929EAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
          <div className="relative">
            <button
              aria-label="Notification"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleNotification}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/271ac42c129898f321f665c647f56bdfe70792ec04b6be062f30bb60f8ef278c?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1"
                alt=""
                className="object-contain shrink-0 w-6 aspect-square"
              />
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Notification 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Notification 2
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className="relative">
          <div
            className="flex gap-10 justify-between items-center self-stretch py-1.5 pr-4 pl-2 my-auto text-sm font-semibold text-gray-800 bg-neutral-50 rounded-[100px] w-[215px] cursor-pointer"
            onClick={toggleProfile}
          >
            <div className="flex gap-3 items-center self-stretch my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/236f0d00021b5bf4bc78d634f149642ae74e93de4a6bdb79941dc4854ff9babd?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1"
                alt="Vibhan Nabil"
                className="object-contain shrink-0 self-stretch my-auto w-9 rounded-full aspect-square"
              />
              <span className="self-stretch my-auto">Vibhan Nabil</span>
            </div>
            <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.69281 0.293945H5.27989H1.30612C0.626122 0.293945 0.286122 1.11561 0.767789 1.59729L4.43698 5.26645C5.02489 5.85437 5.98114 5.85437 6.56906 5.26645L7.96448 3.87104L10.2382 1.59729C10.7128 1.11561 10.3728 0.293945 9.69281 0.293945Z" fill="#1B212D"/>
</svg>

          </div>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;


const svgs={
  arrow:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.0002 6.99996V8.99996H4.00016L9.50016 14.5L8.08016 15.92L0.160156 7.99996L8.08016 0.0799561L9.50016 1.49996L4.00016 6.99996H16.0002Z" fill="black"/>
  </svg>
  
}