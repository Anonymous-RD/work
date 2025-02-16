import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoArrowBackOutline } from "react-icons/io5";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { IoNotificationsSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

const TopBar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useSelector((state) => state.userDetails);

  console.log("User name", user.name);

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const navigate = useNavigate();
  const { metadata } = usePageMetadata();
  const { title, backPath } = metadata;

  const handleGoBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1); // Go to the previous page
    }
  };

  return (
    <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full pb-2 px-0 pt-6 bg-white ">
      <div className="flex justify-around self-stretch my-auto text-3xl font-semibold">
        <div className="flex items-center gap-4">
          {backPath ? (
            <button onClick={handleGoBack} className=" ">
              <IoArrowBackOutline size={24} />
            </button>
          ) : (
            <h1 className="text-2xl font-semibold text-[#1B212D] ">{title}</h1>
          )}
          {backPath && (
            <h1 className="text-2xl font-semibold text-[#1B212D] ">{title}</h1>
          )}
        </div>
      </div>

      <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
        <nav className="flex gap-10 items-start self-stretch my-auto">
          {/* <button
            aria-label="Search"
            className="focus:outline-none focus:ring-2 focus:ring-[#C8EE44]"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}
          <div className="relative">
            <button
              aria-label="Notification"
              className="focus:outline-none focus:ring-2 focus:ring-[#C8EE44] h-6 w-6 mt-1"
              onClick={toggleNotification}
            >
              <IoNotificationsSharp size={26} className="text-gray-400" />
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
              <div class="w-[35px] h-[35px] rounded-full bg-[#C8EE44] text-black flex justify-center items-center text-[18px]">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>

              <span className="self-stretch my-auto text-lg">{user.name}</span>
            </div>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
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
