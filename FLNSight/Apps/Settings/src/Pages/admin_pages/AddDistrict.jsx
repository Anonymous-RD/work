import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDistrict, createDistrictsBulk } from "@/redux/slices/districtSlice";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";
import { readFile } from "@/utils/fileUpload";
import { processCSV } from "@/utils/csvProcessor";

const AddDistrict = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMetadata } = usePageMetadata();

  const [districtName, setDistrictName] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [errors, setErrors] = useState({});
  const [isBulkAdd, setIsBulkAdd] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const existingDistricts = useSelector((state) => state.district.districts || []);

  const validateForm = () => {
    const formErrors = {};

    if (!districtName) formErrors.districtName = "District Name is required";
    if (!districtCode) formErrors.districtCode = "District Code is required";

    const isDuplicateName = existingDistricts.some(
      (district) => district.name.toLowerCase() === districtName.toLowerCase()
    );
    const isDuplicateCode = existingDistricts.some(
      (district) => district.code.toLowerCase() === districtCode.toLowerCase()
    );

    if (isDuplicateName) formErrors.districtName = "District Name already exists";
    if (isDuplicateCode) formErrors.districtCode = "District Code already exists";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddDistrict = () => {
    if (!validateForm()) return;

    setLoading(true); // Prevent multiple submissions
    dispatch(createDistrict({ name: districtName, code: districtCode }))
      .unwrap()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `District (${districtName}) added successfully!`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/districts");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to add district.",
        });
      })
      .finally(() => {
        setLoading(false); // Re-enable button
      });
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    readFile(uploadedFile, (fileContent) => {
      try {
        const requiredFields = ["name", "code"];
        const { headers, dataRows } = processCSV(fileContent, requiredFields);
        setUsers(dataRows);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "CSV file processed successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    });
  };

  const handleSubmitUsers = () => {
    if (users.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No data to process. Please upload a valid CSV file.",
      });
      return;
    }

    setLoading(true);
    dispatch(
      createDistrictsBulk({
        checkField: selectedField,
        datas: users,
      })
    )
      .unwrap()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bulk districts added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setUsers([]);
        navigate("/districts");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to process bulk upload.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setMetadata({
      title: "Add Districts",
      backPath: "/districts",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 pl-0 pt-0 max-w-10xl mx-auto overflow-y-auto">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>

      {/* Bulk Add Toggle */}
      <div className="flex items-center mb-8">
        <span className="text-[#000000] font-medium mr-3">Bulk Add</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isBulkAdd}
            onChange={() => setIsBulkAdd(!isBulkAdd)}
          />
          <div className="w-14 h-7 bg-[#EFEFEF] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#EFEFEF] rounded-full peer peer-checked:bg-[#c8ee44] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-[#DBDBDB] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>

      {isBulkAdd ? (
         <div>
         <div className="text-xl flex flex-col items-center">
           <div className="flex flex-col items-center px-11 pt-2 pb-4 max-w-full text-black rounded-xl border border-dashed border-neutral-100 w-[350px] max-md:px-5">
             <img
               loading="lazy"
               src="/cloud-arrow.png"
               alt=""
               className="object-contain aspect-square w-[74px]"
             />
             <div className="mt-3 text-center w-full">
               Please upload CSV file to import data in bulk
             </div>
             <label className="gap-2.5 px-12 py-2 mt-3 w-[250px] bg-[#C8EE44] rounded-xl min-h-[50px] max-md:px-5 text-center cursor-pointer">
               Browse File
               <input
                 type="file"
                 accept=".csv"
                 className="hidden"
                 onChange={handleFileUpload}
               />
             </label>
           </div>
           <a
             href="/sample.csv"
             download
             className="gap-2.5 py-3 mt-8 text-black rounded-lg underline text-center"
             tabIndex="0"
             aria-label="Download sample CSV file"
           >
             Click here to download sample CSV file
           </a>
           <div className="flex flex-col justify-center mt-8 max-w-full w-[398px]">
             <label
               htmlFor="primaryColumn"
               className="gap-2.5 py-2.5 w-full text-gray-800 text-sm font-semibold"
             >
               Primary Column (This column will be used to check duplicacy)
             </label>
             <select
               id="primaryColumn"
               className="block w-full bg-white border border-neutral-100 text-zinc-800 py-3.5 px-4 pr-8 rounded-xl"
               value={selectedField}
               onChange={(e) => setSelectedField(e.target.value)}
             >
               <option value="code">District Code</option>
               <option value="name">District Name</option>
             </select>
           </div>
         </div>
         <button
           onClick={handleSubmitUsers}
           className="mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
           disabled={loading}
         >
           {loading ? "Processing..." : "Add"}
         </button>
       </div>
      ) : (
        <div className="bg-white  rounded-lg">
          <div className="flex justify-start w-[72%]">
          <div className="w-1/2 pr-3">
            <label className="block text-[#1B212D] text-sm font-medium mb-2">
              District Name
            </label>
            <input
              type="text"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              placeholder="Enter District Name"
              className={`w-full py-2 px-3 border focus:outline-none focus:border-gray-400 ${
                errors.districtName ? "border-red-500" : "border-gray-300"
              } rounded-xl`}
            />
            {errors.districtName && (
              <p className="text-red-500 text-sm mt-1">{errors.districtName}</p>
            )}
          </div>
          <div className="w-1/2 pl-3">
            <label className="block text-[#1B212D] text-sm font-medium mb-2">
              District Code
            </label>
            <input
              type="text"
              value={districtCode}
              onChange={(e) => setDistrictCode(e.target.value)}
              placeholder="Enter District Code"
              className={`w-full py-2 px-3 border focus:outline-none focus:border-gray-400 ${
                errors.districtCode ? "border-red-500" : "border-gray-300"
              } rounded-xl`}
            />
            {errors.districtCode && (
              <p className="text-red-500 text-sm mt-1">{errors.districtCode}</p>
            )}
          </div>
        </div>
      </div>
      )}
        <div className="mt-16">
        <hr className=" mb-6 border-gray-200" />
          <button
            onClick={handleAddDistrict}
            className="px-8 py-3 bg-[#c8EE44] w-[150px] text-[#000000] font-semibold rounded-xl hover:bg-orange-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
    </div>
  );
};

export default AddDistrict;












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { createDistrict, createDistrictsBulk } from "@/redux/slices/districtSlice";
// import Swal from "sweetalert2";
// import { usePageMetadata } from "../../context/PageMetadataContext";
// import { readFile } from "@/utils/fileUpload";
// import { processCSV } from "@/utils/csvProcessor";

// const AddDistrict = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { setMetadata } = usePageMetadata();

//   const [districtName, setDistrictName] = useState("");
//   const [districtCode, setDistrictCode] = useState("");
//   const [isBulkAdd, setIsBulkAdd] = useState(false);
//   const [errorPlaceholders, setErrorPlaceholders] = useState({
//     districtName: "Enter District Name",
//     districtCode: "Enter District Code",
//   });
//   const [errorStates, setErrorStates] = useState({
//     districtName: false,
//     districtCode: false,
//   });

//   // Bulk-related states
//   const [file, setFile] = useState(null);
//   const [selectedField, setSelectedField] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleAddDistrict = () => {
//     const errors = {
//       districtName: districtName ? "" : "District Name is required",
//       districtCode: districtCode ? "" : "District Code is required",
//     };

//     if (!districtName || !districtCode) {
//       setErrorPlaceholders({
//         districtName: errors.districtName || "Enter District Name",
//         districtCode: errors.districtCode || "Enter District Code",
//       });

//       setErrorStates({
//         districtName: !districtName,
//         districtCode: !districtCode,
//       });

//       if (!districtName) setDistrictName("");
//       if (!districtCode) setDistrictCode("");
//       return;
//     }

//     dispatch(createDistrict({ name: districtName, code: districtCode }))
//       .unwrap()
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "District added successfully!",
//           confirmButtonColor: "#C8EE44",
//         }).then(() => {
//           navigate("/districts");
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error.message || "Failed to add district.",
//         });
//       });
//   };

//   const handleFileUpload = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     readFile(uploadedFile, (fileContent) => {
//       try {
//         const requiredFields = ["name", "code"];
//         const { headers, dataRows } = processCSV(fileContent, requiredFields);
//         console.log("CSV Headers:", headers);
//         console.log("CSV Data Rows:", dataRows);

//         setUsers(dataRows);
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "CSV file processed successfully!",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error.message,
//         });
//       }
//     });
//   };

//   const handleSubmitUsers = () => {
//     if (users.length === 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "No data to process. Please upload a valid CSV file.",
//       });
//       return;
//     }

//     setLoading(true);
//     dispatch(
//       createDistrictsBulk({
//         checkField: selectedField,
//         datas: users,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Bulk districts added successfully!",
//         });
//         setUsers([]);
//         navigate("/districts");
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error.message || "Failed to process bulk upload.",
//         });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     setMetadata({
//       title: "Add Districts",
//       backPath: "/districts",
//     });
//   }, [setMetadata]);

//   return (
//     <div className="p-6 pl-0 pt-0 max-w-10xl mx-auto overflow-y-auto">
//       {/* Common Header */}
//       <div className="py-4">
//         <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
//       </div>

//       {/* Bulk Add Toggle */}
//       <div className="flex items-center mb-8">
//         <span className="text-[#000000] font-medium mr-3">Bulk Add</span>
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only peer"
//             checked={isBulkAdd}
//             onChange={() => setIsBulkAdd(!isBulkAdd)}
//           />
//           <div className="w-14 h-7 bg-[#EFEFEF] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-lime-300 rounded-full peer peer-checked:bg-lime-300 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-[#DBDBDB] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//         </label>
//       </div>

//       {isBulkAdd ? (
//         <div>
//           <div className="text-xl flex flex-col items-center">
//             <div className="flex flex-col items-center px-11 pt-3 pb-4 max-w-full text-black rounded-xl border border-dashed border-neutral-100 w-[350px] max-md:px-5">
//               <img
//                 loading="lazy"
//                 src="/cloud-arrow.png"
//                 alt=""
//                 className="object-contain aspect-square w-[74px]"
//               />
//               <div className="mt-3 text-center w-full">
//                 Please upload CSV file to import data in bulk
//               </div>
//               <label className="gap-2.5 px-12 py-2 mt-3 w-[250px] bg-lime-300 rounded-xl min-h-[50px] max-md:px-5 text-center cursor-pointer">
//                 Browse File
//                 <input
//                   type="file"
//                   accept=".csv"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                 />
//               </label>
//             </div>
//             <a
//               href="/sample.csv"
//               download
//               className="gap-2.5 py-3 mt-8 text-black rounded-lg underline text-center"
//               tabIndex="0"
//               aria-label="Download sample CSV file"
//             >
//               Click here to download sample CSV file
//             </a>
//             <div className="flex flex-col justify-center mt-8 max-w-full w-[398px]">
//               <label
//                 htmlFor="primaryColumn"
//                 className="gap-2.5 py-2.5 w-full text-gray-800 text-sm font-semibold"
//               >
//                 Primary Column (This column will be used to check duplicacy)
//               </label>
//               <select
//                 id="primaryColumn"
//                 className="block w-full bg-white border border-neutral-100 text-zinc-800 py-3.5 px-4 pr-8 rounded-xl"
//                 value={selectedField}
//                 onChange={(e) => setSelectedField(e.target.value)}
//               >
//                 <option value="code">District Code</option>
//                 <option value="name">District Name</option>
//               </select>
//             </div>
//           </div>
//           <button
//             onClick={handleSubmitUsers}
//             className="mt-8 px-14 py-4 bg-[#C8EE44] text-black font-bold rounded-xl hover:bg-orange-300"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Add"}
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white shadow-sm rounded-lg">
//           <div className="grid grid-cols-5 gap-6">
//             {/* District Name */}
//             <div className="col-span-2">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 District Name
//               </label>
//               <input
//                 type="text"
//                 value={districtName}
//                 onChange={(e) => setDistrictName(e.target.value)}
//                 placeholder={errorPlaceholders.districtName}
//                 className={`w-full py-2 px-3 border focus:outline-none focus:border-gray-400 ${
//                   errorStates.districtName ? "border-red-500" : "border-gray-300"
//                 } rounded-xl`}
//               />
//             </div>
//             {/* District Code */}
//             <div className="col-span-2">
//               <label className="block text-gray-700 text-sm font-medium mb-2">
//                 District Code
//               </label>
//               <input
//                 type="text"
//                 value={districtCode}
//                 onChange={(e) => setDistrictCode(e.target.value)}
//                 placeholder={errorPlaceholders.districtCode}
//                 className={`w-full py-2 px-3 border focus:outline-none focus:border-gray-400 ${
//                   errorStates.districtCode ? "border-red-500" : "border-gray-300"
//                 } rounded-xl`}
//               />
//             </div>
//           </div>
//           <div className="mt-6">
//             <button
//               onClick={handleAddDistrict}
//               className="px-8 py-3 bg-lime-300 text-black rounded-xl hover:bg-orange-300"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddDistrict;













