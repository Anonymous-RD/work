import React from 'react';

function InputField({ label, placeholder }) {
  return (
    <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
      <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
        {label}
      </label>
      <input
        className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
}

export default InputField;