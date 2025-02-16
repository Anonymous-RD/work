import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateDistrict } from "@/redux/slices/districtSlice";
import Swal from "sweetalert2";
import { usePageMetadata } from "../../context/PageMetadataContext";

const EditDistrict = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { setMetadata } = usePageMetadata();

  const districtData = location.state?.district || { id: null, name: "", code: "" };

  const [districtName, setDistrictName] = useState(districtData.name);
  const [districtCode, setDistrictCode] = useState(districtData.code);
  const [isUpdating, setIsUpdating] = useState(false);

  const [errors, setErrors] = useState({ districtName: "", districtCode: "" });

  const validateForm = () => {
    const validationErrors = {
      districtName: districtName ? "" : "District Name is required",
      districtCode: districtCode ? "" : "District Code is required",
    };

    setErrors(validationErrors);

    return !Object.values(validationErrors).some((error) => error);
  };

  const handleUpdateDistrict = () => {
    if (!validateForm()) return;

    if (isUpdating) return;
    setIsUpdating(true);

    dispatch(updateDistrict({ id: districtData._id, updatedData: { name: districtName, code: districtCode } }))
      .unwrap()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "District updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/districts");
        });
      })
      .catch((error) => {
        setIsUpdating(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to update district.",
        });
      });
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for this field
  };

  useEffect(() => {
    setMetadata({
      title: "Edit Districts",
      backPath: "/districts",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 pl-0 mx-auto max-w-10xl ">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>
      <div className="bg-white rounded-lg ">
        <div className="flex justify-start w-[72%]">
          {/* District Name */}
          <div className="w-1/2 pr-3">
            <label className="block text-[#1B212D] text-sm font-medium mb-2">District Name</label>
            <input
              type="text"
              value={districtName}
              onChange={handleInputChange(setDistrictName, "districtName")}
              placeholder="Enter District Name"
              className={`w-full py-2 px-3 border focus:outline-none focus:border-gray-400 ${
                errors.districtName ? "border-red-500" : "border-gray-300"
              } rounded-xl`}
            />
            {errors.districtName && (
              <p className="text-red-500 text-sm mt-1">{errors.districtName}</p>
            )}
          </div>

          {/* District Code */}
          <div className="w-1/2 pr-3">
            <label className="block text-[#1B212D] text-sm font-medium mb-2">District Code</label>
            <input
              type="text"
              value={districtCode}
              onChange={handleInputChange(setDistrictCode, "districtCode")}
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
        <hr className="mt-16  mb-6 border-gray-200" />

        <div className="">
          <button
            onClick={handleUpdateDistrict}
            className="px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDistrict;










// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateDistrict } from "@/redux/slices/districtSlice";
// import Swal from "sweetalert2";
// import { usePageMetadata } from "../../context/PageMetadataContext";

// const EditDistrict = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { setMetadata } = usePageMetadata();

//   const districtData = location.state?.district || { id: null, name: "", code: "" };

//   const [districtName, setDistrictName] = useState(districtData.name);
//   const [districtCode, setDistrictCode] = useState(districtData.code);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const [errorPlaceholders, setErrorPlaceholders] = useState({
//     districtName: "Enter District Name",
//     districtCode: "Enter District Code",
//   });

//   const [errorStates, setErrorStates] = useState({
//     districtName: false,
//     districtCode: false,
//   });

//   const handleUpdateDistrict = () => {
//     // Reset error states
//     setErrorStates({ districtName: false, districtCode: false });

//     // Validate inputs
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
//       return;
//     }

//     if (isUpdating) return; 
//     setIsUpdating(true);

//     dispatch(updateDistrict({ id: districtData._id, updatedData: { name: districtName, code: districtCode } }))
//       .unwrap()
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "District updated successfully!",
//           confirmButtonColor: "#C8EE44",
//         }).then(() => {
//           navigate("/districts"); 
//         });
//       })
//       .catch((error) => {
//         setIsUpdating(false);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error.message || "Failed to update district.",
//         });
//       });
//   };

//   const handleInputChange = (setter, field) => (e) => {
//     setter(e.target.value);
//     setErrorStates((prev) => ({
//       ...prev,
//       [field]: false,
//     }));
//     setErrorPlaceholders((prev) => ({
//       ...prev,
//       [field]: field === "districtName" ? "Enter District Name" : "Enter District Code",
//     }));
//   };

//   useEffect(() => {
//     setMetadata({
//       title: "Edit Districts",
//       backPath: "/districts",
//     });
//   }, [setMetadata]);

//   return (
//     <div className="p-6 pl-0 mx-auto max-w-10xl ">
//       <div className="py-4">
//         <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
//       </div>
//       <div className="bg-white rounded-lg ">
//         <div className="flex justify-start w-[72%]">
//           {/* District Name */}
//           <div className="w-1/2 pr-3">
//             <label className="block text-[#1B212D] text-sm font-medium mb-2">District Name</label>
//             <input
//               type="text"
//               value={districtName}
//               onChange={handleInputChange(setDistrictName, "districtName")}
//               placeholder={errorPlaceholders.districtName}
//               className={`w-full py-2 px-3 border border-gray-300 rounded-xl ${
//                 errorStates.districtName ? "placeholder-red-500" : "placeholder-gray-500"
//               }`}
//             />
//           </div>

//           {/* District Code */}
//           <div className="w-1/2 pr-3">
//             <label className="block text-[#1B212D] text-sm font-medium mb-2">District Code</label>
//             <input
//               type="text"
//               value={districtCode}
//               onChange={handleInputChange(setDistrictCode, "districtCode")}
//               placeholder={errorPlaceholders.districtCode}
//               className={`w-full py-2 px-3 border border-gray-300 rounded-xl ${
//                 errorStates.districtCode ? "placeholder-red-500" : "placeholder-gray-500"
//               }`}
//             />
//           </div>
//         </div>
//         <hr className="mt-16  mb-6 border-gray-200" />

//         <div className="">
//           <button
//             onClick={handleUpdateDistrict}
//             className="px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300"
//             disabled={isUpdating}
//           >
//             {isUpdating ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDistrict;
