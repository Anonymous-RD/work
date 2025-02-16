import * as React from "react";

const TableHeader = () => {
  const headers = [
    { label: "Student Name", width: "w-[237px]" },
    { label: "Roll No.", width: "w-[123px]" },
    { label: "Class", width: "w-[148px]" },
    { label: "Year", width: "w-[148px]" },
    { label: "Father Name", width: "w-[158px]" },
    { label: "ACTION", width: "" },
  ];

  return (
    <div className="flex flex-wrap gap-8 items-center text-xs font-semibold text-gray-400 uppercase">
      <div className="self-stretch my-auto w-[30px] m" role="columnheader" tabIndex={0}>
        <input type="checkbox" className="w-5 h-5 accent-lime-300 ml-1" />
      </div>
      {headers.map((header, index) => (
        <div
          key={index}
          className={`self-stretch my-auto ${header.width}`}
          role="columnheader"
          tabIndex={0}
        >
          {header.label}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;