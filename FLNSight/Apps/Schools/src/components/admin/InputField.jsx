import * as React from "react";

export function InputField({ label, placeholder, type = "text" }) {
  const inputId = `${label.toLowerCase().replace(/\s/g, "")}-input`;

  return (
    <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
      <label
        htmlFor={inputId}
        className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800"
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
        aria-label={label}
      />
    </div>
  );
}
