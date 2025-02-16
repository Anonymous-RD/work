import * as React from "react";

function SelectField({ label, value, icon }) {
  return (
    <div className="flex relative items-start text-base w-[164px]">
      <div className="flex z-0 gap-2.5 items-start px-3.5 pt-6 pb-3 leading-none bg-white rounded-md border border-gray-300 border-solid text-neutral-800 w-[164px]">
        <div className="overflow-hidden pr-11 mt-1">{value}</div>
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 w-3 aspect-square"
        />
      </div>
      <div className="overflow-hidden absolute -left-2 right-3 pt-3 pr-24 pb-3.5 pl-3 whitespace-nowrap bottom-[15px] text-neutral-700 top-[-7px] max-md:pr-5">
        {label}
      </div>
    </div>
  );
}

export default SelectField;