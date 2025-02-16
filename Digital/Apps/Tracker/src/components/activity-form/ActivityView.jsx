import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityStatuses } from "../../redux/slices/activitySlice";
import AddActivityForm from "./AddActivityForm";

function ActivityForm({ handleClose, activityData }) {
  const dispatch = useDispatch();

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(true);
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchActivityStatuses());
  }, [dispatch]);

  const handleEditClick = () => {
    setIsActivityModalOpen(false); // Close Activity Modal
    setIsAddActivityModalOpen(true); // Open Add Activity Modal
  };

  const closeAddActivityModal = () => {
    setIsAddActivityModalOpen(false);
    setIsActivityModalOpen(true); // Optionally re-open the Activity Modal
  };
  console.log("11111111", activityData);
  const displayField = (label, value) => (
    <p>
      <span className="font-semibold">{label}:</span> {value || "N/A"}
    </p>
  );

  // const {
  //   activityName = "N/A",
  //   createdOn = "N/A",
  //   outcome = ["N/A"],
  //   quarterTarget = "N/A",
  //   objective = "N/A",
  //   roleOfIpel = "N/A",
  //   participants = "N/A",
  //   detailedTarget = "N/A",
  // } = activityData || {};

  return (
    <>
      {isAddActivityModalOpen ? (
        <AddActivityForm
          isOpen={isAddActivityModalOpen}
          onClose={closeAddActivityModal}
        />
      ) : (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000] inter"
        >
          <div className="bg-white max-w-[650px] shadow-lg p-6 w-full relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 cursor-pointer text-white bg-gray-600 p-2 rounded-full"
            >
              &#x2715;
            </button>
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-16 text-white bg-green-600 p-2 rounded-full"
            >
              Edit
            </button>
            {/* <div className="flex gap-5 relative">
              <div
                style={{
                  background:
                    "url('https://s3-alpha-sig.figma.com/img/1917/67c1/fb93e7c82bae2ce74f38ccd795dc5d7f?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fKMZWjCi~Um4L~sQXClrzJM6tXIB~5M8pt3vLj5kVdw88wlFHmjYVC9XCOE3fxhvI4OH9QbnJT6xLxEWx3o6CCg0kMFWJ8GnffgKCDuVPSny0CmvQKh~dhbNxSOiL1QECpiKvcz92rP9w18znyzzi~JrkJ-ml82UZkZBUAACqgZeLEkFr600sKj5fn9ERHR4iE4meQEi085y4rSZaC-KkHBKLC8-DN72ohrim5FdaQ3WvT0i2uRkdR6HClMhp2K0sXaa1hmbxydhd2pDaoLVSmWAUZrNFR~0~-9pTr2yrikWhbKg4su4-VcWgj25k-P8ioh-u2qU9oFgROOrf4JvvQ__')",
                  backgroundSize: "cover",
                }}
                className="object-contain w-[150px] rounded-lg"
              ></div>
              <div>
                <div className="flex gap-2 flex-col pt-10">
                  <h2 className="text-lg text-[16px] font-[600]">
                    {activityName}
                  </h2>
                  <p className="text-xs">
                    Outcome:{" "}
                    <span className="font-[600] text-black">{outcome}</span>
                  </p>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-400 py-1">
                      Created on: {createdOn}
                    </p>
                    <div className="flex grow shrink justify-center min-w-[240px] max-w-[398px]">
                      <select
                        name="outcome"
                        className="w-[120px] absolute right-4 text-black font-[600] text-xs  mt-0 border-[#A1A3AB] border p-1 leading-12  rounded-md focus:outline-none focus:border-zinc-600"
                      >
                      {outcome.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))} 
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="text-[#747474] text-sm gap-1 flex flex-col py-3">
              <div className="font-bold flex gap-1">
                Quarter Target :<p className="font-normal">{quarterTarget}</p>
              </div>
              <div className="font-bold flex gap-1">
                Objective :<p className="font-normal">{objective}</p>
              </div>
              <div className="font-bold flex gap-1">
                Role of IPEL :<p className="font-normal">{roleOfIpel}</p>
              </div>
              <div className="font-bold flex gap-1">
                No. of participants :{" "}
                <p className="font-normal">{participants}</p>
              </div>
              <p className="font-normal">
                <strong>Detailed Target:</strong> {detailedTarget}
              </p>
            </div> */}
          </div>
        </div>
      )}
      {isAddActivityModalOpen && (
        <AddActivityForm
          isOpen={isAddActivityModalOpen}
          activityData={activityData}
          onClose={closeAddActivityModal}
        />
      )}
    </>
  );
}

export default ActivityForm;
