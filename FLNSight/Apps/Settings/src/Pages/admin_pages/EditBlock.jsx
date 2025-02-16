import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlock } from "@/redux/slices/blockSlice";
import Swal from "sweetalert2";
import { fetchDistricts } from "@/redux/slices/districtSlice";
import { usePageMetadata } from "../../context/PageMetadataContext";

const EditBlock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { setMetadata } = usePageMetadata();

  const blockData = location.state?.block || { id: null, name: "", code: "", districtId: "" };

  const [blockName, setBlockName] = useState(blockData.name);
  const [blockCode, setBlockCode] = useState(blockData.code);
  const [districtId, setDistrictId] = useState(blockData.districtId?._id || "");
  const [errorMessages, setErrorMessages] = useState({
    blockName: "",
    blockCode: "",
    districtId: "",
  });

  const districts = useSelector((state) => state.district.districts);
  const districtsStatus = useSelector((state) => state.district.status);
  const blockStatus = useSelector((state) => state.block.status);

  useEffect(() => {
    if (districtsStatus === "idle") {
      dispatch(fetchDistricts());
    }
  }, [districtsStatus, dispatch]);

  const validateInputs = () => {
    const errors = {};

    if (!blockName.trim()) errors.blockName = "Block Name is required.";
    else if (blockName.length < 3) errors.blockName = "Block Name must be at least 3 characters.";

    if (!blockCode.trim()) errors.blockCode = "Block Code is required.";
    else if (!/^[A-Za-z0-9]+$/.test(blockCode)) errors.blockCode = "Block Code must be alphanumeric.";

    if (!districtId) errors.districtId = "Please select a district.";

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateBlock = () => {
    if (!validateInputs()) return;

    const updatedData = { name: blockName, code: blockCode, districtId };
    console.log(updatedData);

    dispatch(updateBlock({ id: blockData._id, updatedData }))
      .unwrap()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Block updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/blocks");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to update block.",
        });
      });
  };

  useEffect(() => {
    setMetadata({
      title: "Edit Blocks",
      backPath: "/blocks",
    });
  }, [setMetadata]);

  return (
    <div className="p-6 pl-0 mx-auto max-w-10xl">
      <div className="py-4">
        <hr className="border-t w-full h-[1px] bg-[#F5F5F5]" />
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex flex-col w-[72%]">
        <div className="flex justify-start mb-4">
        <div className="w-1/2 pr-3">
          <label className="block text-gray-700 text-sm font-medium mb-2">Block Name</label>
          <input
            type="text"
            value={blockName}
            onChange={(e) => setBlockName(e.target.value)}
            placeholder="Enter Block Name"
            className={`w-full py-2 px-3 border rounded-xl focus:outline-none focus:border-gray-400 ${
              errorMessages.blockName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorMessages.blockName && (
            <p className="text-red-500 text-sm mt-1">{errorMessages.blockName}</p>
          )}
        </div>

        <div className="w-1/2 pl-3">
          <label className="block text-gray-700 text-sm font-medium mb-2">District</label>
          <select
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className={`w-full py-2 px-3 border rounded-xl focus:outline-none focus:border-gray-400 ${
              errorMessages.districtId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a District
            </option>
            {districts.map((dist) => (
              <option key={dist._id} value={dist._id}>
                {dist.name}
              </option>
            ))}
          </select>
          {errorMessages.districtId && (
            <p className="text-red-500 text-sm mt-1">{errorMessages.districtId}</p>
          )}
        </div>
      </div>

      <div className="w-1/2 pr-3">
        <label className="block text-gray-700 text-sm font-medium mb-2">Block Code</label>
        <input
          type="text"
          value={blockCode}
          onChange={(e) => setBlockCode(e.target.value)}
          placeholder="Enter Block Code"
          className={`w-full py-2 px-3 border rounded-xl focus:outline-none focus:border-gray-400 ${
            errorMessages.blockCode ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errorMessages.blockCode && (
          <p className="text-red-500 text-sm mt-1">{errorMessages.blockCode}</p>
        )}
      </div>

       
        </div>

        <hr className="mt-16  mb-6 border-gray-200" />
        <div className="">
          <button
            onClick={handleUpdateBlock}
            className={`px-12 py-3 font-semibold text-gray-800 bg-[#C8EE44] rounded-xl hover:bg-orange-300 ${
              blockStatus === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={blockStatus === "loading"}
          >
            {blockStatus === "loading" ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlock;









