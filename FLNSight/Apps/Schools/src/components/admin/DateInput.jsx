import * as React from "react";

export function DateInput({ label, value }) {
  const dateId = `${label.toLowerCase().replace(/\s/g, "-")}-date`;

  return (
    <div className="flex flex-col grow shrink w-[391px] xl:w-[391px] lg:w-[310px] md:w-[210px] 2xl:w-[391px]">
      <label
        htmlFor={dateId}
        className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800"
      >
        {label}
      </label>
      <div className="flex gap-10 justify-between items-center px-6 py-3.5 w-full text-gray-800 whitespace-nowrap rounded-xl border border-solid border-neutral-100 max-md:px-5">
        <input
          type="date"
          id={dateId}
          value={value}
          className="w-full bg-transparent border-none outline-none object-contain shrink-0 self-stretch my-auto aspect-squar"
          aria-label={label}
        />
      </div>
    </div>
  );
}

// import * as React from "react";

// export function DateInput({ label, value }) {
//   const dateId = `${label.toLowerCase().replace(/\s/g, "-")}-date`;

//   return (
//     <div className="flex flex-col">
//       <label htmlFor={dateId} className="mb-2 text-gray-800 font-medium">
//         {label}
//       </label>
//       <input
//         type="date"
//         id={dateId}
//         value={value}
//         className="px-6 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black"
//         aria-label={label}
//       />
//     </div>
//   );
// }


