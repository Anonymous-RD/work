import * as React from "react";

export function SelectInput({ label, placeholder }) {
  const selectId = `${label.toLowerCase().replace(/\s/g, "-")}-select`;

  return (
    <div className="flex flex-col justify-center w-[391px] xl:w-[391px] lg:w-[310px] md:w-[210px] 2xl:w-[391px]">
      <label
        htmlFor={selectId}
        className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
      >
        {label}
      </label>
      <div className="flex overflow-hidden gap-10 justify-between items-center py-3 pr-5 pl-6 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 min-h-[48px] max-md:pl-5">
        <select
          id={selectId}
          className="w-full bg-transparent border-none outline-none object-contain shrink-0 self-stretch my-auto aspect-squar"
          aria-label={placeholder}
        >
          <option value="">{placeholder}</option>
        </select>
      </div>
    </div>
  );
}

// import * as React from "react";
// export function SelectInput({ label, placeholder, options = [] }) {
//   const selectId = `${label.toLowerCase().replace(/\s/g, "-")}-select`;

//   return (
//     <div className="flex flex-col">
//       <label htmlFor={selectId} className="mb-2 text-gray-800 font-medium">
//         {label}
//       </label>
//       <select
//         id={selectId}
//         className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
//         aria-label={placeholder}
//       >
//         <option value="" disabled selected>
//           {placeholder}
//         </option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }