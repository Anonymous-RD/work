import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateActivityStatus } from "../../redux/slices/activitySlice";

export default function AddActivityForm({ isOpen, onClose, activityData }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const [outcome, setOutcome] = useState(activityData?.outcome || "");
  const [status, setStatus] = useState(activityData?.status || "");
  const [quaterTarget, setQuaterTarget] = useState(
    activityData?.quaterTarget || ""
  );
  const [objective, setObjective] = useState(activityData?.objective || "");
  const [expectedOutput, setExpectedOutput] = useState(
    activityData?.expectedOutput || ""
  );
  const [actionPlan, setActionPlan] = useState(activityData?.actionPlan || "");
  const [roleOfIPEL, setRoleOfIPEL] = useState(activityData?.roleOfIPEL || "");
  const [noOfParticipants, setNoOfParticipants] = useState(
    activityData?.noOfParticipants || ""
  );
  const [image, setImage] = useState(activityData?.image || null);

  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({ file, preview: imageUrl });
      setImage(file);
    }
  };



  const handleImageRemove = () => {
    setSelectedImage(null);
    setImage(null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("------22", activityData);

    const activityId = activityData?.activityId;
    if (!activityId) {
      console.error("Missing ID for the activity.");
      alert("Activity ID is required.");
      return;
    }

    const updatedData = {
      activityId,
      stateId: activityData?.stateId,
      year: activityData?.year,
      quarter: activityData?.quarter,
      outcome,
      stage: status,
      quaterTarget,
      objective,
      expectedOutput,
      actionPlan,
      roleOfIPEL,
      noOfParticipants,
      image,
      activityId
    };
    console.log("-------11", updatedData);
    dispatch(updateActivityStatus({ updatedData }));
    console.log("Activity updated successfully:", updatedData);
    onClose();
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.outcome) newErrors.outcome = "Outcome is required.";
  //   if (!formData.status) newErrors.status = "Status is required.";
  //   if (!formData.quaterTarget) newErrors.quaterTarget = "Quarter target is required.";
  //   if (!formData.objective) newErrors.objective = "Objective is required.";
  //   if (!formData.expectedOutput) newErrors.expectedOutput = "Expected output is required.";
  //   if (!formData.actionPlan) newErrors.actionPlan = "Action plan is required.";
  //   if (!formData.activity) newErrors.activity = "Activity description is required.";
  //   if (!formData.noOfParticipants) newErrors.noOfParticipants = "Number of participants is required.";
  //   if (!formData.roleOfIPEL) newErrors.roleOfIPEL = "Role of IPEL is required.";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 montserrat">
      <div className="bg-white p-6 shadow-lg">
        <div className="flex relative flex-wrap gap-5 justify-between w-full font-[600] mb-2">
          {/* <div className="relative text-xs before:content-[''] before:block before:bg-[#003765] before:w-[30%] before:h-[2px] before:absolute before:bottom-[-2px]">
            Submit Report to Activity 001
          </div> */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-22 right-9 cursor-pointer bg-gray-600 p-2 rounded-full"
          >
            &#x2715;
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-[12px] mx-3"
        >
          <div className="flex gap-10">
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Outcome
              </label>
              <input
                type="text"
                name="outcome"
                placeholder="Enter Outcome"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md border-solid  max-md:px-5"
              />
              {errors.outcome && (
                <p className="text-red-500 text-xs mt-1">{errors.outcome}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md border-solid  max-md:px-5"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Backlog">Backlog</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">{errors.status}</p>
              )}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Quater target
              </label>
              <input
                type="text"
                name="quaterTarget"
                placeholder="Enter Quater Target"
                value={quaterTarget}
                onChange={(e) => setQuaterTarget(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md border-solid  max-md:px-5"
                aria-label="Enter Quater Target"
              />
              {errors.quaterTarget && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.quaterTarget}
                </p>
              )}
            </div>
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Objective
              </label>
              <input
                type="text"
                name="objective"
                placeholder="Enter Objective"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md border-solid  max-md:px-5"
                aria-label="Enter Objective"
              />
              {errors.objective && (
                <p className="text-red-500 text-xs mt-1">{errors.objective}</p>
              )}
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Expected Output
              </label>
              <input
                type="text"
                name="expectedOutput"
                placeholder="Enter Expected Output"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md  border-solid  max-md:px-5"
                aria-label="Enter Expected Output"
              />
              {errors.expectedOutput && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.expectedOutput}
                </p>
              )}
            </div>
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Action Plan
              </label>
              <input
                type="text"
                name="actionPlan"
                placeholder="Enter Action Plan"
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md border-solid  max-md:px-5"
                aria-label="Enter Action Plan"
              />
              {errors.actionPlan && (
                <p className="text-red-500 text-xs mt-1">{errors.actionPlan}</p>
              )}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col grow shrink justify-center max-w-[240px] flex-1">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Upload Image
              </label>
              {selectedImage ? (
                <div className="flex items-center flex-col gap-2 border text-[#A1A3AB] border-[#A1A3AB] rounded-md relative">
                  <img
                    src={selectedImage.preview}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="px-4 py-2 text-xs absolute bottom-3 font-medium text-white bg-[#003765] rounded-md"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className="flex items-center flex-col gap-2 border text-[#A1A3AB] border-[#A1A3AB] p-3 rounded-md"
                >
                  {svgs.uploadSvg}
                  <p className="">Drag&Drop files here</p>
                  <p className="">or</p>
                  <div className="flex flex-col items-center space-x-4">
                    <label className="font-[600] relative cursor-pointer border text-[500]  rounded-md px-2 py-1 mb-2 border-[#A1A3AB]">
                      Browse File
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 pt-3">
              <label htmlFor="activity" className=" max-md:ml-2.5 font-[600]">
                Activity
              </label>
              <textarea
                id="activity"
                className="flex shrink-0 p-4 self-end mt-1.5 max-w-full rounded-md border-[#A1A3AB] border h-[89%] w-full"
                aria-label="Activity description"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                No of participants
              </label>
              <input
                type="number"
                name="noOfParticipants"
                placeholder="Enter No of participants"
                value={noOfParticipants}
                onChange={(e) => setNoOfParticipants(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md border-solid  max-md:px-5"
                aria-label="Enter Expected Output"
              />
              {errors.expectedOutput && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.expectedOutput}
                </p>
              )}
            </div>
            <div className="flex flex-col grow shrink justify-center min-w-[240px] max-w-[398px]">
              <label className="font-[600] gap-2.5 py-2.5 pr-2.5 w-full text-black whitespace-nowrap tracking-widess">
                Role of IPEL
              </label>
              <input
                type="text"
                name="roleOfIPEL"
                placeholder="Enter Role of IPEL"
                value={roleOfIPEL}
                onChange={(e) => setRoleOfIPEL(e.target.value)}
                className="gap-6 placeholder:text-black placeholder:font-[600] border-[#A1A3AB] border focus:outline-none focus:border-zinc-600 !py-2 px-6 pt-4 pb-4 w-full text-gray-500 rounded-md  border-solid  max-md:px-5"
                aria-label="Enter Action Plan"
              />
              {errors.actionPlan && (
                <p className="text-red-500 text-xs mt-1">{errors.actionPlan}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="self-stretch p-2 mt-4 mb-4 w-full text-white bg-[#003765] rounded-md"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
}

const svgs = {
  uploadSvg: (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-2 mb-1"
    >
      <path
        d="M52.0425 29.3485V16.0479C52.0425 12.1285 50.6048 8.36952 48.0457 5.59803C45.4866 2.82654 42.0157 1.26953 38.3966 1.26953H15.1986C11.5795 1.26953 8.10862 2.82654 5.54952 5.59803C2.99042 8.36952 1.55273 12.1285 1.55273 16.0479V36.7377C1.55273 38.6785 1.9057 40.6002 2.59147 42.3932C3.27724 44.1862 4.28238 45.8153 5.54952 47.1876C8.10862 49.9591 11.5795 51.5161 15.1986 51.5161H32.2833"
        stroke="#A1A3AB"
        stroke-width="1.3176"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.26172 41.1721L9.73966 31.714C10.7217 30.6576 12.0106 30.0012 13.3882 29.8558C14.7659 29.7104 16.1475 30.0849 17.2995 30.9159C18.4514 31.747 19.8331 32.1215 21.2107 31.9761C22.5883 31.8306 23.8772 31.1742 24.8593 30.1179L31.2183 23.2312C33.0455 21.2456 35.4646 20.0278 38.0441 19.795C40.6235 19.5622 43.1954 20.3296 45.3008 21.9602L52.0419 27.6056M15.9076 20.9848C16.5025 20.981 17.091 20.8502 17.6392 20.6C18.1875 20.3499 18.685 19.9852 19.1031 19.5269C19.5213 19.0685 19.852 18.5255 20.0763 17.9287C20.3007 17.3319 20.4143 16.6932 20.4107 16.0488C20.4072 15.4045 20.2864 14.7673 20.0554 14.1735C19.8245 13.5797 19.4877 13.041 19.0645 12.5881C18.6413 12.1353 18.1398 11.7771 17.5888 11.5341C17.0378 11.2911 16.448 11.1681 15.853 11.172C14.6515 11.1798 13.502 11.7042 12.6575 12.6299C11.813 13.5556 11.3426 14.8067 11.3499 16.108C11.3571 17.4092 11.8414 18.6541 12.6961 19.5687C13.5509 20.4833 14.7061 20.9927 15.9076 20.9848Z"
        stroke="#A1A3AB"
        stroke-width="1.3176"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M45.1016 35.2607V50.0392"
        stroke="#A1A3AB"
        stroke-width="1.3176"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M51.3617 41.4813L45.9934 35.6675C45.8771 35.5399 45.7386 35.4386 45.5859 35.3694C45.4332 35.3003 45.2693 35.2646 45.1037 35.2646C44.9382 35.2646 44.7743 35.3003 44.6215 35.3694C44.4688 35.4386 44.3303 35.5399 44.214 35.6675L38.8457 41.4813"
        stroke="#A1A3AB"
        stroke-width="1.3176"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};
