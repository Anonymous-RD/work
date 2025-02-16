import React from 'react';

export function InputField({ label, placeholder, type, value }) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col grow shrink justify-center w-[318px] max-w-full">
      <label htmlFor={inputId} className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800">
        {label}
      </label>
      {type === 'select' ? (
        <div className="flex overflow-hidden gap-10 justify-between items-center py-3 pr-5 pl-6 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 min-h-[48px]">
          <select id={inputId} className="w-full bg-transparent border-none outline-none">
            <option value="">{placeholder}</option>
          </select>
        </div>
      ) : type === 'date' ? (
        <div className="flex gap-10 justify-between items-center px-6 py-3.5 w-full text-gray-800 whitespace-nowrap rounded-xl border border-solid border-neutral-100">
          <input
            type="date"
            id={inputId}
            value={value}
            className="w-full bg-transparent border-none outline-none"
          />
        </div>
      ) : (
        <input
          type={type}
          id={inputId}
          placeholder={placeholder}
          className="gap-6 px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100"
        />
      )}
    </div>
  );
}