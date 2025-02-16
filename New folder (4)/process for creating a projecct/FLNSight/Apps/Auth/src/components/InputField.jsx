import React from "react";

function InputField({ label, type, placeholder, onchange }) {
  return (
    <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium mb-4">
      <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100"
      />
    </div>
  );
}

export default InputField;
