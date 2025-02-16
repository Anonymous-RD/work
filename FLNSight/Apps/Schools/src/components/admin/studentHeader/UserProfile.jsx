// import * as React from "react";

// export function UserProfile({ avatarSrc, name, dropdownIconSrc }) {
//   return (
//     <div 
//       className="flex gap-10 justify-between items-center self-stretch py-1.5 pr-4 pl-2 my-auto text-sm font-semibold text-gray-800 bg-neutral-50 rounded-[100px] w-[215px]"
//       role="button"
//       tabIndex={0}
//     >
//       <div className="flex gap-3 items-center self-stretch my-auto">
//         <img
//           loading="lazy"
//           src={avatarSrc}
//           alt={`${name}'s profile picture`}
//           className="object-contain shrink-0 self-stretch my-auto w-9 rounded-full aspect-square"
//         />
//         <div className="self-stretch my-auto">{name}</div>
//       </div>
//       <img
//         loading="lazy"
//         src={dropdownIconSrc}
//         alt=""
//         className="object-contain shrink-0 self-stretch my-auto aspect-square w-[17px]"
//       />
//     </div>
//   );
// }