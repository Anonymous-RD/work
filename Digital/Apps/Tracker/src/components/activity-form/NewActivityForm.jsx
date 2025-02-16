import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { fetchStates, createActivity, updateActivity } from "../../redux/slices/activitySlice";

const staticUsers = [
  { id: "674d5f5bdaf3d427df3586d9", name: "suryakant" },
  { id: "674e94a149fc02f794dbc700", name: "Basant" },
  { id: "6752fab6db6ed34d757aaff3", name: "Soumya" },
];

const CreateNewActivityModal = ({ isOpen, handleClose, activity, outputId }) => {
  const [activityCode, setActivityCode] = useState(activity?.code || "");
  const [activityName, setActivityName] = useState(activity?.name || "");
  const [selectedStates, setSelectedStates] = useState(activity?.stateIds || []);
  const [selectedUser, setSelectedUser] = useState(activity?.asigneeId || "");

  const dispatch = useDispatch();
  const { states, status } = useSelector((state) => state.activity);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchStates());
    }
  }, [dispatch, isOpen]);


  useEffect(() => {
    if (activity) {
      setActivityCode(activity.code || "");
      setActivityName(activity.name || "");
      setSelectedStates(
        activity.stateIds?.map((stateId) => {
          const stateObj = states.find((state) => state._id === stateId);
          return stateObj ? { id: stateObj._id, name: stateObj.name } : null;
        }) || []
      );
      setSelectedUser(activity.asigneeId || "");
    }
  }, [activity, states]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!activityCode || !activityName || selectedStates.length === 0 || !outputId) {
      alert("Please fill all fields and select at least one state.");
      return;
    }

    const updatedActivity = {
      code: activityCode,
      name: activityName,
      stateIds: selectedStates.map((state) => state.id),
      asigneeId: selectedUser,
      outputId
    };
    console.log("Submitting updated activity:", updatedActivity);
  
    try {
      if (activity) {
        await dispatch(updateActivity({ ...updatedActivity, id: activity.id }));
        alert("Activity updated successfully!");
      } else {
        await dispatch(createActivity(updatedActivity));
        alert("Activity created successfully!");
      }
      handleClose();
    } catch (error) {
      alert("Failed to submit activity. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{activity ? "Edit Activity" : "Create New Activity"}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black flex items-center"
          >
            <span className="ml-1 bg-[#003765] text-white p-1 rounded-lg hover:bg-orange-600">Back</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Activity Code */}
          <div className="mb-4">
            <label htmlFor="activityCode" className="block text-sm font-medium text-gray-700">
              Activity Code
            </label>
            <input
              id="activityCode"
              type="text"
              value={activityCode}
              onChange={(e) => setActivityCode(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter activity code"
            />
          </div>

          {/* Activity Name */}
          <div className="mb-4">
            <label htmlFor="activityName" className="block text-sm font-medium text-gray-700">
              Activity Name
            </label>
            <input
              id="activityName"
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter activity name"
            />
          </div>

          {/* States */}
          <div className="mb-4">
            <label htmlFor="states" className="block text-sm font-medium text-gray-700">
              Select States
            </label>
            {status === "loading" ? (
              <div>Loading states...</div>
            ) : (
              <Multiselect
                options={states.map((state) => ({ id: state._id, name: state.name }))}
                selectedValues={selectedStates}
                onSelect={(selectedList) => setSelectedStates(selectedList)}
                onRemove={(selectedList) => setSelectedStates(selectedList)}
                displayValue="name"
                placeholder="Select States"
                style={{
                  multiselectContainer: { border: "1px solid #ccc", borderRadius: "4px" },
                  searchBox: { padding: "8px" },
                }}
              />
            )}
          </div>

          {/* Assign To */}
          <div className="mb-4">
            <label htmlFor="assignee-select" className="block text-sm">
              Assign To
            </label>
            <select
              id="assignee-select"
              value={selectedUser}
              onChange={handleUserChange}
              className="w-full p-3 mt-2 border rounded"
            >
              <option value="" disabled>
                Select Assignee
              </option>
              {staticUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#003765] text-white py-2 rounded hover:bg-orange-600"
          >
            {activity ? "Update Activity" : "Create Activity"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewActivityModal;








