import * as React from "react";

export function FormInput({ label, placeholder, type = "text" }) {
  const inputId = `${label.toLowerCase().replace(/\s/g, "-")}-input`;

  return (
    <div className="flex flex-col justify-center w-[391px] xl:w-[391px] lg:w-[310px] md:w-[210px] 2xl:w-[391px]">
      <label htmlFor={inputId} className="gap-2.5 py-2.5 pr-2.5 text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={inputId}
        placeholder={placeholder}
        className="px-6 pt-4 pb-4 text-black rounded-xl border border-solid border-neutral-100 max-md:px-5"
        aria-label={placeholder}
      />
    </div>
  );
}


// import * as React from "react";

// export function FormInput({ label, placeholder, type = "text" }) {
//   const inputId = `${label.toLowerCase().replace(/\s/g, "-")}-input`;

//   return (
//     <div className="flex flex-col">
//       <label htmlFor={inputId} className="mb-2 text-gray-800 font-medium">
//         {label}
//       </label>
//       <input
//         type={type}
//         id={inputId}
//         placeholder={placeholder}
//         className="px-6 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
//         aria-label={placeholder}
//       />
//     </div>
//   );
// }
