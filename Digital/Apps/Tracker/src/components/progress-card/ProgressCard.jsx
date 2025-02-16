import React, { useState, useEffect } from "react";
import StatusCard from "./StatusCard/StatusCard";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Scrollbars } from "react-custom-scrollbars-2";
import ActivityFilter from "../activity-filter/ActivityFilter";
import ActivityForm from "../activity-form/ActivityView";
import NewActivityForm from "../activity-form/NewActivityForm";
import ProgressModal from "../progress-modal/ProgressModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchIR, deleteIR } from "../../redux/slices/irSlice";
import { fetchSIR, deleteSIR } from "../../redux/slices/sirSlice";
import { fetchOutput, deleteOutput } from "../../redux/slices/ouputSlice";
import {
  fetchActivities,
  fetchStates,
  deleteActivity,
} from "../../redux/slices/activitySlice";

function ProgressCard() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedSirDataId, setSelectedSirDataId] = useState(null);
  const [selectedOutputDataId, setSelectedOutputDataId] = useState(null);
  const [columns, setColumns] = useState({});
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [activeTab, setActiveTab] = useState("status");
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  const dispatch = useDispatch();
  const irData = useSelector((state) => state.ir.irs || []);
  const sirData = useSelector((state) => state.sir.sirs || []);
  const outputData = useSelector((state) => state.output.outputs || []);
  const activityData = useSelector((state) => state.activity.activities || []);
  const stateData = useSelector((state) => state.activity.states || []);
  useEffect(() => {
    dispatch(fetchIR());
    dispatch(fetchStates());
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleEdit = (type, item) => {
    setModalType(type);
    if (type === "ir") setSelectedId(item._id);
    if (type === "sir") setSelectedSirDataId(item._id);
    if (type === "output") setSelectedOutputDataId(item._id);
    setIsProgressModalOpen(true);
    setSelectedItem(item);
  };

  const handleDelete = (type, itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (type === "ir") dispatch(deleteIR(itemId));
      if (type === "sir") dispatch(deleteSIR(itemId));
      if (type === "output") dispatch(deleteOutput(itemId));
    }
  };

  const handleProgressModalToggle = (type) => {
    setModalType(type);
    setSelectedItem(null);
    setIsProgressModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsActivityModalOpen(false);
    setIsProgressModalOpen(false);
    setModalType(null);
    setSelectedItem(null);
  };

  const handleProgressItemClick = (id) => {
    setSelectedId(id);
    setSelectedSirDataId(null);
    setSelectedOutputDataId(null);
    dispatch(fetchSIR(id));
  };

  const handleSirDataItemClick = (id) => {
    setSelectedSirDataId(id);
    setSelectedOutputDataId(null);
    dispatch(fetchOutput(id));
  };

  const handleOutputDataItemClick = (id) => {
    setSelectedOutputDataId(id);
    setActiveTab("status");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsActivityModalOpen(false);
    if (tab === "status") {
      setIsStatusVisible(true);
    } else {
      setIsStatusVisible(false);
    }
    handleCloseModal();
  };

  const formatTitle = (title) => {
    return title
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const getStatusColor = (columnId) => {
    switch (columnId) {
      case "notInitiated":
        return "#68B266";
      case "inProgress":
        return "#FFA500";
      case "completed":
        return "#973FCF";
      default:
        return "#FF0037";
    }
  };

  const formatStage = (columnId) => {
    switch (columnId) {
      case "completed":
        return "Completed";
      case "inProgress":
        return "In Progress";
      case "notInitiated":
        return "Not Initiated";
      case "backlog":
        return "Backlog";
      default:
        return columnId;
    }
  };

  const filteredSirData = sirData.filter((sir) => sir.irId === selectedId);
  const filteredOutputData = outputData.filter(
    (output) => output.sirId === selectedSirDataId
  );

  const handleStateSelection = (stateId) => {
    setSelectedState(stateId);

    const activityDetails = activityData.flatMap((activity) => {
      if (activity.activityStatuses && activity.activityStatuses.length > 0) {
        // If activityStatuses is present, map with details
        return activity.activityStatuses.map((status) => ({
          activityId: activity._id,
          activityCode: activity.code,
          activityName: activity.name,
          statusId: status._id,
          stateId: selectedState,
          year: status.year,
          quarter: status.quarter,
          stage: status.stage,
          outcome: status.outcome,
          objective: status.objective,
          actionPlan: status.actionPlan,
          participantsCount: status.participantsCount,
          remarks: status.remarks,
          isActive: status.isActive,
          createdAt: status.createdAt,
          updatedAt: status.updatedAt,
        }));
      } else {
        // If activityStatuses is empty, return null values
        return [
          {
            activityId: activity._id,
            activityCode: activity.code,
            activityName: activity.name,
            stateId: selectedState,
            statusId: null,
            year: selectedYear,
            quarter: selectedQuarter,
            stage: null,
            outcome: null,
            objective: null,
            actionPlan: null,
            participantsCount: null,
            remarks: null,
            isActive: null,
            createdAt: null,
            updatedAt: null,
          },
        ];
      }
    });

    console.log("----2 ", activityDetails);

    // Filter activities by selected year and quarter
    const filteredActivities = activityDetails.map((activity) => {
      if (
        activity.year == selectedYear &&
        activity.quarter == selectedQuarter
      ) {
        // Return full activity details if year and quarter match
        return activity;
      } else {
        // Return activityId, activityCode, and activityName, rest as null
        return {
          activityId: activity.activityId,
          activityCode: activity.activityCode,
          activityName: activity.activityName,
          stateId: selectedState,
          statusId: null,
          year: selectedYear,
          quarter: selectedQuarter,
          stage: null,
          outcome: null,
          objective: null,
          actionPlan: null,
          participantsCount: null,
          remarks: null,
          isActive: null,
          createdAt: null,
          updatedAt: null,
        };
      }
    });

    console.log("----1 ", filteredActivities);

    // Categorize activities by stage, defaulting to "Not Initiated" for undefined stages
    const initialColumns = {
      completed: [],
      inProgress: [],
      notInitiated: [],
      backlog: [],
    };

    // Map stage names to column IDs
    const stageMapping = {
      "In Progress": "inProgress",
      Completed: "completed",
      "Not Initiated": "notInitiated",
      Backlog: "backlog",
    };

    // Add filtered activities to columns based on their stage
    filteredActivities.forEach((activity) => {
      console.log("-----", activity.stage);
      const normalizedStage = stageMapping[activity.stage] || "notInitiated";
      initialColumns[normalizedStage].push(activity); // Add to the appropriate column
    });

    // Update the columns state
    setColumns(initialColumns);
    console.log("-----4 ", columns);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // No changes needed
    }

    // Copy the current state of columns
    const columnsCopy = { ...columns };

    // Handle cross-column movement
    if (source.droppableId !== destination.droppableId) {
      // Get the source and destination columns
      const sourceColumn = columnsCopy[source.droppableId];
      const destColumn = columnsCopy[destination.droppableId];

      // Remove the item from the source column
      const [movedItem] = sourceColumn.splice(source.index, 1);

      // Add the item to the destination column
      destColumn.splice(destination.index, 0, movedItem);
    } else {
      // Handle movement within the same column
      const column = columnsCopy[source.droppableId];
      const [movedItem] = column.splice(source.index, 1);
      column.splice(destination.index, 0, movedItem);
    }

    // Update the state with the new column order
    setColumns(columnsCopy);
  };

  const handleModalToggle = (columnId, type = "activity") => {
    setModalType(type);
    setSelectedItem(null);
    setIsActivityModalOpen(true);
    setSelectedStage(columnId);
  };

  // const handleEditActivity = (activity) => {
  //     setModalType("activity");
  //     setSelectedItem(activity);
  //     setIsActivityModalOpen(true);
  // };

  const handleEditActivity = (activity) => {
    setModalType("editActivity");
    setSelectedItem(activity); // Pass the selected activity to be edited
    setIsActivityModalOpen(true);
  };

  const handleSelectionComplete = (isComplete) => {
    setIsSelectionComplete(isComplete);
  };

  const handleDeleteActivity = async (activityId) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await dispatch(deleteActivity(activityId));
      } catch (error) {
        alert("Failed to delete activity. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (activeTab !== "status") {
      setColumns({ notInitiated: [], inProgress: [], completed: [] });
      setSelectedState(null);
      setSelectedYear(null);
      setSelectedQuarter(null);
      setIsSelectionComplete(false);
    }
  }, [activeTab]);

  const handleActivityClick = (activityStatus) => {
    setSelectedItem(activityStatus);
    setModalType("activityStatus");
    setIsActivityModalOpen(true);
  };

  return (
    <div className="flex h-full pt-20 page-content">
      {/* IR Section */}
      <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
        <Scrollbars autoHide>
          <div className="flex flex-col pt-2 rounded-none">
            <div
              onClick={() => handleProgressModalToggle("ir")}
              className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
            >
              <FaPlus className="text-white" />
            </div>

            {irData?.map((item) => (
              <StatusCard
                key={item._id}
                id={item._id}
                slNo={item.code}
                title={item.name}
                status={item.status}
                slNoBgColor="#1081BB"
                isSelected={item._id === selectedId}
                onClick={handleProgressItemClick}
                onEdit={() => handleEdit("ir", item)}
                onDelete={() => handleDelete("ir", item._id)}
              ></StatusCard>
            ))}
          </div>
        </Scrollbars>
      </div>

      {/* SIR Section */}
      {selectedId && (
        <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
          <Scrollbars autoHide>
            <div className="flex flex-col pt-2 rounded-none">
              {/* Button to add a new SIR item */}
              <div
                onClick={() => handleProgressModalToggle("sir")}
                className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
              >
                <FaPlus className="text-white" />
              </div>
              {filteredSirData.map((sirItem) => (
                <StatusCard
                  key={sirItem._id}
                  id={sirItem._id}
                  slNo={sirItem.code}
                  title={sirItem.name}
                  status={sirItem.status}
                  slNoBgColor="#EE6925"
                  isSelected={sirItem._id === selectedSirDataId}
                  onClick={handleSirDataItemClick}
                  onEdit={() => handleEdit("sir", sirItem)}
                  onDelete={() => handleDelete("sir", sirItem._id)}
                />
              ))}
            </div>
          </Scrollbars>
        </div>
      )}

      {/* Output Section */}
      {selectedSirDataId && (
        <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
          <Scrollbars autoHide>
            <div className="flex flex-col pt-2 rounded-none">
              {/* Button to add a new Output item */}
              <div
                onClick={() => handleProgressModalToggle("output")}
                className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
              >
                <FaPlus className="text-white" />
              </div>
              {filteredOutputData.map((outputItem) => (
                <StatusCard
                  key={outputItem._id}
                  id={outputItem._id}
                  slNo={outputItem.code}
                  title={outputItem.name}
                  status={outputItem.status}
                  slNoBgColor="#68B266"
                  isSelected={outputItem._id === selectedOutputDataId}
                  onClick={handleOutputDataItemClick}
                  onEdit={() => handleEdit("output", outputItem)}
                  onDelete={() => handleDelete("output", outputItem._id)}
                />
              ))}
            </div>
          </Scrollbars>
        </div>
      )}

      <div className="flex flex-col">
        {selectedOutputDataId && (
          <div className="flex justify-center bg-sky-900 bg-opacity-10 gap-4 ">
            <button
              className={`px-4 py-2 ${
                activeTab === "status"
                  ? "bg-[#003765] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleTabChange("status")}
            >
              Status
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "addActivity"
                  ? "bg-[#003765] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleTabChange("addActivity")}
            >
              Add Activity
            </button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "status" && isStatusVisible && (
          <div>
            {/* Activity Section */}
            {selectedOutputDataId && (
              <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full page-content min-h-screen min-w-[600px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
                {/* State Dropdown and Filter Section */}
                <div className="flex items-center gap-4 mb-4">
                  <ActivityFilter
                    outputId={selectedOutputDataId}
                    state={selectedState}
                    year={selectedYear}
                    quarter={selectedQuarter}
                    setSelectedState={(stateId) => {
                      handleStateSelection(stateId);
                    }}
                    setSelectedYear={setSelectedYear}
                    setSelectedQuarter={setSelectedQuarter}
                    onSelectionComplete={handleSelectionComplete}
                  />
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                  {isSelectionComplete ? (
                    <div className="flex gap-4 flex-1 p-4">
                      {Object.entries(columns).map(([columnId, tasks]) => (
                        <div
                          key={columnId}
                          className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]"
                        >
                          {/* Column header */}
                          <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
                            <div
                              className="flex gap-3 items-center w-full pb-2.5"
                              style={{
                                borderBottom: `2px solid ${getStatusColor(
                                  columnId
                                )}`,
                              }}
                            >
                              <div
                                className="w-[8px] h-[8px] rounded"
                                style={{
                                  backgroundColor: `${getStatusColor(
                                    columnId
                                  )}`,
                                }}
                              ></div>
                              <div className="text-base font-bold text-slate-900">
                                {formatTitle(columnId)}
                              </div>
                            </div>
                          </div>

                          {/* Task list */}
                          <div className="flex-1">
                            <Scrollbars autoHide>
                              <Droppable droppableId={columnId}>
                                {(provided) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-col gap-2 h-full"
                                  >
                                    {tasks.length > 0 ? (
                                      tasks.map((task, index) => (
                                        <Draggable
                                          key={task._id}
                                          draggableId={task._id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref={provided.innerRef}
                                              className="bg-gray-100 p-2 rounded-lg cursor-pointer"
                                              onClick={() =>
                                                handleActivityClick(task)
                                              }
                                            >
                                              <div className="text-xl font-bold text-gray-800">
                                                {task.activityCode}
                                              </div>
                                              <div className="text-sm text-gray-500">
                                                {task.activityName}
                                              </div>
                                            </div>
                                          )}
                                        </Draggable>
                                      ))
                                    ) : (
                                      <div className="text-gray-500 text-center">
                                        No activities available.
                                      </div>
                                    )}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </Scrollbars>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center flex-1">
                      <p className="text-lg text-gray-600">
                        Please select State, Year, and Quarter to proceed.
                      </p>
                    </div>
                  )}
                </DragDropContext>
              </div>
            )}
          </div>
        )}

        {activeTab === "addActivity" && (
          <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full page-content min-h-screen min-w-[700px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-end pr-4 mb-4">
              <button
                onClick={() => handleModalToggle(null, "addActivity")}
                className="flex items-center gap-2 bg-[#003765] text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
              >
                <FaPlus />
                Add New Activity
              </button>
            </div>
            <div className="flex gap-4 flex-1 p-4">
              {Object.entries(
                activityData.reduce((acc, activity) => {
                  activity.stateIds.forEach((stateId) => {
                    if (!acc[stateId]) acc[stateId] = [];
                    acc[stateId].push(activity);
                  });
                  return acc;
                }, {})
              ).map(([stateId, activities]) => {
                const state = stateData.find((s) => s._id === stateId);
                return (
                  <div
                    key={stateId}
                    className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]"
                  >
                    {/* Column Header */}
                    <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
                      <div
                        className="flex gap-3 items-center w-full pb-2.5"
                        style={{
                          borderBottom: `2px solid ${state?.color || "gray"}`,
                        }}
                      >
                        <div
                          className="w-[8px] h-[8px] rounded"
                          style={{
                            backgroundColor: `${state?.color || "gray"}`,
                          }}
                        ></div>
                        <div className="text-base font-bold text-slate-900">
                          {state?.name || "Unknown State"}
                        </div>
                      </div>
                    </div>

                    {/* Task List */}
                    <div className="flex flex-col gap-2">
                      {activities.map((activity) => (
                        <div
                          key={activity._id}
                          className="relative bg-gray-100 p-2 rounded-lg shadow-sm"
                        >
                          <div className="absolute top-2 right-2 flex gap-2">
                            <FaEdit
                              className="cursor-pointer text-gray-500 hover:text-blue-600"
                              onClick={() => handleEditActivity(activity)}
                            />
                            <MdDelete
                              className="cursor-pointer text-gray-500 hover:text-red-600"
                              onClick={() => handleDeleteActivity(activity._id)}
                            />
                          </div>
                          <div className="text-xl font-bold text-gray-800">
                            {activity.code}
                          </div>
                          <div className="text-sm text-gray-500">
                            {activity.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modals */}
        {isActivityModalOpen && modalType === "activityStatus" && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ActivityForm
                handleClose={handleCloseModal}
                outputId={selectedOutputDataId}
                state={selectedState}
                year={selectedYear}
                quarter={selectedQuarter}
                activityData={selectedItem} // Pass selectedItem as activityData
                stage={selectedStage}
              />
            </div>
          </div>
        )}

        {isActivityModalOpen &&
          (modalType === "addActivity" || modalType === "editActivity") && (
            <div className="modal-overlay">
              <div className="modal-content">
                <NewActivityForm
                  isOpen={isActivityModalOpen}
                  handleClose={handleCloseModal}
                  outputId={selectedOutputDataId}
                  activity={selectedItem} // Pass the selected activity for edit mode
                />
              </div>
            </div>
          )}

        {isProgressModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ProgressModal
                type={modalType}
                irId={selectedId}
                sirId={selectedSirDataId}
                selectedItem={selectedItem}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressCard;
