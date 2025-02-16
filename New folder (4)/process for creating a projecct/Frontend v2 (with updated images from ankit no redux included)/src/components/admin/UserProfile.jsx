import React from "react";

const UserProfile = ({ name, avatarSrc, dropdownIconSrc }) => {
  return (
    <div className="flex gap-10 justify-between items-center self-stretch py-1.5 pr-4 pl-2 my-auto text-sm font-semibold text-gray-800 bg-neutral-50 rounded-[100px] w-[215px]">
      <div className="flex gap-3 items-center self-stretch my-auto">
        <img
          src={avatarSrc}
          alt={`${name}'s avatar`}
          className="object-contain shrink-0 self-stretch my-auto w-9 rounded-full aspect-square"
          loading="lazy"
        />
        <span className="self-stretch my-auto">{name}</span>
      </div>
      <button
        aria-label="Open user menu"
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <img
          src={dropdownIconSrc}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[17px]"
          loading="lazy"
        />
      </button>
    </div>
  );
};

export default UserProfile;
