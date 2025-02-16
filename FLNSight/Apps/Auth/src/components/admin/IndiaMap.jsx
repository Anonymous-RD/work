// import { useState } from "react";
// import { SVGMap } from "react-svg-map";

// const IndiaMapData = {
//   label: "India Map",
//   viewBox: "0 0 950 1000",
//   locations: [
//     {
//       name: "Uttar Pradesh",
//       id: "UP",
//       path: "M450.2 320.5l-5.7 8.9-4.1 11.4 2.4 15.5 4.9 12.2 7.3 10.6 1.6 14.6-1.6 13.8-4.9 8.9-4.1 11.4-4.9 8.9-4.1 11.4-4.9 8.9-4.1 11.4-4.9 8.9z",
//     },
//     {
//       name: "Delhi",
//       id: "DL",
//       path: "M420.5 290.8l-2.4 4.1-1.6 4.9 0.8 6.5 2.4 4.9 3.3 4.1 0.8 5.7-0.8 5.7-2.4 3.3-1.6 4.9-2.4 3.3-1.6 4.9-2.4 3.3z",
//     },
//     {
//       name: "Andhra Pradesh",
//       id: "AP",
//       path: "M317.7 637.8l-4.9 10.6-4.1 11.4 3.3 18.7 5.7 11.4 8.1 11.4 0.8 13.8-0.8 13.8-4.9 8.9-4.1 11.4-4.9 8.9-4.1 11.4-4.9 8.9z",
//     },
//     {
//       name: "Karnataka",
//       id: "KA",
//       path: "M206.7 648.4l-4.9 10.6-4.1 11.4 3.3 18.7 5.7 11.4 8.1 11.4 0.8 13.8-0.8 13.8-4.9 8.9-4.1 11.4-4.9 8.9-4.1 11.4-4.9 8.9z",
//     },
//   ],
// };

// const IndiaMap = () => {
//   const [selectedState, setSelectedState] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleLocationClick = (event) => {
//     const stateName = event.target.getAttribute("name");
//     setSelectedState(stateName);
//   };

//   const handleSearch = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);

//     const state = IndiaMapData.locations.find((location) =>
//       location.name.toLowerCase().includes(value.toLowerCase())
//     );
//     if (state) {
//       setSelectedState(state.name);
//     } else {
//       setSelectedState("");
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4 h-full">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search state..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="relative w-full aspect-square">
//         <SVGMap
//           map={IndiaMapData}
//           onLocationClick={handleLocationClick}
//           className="w-full h-full"
//           locationClassName={(location) =>
//             `${
//               location.name === selectedState
//                 ? "fill-blue-500"
//                 : "fill-gray-200 hover:fill-blue-300"
//             }
//              transition-colors duration-300 cursor-pointer
//              ${
//                selectedState && location.name !== selectedState
//                  ? "opacity-50"
//                  : ""
//              }`
//           }
//         />
//       </div>

//       {selectedState && (
//         <div className="mt-4 text-center">
//           <p className="text-lg font-semibold text-gray-800">
//             Selected State: {selectedState}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IndiaMap;
