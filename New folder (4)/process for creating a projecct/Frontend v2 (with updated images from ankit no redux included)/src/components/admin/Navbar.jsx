import React from "react";
import IconButton from "./IconButton";
import UserProfile from "./UserProfile";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center my-[8px]">
      <h1 className="self-stretch my-auto text-2xl font-semibold text-gray-800">
        Schools
      </h1>
      <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
        <nav className="flex gap-10 items-start self-stretch my-auto">
          <FaSearch fontSize={24} color="#929EAE" />
          <IoNotifications fontSize={24} color="#929EAE" />
        </nav>
        <UserProfile
          name="Ankit Mishra"
          avatarSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f52eace64b748da9c5a96fb171e9805eea99a1e9e46ccddfa1b7312d7218694f?apiKey=f51901baccc24439aead257086232989&"
          dropdownIconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e05d33781c28f5d18d7023f081ef6cddc437e47b3cd660b27d58eab338d3ad7f?apiKey=f51901baccc24439aead257086232989&"
        />
      </div>
    </header>
  );
};

export default Navbar;
