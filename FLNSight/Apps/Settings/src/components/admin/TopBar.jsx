import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoArrowBackOutline } from "react-icons/io5";
import { useHistoryContext } from "../../context/HistoryContext";
import { usePageMetadata } from "../../context/PageMetadataContext";

const TopBar = ({ icon, onIconClick }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const location = useLocation(); // Get the current route location
  const [pageData, setPageData] = useState("");
  // const { previousUrl } = useHistoryContext();
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
    <header className="flex flex-wrap gap-10 justify-between items-center w-full mr-3 max-md:max-w-full p-2 mt-6 bg-white ">
      <div className="flex justify-around self-stretch my-auto text-3xl font-semibold ml-6">
        <div className="flex items-center gap-4">
          {backPath ? (
            <button onClick={handleGoBack} className=" ml-2">
              <IoArrowBackOutline size={34} />
            </button>
          ) : (
            <h1 className="text-3xl font-semibold text-gray-800 ml-4">
              {title}
            </h1>
          )}
          {backPath && (
            <h1 className="text-3xl font-semibold text-gray-800 ml-4">
              {title}
            </h1>
          )}
        </div>
      </div>

      <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
        <nav className="flex gap-10 items-start self-stretch my-auto">
          <button
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
          </button>
          <div className="relative">
            <button
              aria-label="Notification"
              className="focus:outline-none focus:ring-2 focus:ring-[#C8EE44]"
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
