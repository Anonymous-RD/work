 

// import React, { useState } from "react";
// import StatusCard from "./StatusCard/StatusCard";
// import { FaPlus } from "react-icons/fa";
// import { Scrollbars } from 'react-custom-scrollbars-2';
// import ActivityFilter from "../activity-filter/ActivityFilter";
// import ActivityForm from "../activity-form/ActivityForm";
// import ProgressModal from "../progress-modal/ProgressModal";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// const irData = [
//     {
//         id: 1,
//         title: "Improved reporting system for foundational/early learning",
//         status: 50,
//         sirData: [
//             {
//                 id: 101,
//                 title: "Improved data collection methods",
//                 status: 60,
//                 outputData: [
//                     {
//                         id: 1001,
//                         title: "Data Collection Automation",
//                         status: 70
//                     },
//                     {
//                         id: 1002,
//                         title: "Real-time Reporting",
//                         status: 50
//                     }
//                 ]
//             },
//             {
//                 id: 102,
//                 title: "Enhanced reporting frameworks",
//                 status: 40,
//                 outputData: [
//                     {
//                         id: 2001,
//                         title: "Developing Templates",
//                         status: 30
//                     },
//                     {
//                         id: 2002,
//                         title: "Developing Templates",
//                         status: 30
//                     }
//                 ]
//             }
//         ]
//     },
// ];

// const initialColumns = {
//     completed: [
//         { id: "001", activity: "001", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//         { id: "002", activity: "002", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//         { id: "003", activity: "003", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//         { id: "004", activity: "004", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//         { id: "005", activity: "005", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//         { id: "006", activity: "006", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//     ],
//     inProgress: [
//         { id: "007", activity: "003", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//     ],
//     notInitiated: [
//         { id: "008", activity: "004", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//     ],
//     backlog: [
//         { id: "009", activity: "005", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
//     ],
// };

// function ProgressCard() {
//     const [selectedId, setSelectedId] = useState(null);
//     const [selectedSirDataId, setSelectedSirDataId] = useState(null);
//     const [selectedOutputDataId, setSelectedOutputDataId] = useState(null);
//     const [columns, setColumns] = useState(initialColumns);
//     const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
//     const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

//     const handleProgressModalToggle = () => {
//         setIsProgressModalOpen(prevState => !prevState);
//     };

//     const handleModalToggle = () => {
//         setIsActivityModalOpen(prevState => !prevState);
//     };

//     const handleCloseModal = () => {
//         setIsActivityModalOpen(false);
//         setIsProgressModalOpen(false);
//     };

//     const handleProgressItemClick = (id) => {
//         setSelectedId(id);
//         setSelectedSirDataId(null); // Reset related item selection
//         setSelectedOutputDataId(null);
//     };

//     const handleSirDataItemClick = (id) => {
//         setSelectedSirDataId(id);
//         setSelectedOutputDataId(null);
//     };

//     const handleOutputDataItemClick = (id) => {
//         setSelectedOutputDataId(id);
//     };

//     const selectedItem = irData.find(item => item.id === selectedId);
//     const selectedSirDataItem = selectedItem?.sirData.find(
//         (sirItem) => sirItem.id === selectedSirDataId
//     );

//     const selectedOutputDataItem = selectedSirDataItem?.outputData.find(
//         (outputItem) => outputItem.id === selectedOutputDataId
//     );



//     const formatTitle = (title) => {
//         return title
//             .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space between lowercase and uppercase letters
//             .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
//     };

//     const getStatusColor = (columnId) => {
//         switch (columnId) {
//             case "notInitiated":
//                 return "#68B266";
//             case "inProgress":
//                 return "#FFA500";
//             case "completed":
//                 return "#973FCF";
//             default:
//                 return "#FF0037";
//         }
//     };

//     const onDragEnd = (result) => {
//         const { destination, source } = result;
//         if (!destination) return; // Dropped outside any valid area

//         if (
//             destination.index === source.index &&
//             destination.droppableId === source.droppableId
//         ) {
//             return; // No change in position
//         }

//         const sourceColumn = columns[source.droppableId];
//         const destinationColumn = columns[destination.droppableId];
//         const [removed] = sourceColumn.splice(source.index, 1);
//         destinationColumn.splice(destination.index, 0, removed);

//         setColumns({
//             ...columns,
//             [source.droppableId]: sourceColumn,
//             [destination.droppableId]: destinationColumn,
//         });
//     };


//     return (

//         <div className="flex h-full pt-20 page-content">

//             <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                 <Scrollbars autoHide>
//                     <div className="flex flex-col pt-2 rounded-none">
//                         <div onClick={handleProgressModalToggle} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                             <FaPlus className="text-white" />
//                         </div>
//                         {irData.map((item, index) => (
//                             <StatusCard
//                                 key={item.id}
//                                 id={item.id}
//                                 slNo={`${index + 1}.1`}
//                                 title={item.title}
//                                 status={item.status}
//                                 slNoBgColor="#1081BB"
//                                 isSelected={item.id === selectedId} // Pass selection state
//                                 onClick={handleProgressItemClick} // Pass click handler
//                             />
//                         ))}
//                     </div>
//                 </Scrollbars>
//             </div>

//             {selectedItem && (
//                 <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                     <Scrollbars autoHide>
//                         <div className="flex flex-col pt-2 rounded-none">
//                             <div onClick={handleProgressModalToggle} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                 <FaPlus className="text-white" />
//                             </div>
//                             {selectedItem.sirData.map((sirItem, index) => (
//                                 <StatusCard
//                                     key={sirItem.id}
//                                     id={sirItem.id}
//                                     slNo={`${selectedItem.id}.${index + 1}.1`}
//                                     title={sirItem.title}
//                                     status={sirItem.status}
//                                     slNoBgColor="#EE6925"
//                                     isSelected={sirItem.id === selectedSirDataId} // Pass selection state
//                                     onClick={handleSirDataItemClick} // Pass click handler
//                                 />
//                             ))}
//                         </div>
//                     </Scrollbars>
//                 </div>
//             )}

//             {selectedSirDataItem && (
//                 <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                     <Scrollbars autoHide>
//                         <div className="flex flex-col pt-2 rounded-none">
//                             <div onClick={handleProgressModalToggle} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                 <FaPlus className="text-white" />
//                             </div>
//                             {selectedSirDataItem.outputData.map((outputItem, index) => {
//                                 return (
//                                     <StatusCard
//                                         key={outputItem.id}
//                                         id={outputItem.id}
//                                         slNo={`${selectedItem.id}.${index + 1}.1 ${String.fromCharCode(97 + index)}`}
//                                         title={outputItem.title}
//                                         status={outputItem.status}
//                                         slNoBgColor="#68B266"
//                                         isSelected={outputItem.id === selectedOutputDataId}
//                                         onClick={() => handleOutputDataItemClick(outputItem.id)}
//                                     />
//                                 );
//                             })}
//                         </div>
//                     </Scrollbars>
//                 </div>
//             )}

//             {selectedOutputDataId && (
//                 <div className="flex flex-col flex-1 bg-sky-900 bg-opacity-10">
//                     <ActivityFilter />

//                     <DragDropContext onDragEnd={onDragEnd}>
//                         <div className="flex gap-4 flex-1 p-4">

//                             {Object.entries(columns).map(([columnId, tasks]) => (
//                                 <div key={columnId} className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]">

//                                     <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
//                                         <div className="flex gap-3 items-center w-full pb-2.5" style={{ borderBottom: `2px solid ${getStatusColor(columnId)}` }}>
//                                             <div className="w-[8px] h-[8px] rounded" style={{ backgroundColor: `${getStatusColor(columnId)}` }}></div>
//                                             <div className="text-base font-bold text-slate-900">
//                                                 {formatTitle(columnId)}
//                                             </div>
//                                             <div onClick={handleModalToggle} className="flex gap-2.5 cursor-pointer ml-auto justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                                 <FaPlus className="text-white" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex-1">
//                                         <Scrollbars autoHide>
//                                             <Droppable droppableId={columnId} isCombineEnabled={false}>
//                                                 {(provided) => (
//                                                     <div
//                                                         {...provided.droppableProps}
//                                                         ref={provided.innerRef}
//                                                         className="flex flex-col gap-2"
//                                                     >
//                                                         {tasks.map((task, index) => (
//                                                             <Draggable
//                                                                 key={task.id} draggableId={task.id}
//                                                                 index={index}
//                                                             >
//                                                                 {(provided) => (
//                                                                     <div
//                                                                         {...provided.draggableProps}
//                                                                         {...provided.dragHandleProps}
//                                                                         ref={provided.innerRef}
//                                                                         className="p-3 bg-gray-100 rounded shadow"
//                                                                     >
//                                                                         <div className="text-sm font-medium">
//                                                                             {`Activity ${task.activity}`}
//                                                                         </div>
//                                                                         <div className="text-xs text-gray-500">
//                                                                             {task.description}
//                                                                         </div>
//                                                                     </div>
//                                                                 )}
//                                                             </Draggable>
//                                                         ))}
//                                                         {provided.placeholder}
//                                                     </div>
//                                                 )}
//                                             </Droppable>

//                                         </Scrollbars>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </DragDropContext>

//                 </div>
//             )}

//             {isActivityModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <ActivityForm handleClose={handleCloseModal} />
//                     </div>
//                 </div>
//             )}

//             {isProgressModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <ProgressModal handleClose={handleCloseModal} />
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }

// export default ProgressCard;



















// import * as React from "react";

// function ProgressModal({ handleClose }) {
//   return (
//     <form className="flex overflow-hidden flex-col font-semibold text-black bg-white max-w-[644px]">
//       <div className="flex flex-col justify-center items-center max-md:mr-1.5 max-md:max-w-full">
//         <div className="flex overflow-hidden flex-col w-full max-w-[606px] max-md:max-w-full">
//           <div className="flex flex-wrap gap-5 justify-between py-px w-full">
//             <div className="text-xs">Add</div>
//             <button type="button" className="text-xs" onClick={handleClose}>Go Back</button>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col px-6 w-full text-xs max-md:pr-5 max-md:max-w-full">
//         <label htmlFor="name" className="self-start mt-7 max-md:ml-2.5">Name</label> 
//         <input
//           id="name"
//           className="flex shrink-0 p-4 self-end mt-3 max-w-full rounded-md border border-solid border-zinc-400 w-[499px]"
//           aria-label="Activity description"
//         />
//         <label htmlFor="code" className="self-start mt-9 max-md:ml-2.5">Code</label>
//         <input
//           id="code"
//           className="flex shrink-0 p-4 self-end mt-3 max-w-full rounded-md border border-solid border-zinc-400 w-[499px]"
//           aria-label="Activity description"
//         />
//         <button
//            onClick={handleClose}
//           className="self-end px-16 py-5 mt-7 w-full font-medium text-center text-white bg-sky-900 rounded-md max-w-[499px] max-md:px-5 max-md:max-w-full"
//         >
//           Add Activity
//         </button>
//       </div>
//     </form>
//   );
// }

// export default ProgressModal;











// import React, { useState, useEffect } from "react";
// import StatusCard from "./StatusCard/StatusCard";
// import { FaPlus } from "react-icons/fa";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import ActivityFilter from "../activity-filter/ActivityFilter";
// import ActivityForm from "../activity-form/ActivityForm";
// import ProgressModal from "../progress-modal/ProgressModal";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchIR } from "../../redux/slices/irSlice";
// import { fetchSIR } from "../../redux/slices/sirSlice";
// import { fetchOutput } from "../../redux/slices/ouputSlice";

// function ProgressCard() {
//   const [selectedId, setSelectedId] = useState(null);
//   const [selectedSirDataId, setSelectedSirDataId] = useState(null);
//   const [selectedOutputDataId, setSelectedOutputDataId] = useState(null);
//   const [columns, setColumns] = useState({});
//   const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
//   const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
//   const [modalType, setModalType] = useState(null);

//   const dispatch = useDispatch();
//   const irData = useSelector((state) => state.ir.irs || []);
//   const sirData = useSelector((state) => state.sir.sirs || []);
//   const outputData = useSelector((state) => state.output.outputs || []);

//   useEffect(() => {
//     dispatch(fetchIR());
//   }, [dispatch]);

//   const handleProgressModalToggle = (type) => {
//     setModalType(type);
//     setIsProgressModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsActivityModalOpen(false);
//     setIsProgressModalOpen(false);
//   };

//   const handleProgressItemClick = (id) => {
//     setSelectedId(id);
//     setSelectedSirDataId(null);
//     setSelectedOutputDataId(null);
//     dispatch(fetchSIR(id));
//   };

//   const handleSirDataItemClick = (id) => {
//     setSelectedSirDataId(id);
//     setSelectedOutputDataId(null);
//     dispatch(fetchOutput(id));
//   };

//   const handleOutputDataItemClick = (id) => {
//     setSelectedOutputDataId(id);
//   };

//   return (
//     <div className="flex h-full pt-20 page-content">
//       <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//         <Scrollbars autoHide>
//           <div className="flex flex-col pt-2 rounded-none">
//             <div
//               onClick={() => handleProgressModalToggle("ir")}
//               className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//             >
//               <FaPlus className="text-white" />
//             </div>
//             {irData.map((item) => (
//               <StatusCard
//                 key={item._id}
//                 id={item._id}
//                 slNo={item.code}
//                 title={item.name}
//                 isSelected={item._id === selectedId}
//                 onClick={handleProgressItemClick}
//               />
//             ))}
//           </div>
//         </Scrollbars>
//       </div>

//       {selectedId && (
//         <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//           <Scrollbars autoHide>
//             <div className="flex flex-col pt-2 rounded-none">
//               <div
//                 onClick={() => handleProgressModalToggle("sir")}
//                 className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//               >
//                 <FaPlus className="text-white" />
//               </div>
//               {sirData.map((sirItem) => (
//                 <StatusCard
//                   key={sirItem._id}
//                   id={sirItem._id}
//                   slNo={sirItem.code}
//                   title={sirItem.name}
//                   isSelected={sirItem._id === selectedSirDataId}
//                   onClick={handleSirDataItemClick}
//                 />
//               ))}
//             </div>
//           </Scrollbars>
//         </div>
//       )}

//       {selectedSirDataId && (
//         <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//           <Scrollbars autoHide>
//             <div className="flex flex-col pt-2 rounded-none">
//               <div
//                 onClick={() => handleProgressModalToggle("output")}
//                 className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//               >
//                 <FaPlus className="text-white" />
//               </div>
//               {outputData.map((outputItem) => (
//                 <StatusCard
//                   key={outputItem._id}
//                   id={outputItem._id}
//                   slNo={outputItem.code}
//                   title={outputItem.name}
//                   isSelected={outputItem._id === selectedOutputDataId}
//                   onClick={handleOutputDataItemClick}
//                 />
//               ))}
//             </div>
//           </Scrollbars>
//         </div>
//       )}

//       {isProgressModalOpen && (
//         <ProgressModal
//           type={modalType}
//           irId={selectedId}
//           sirId={selectedSirDataId}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// }

// export default ProgressCard;













// import * as React from "react";
// import ActivityMeter from "./ActivityMeter/ActivityMeter";


// function ActivityFilter() {
//     return (
//         <div className="flex flex-wrap justify-between px-4 py-4 gap-4 items-center">
//             <ActivityMeter current={1} total={2} percentage={50} />
//             <div className="flex flex-wrap gap-3.5 items-center self-stretch text-base font-semibold text-gray-800 whitespace-nowrap ml-auto">
//                 <select className="filter-dropdown">
//                     <option value="">State</option>
//                     <option value="bihar">Bihar</option>
//                     <option value="uttar-pradesh">Uttar Pradesh</option>
//                 </select>
//                 <select className="filter-dropdown">
//                     <option value="">Year</option>
//                     <option value="2020-2021">2020</option>
//                     <option value="2021-2022">2021</option>
//                     <option value="2022-2023">2022</option>
//                     <option value="2023-2024">2023</option>
//                 </select>
//                 <select className="filter-dropdown">
//                     <option value="">Quarter</option>
//                 </select>
//                 <select className="filter-dropdown">
//                     <option value="">Download</option>
//                     <option value="csv">CSV</option>
//                     <option value="pdf">PDF</option>
//                 </select>

//             </div>
//         </div>
//     );
// }

// export default ActivityFilter;





// import * as React from "react";
// import AssigneeChip from "./AssigneeChip/AssigneeChip";

// const assignees = [
//   { id: 1, name: "Asignee 1" },
//   { id: 2, name: "Asignee 1" }
// ];

// function ActivityForm({ handleClose }) {
//   return (
//     <form className="flex overflow-hidden flex-col font-semibold text-black bg-white max-w-[644px]">
//       <div className="flex flex-col justify-center items-center max-md:mr-1.5 max-md:max-w-full">
//         <div className="flex overflow-hidden flex-col w-full max-w-[606px] max-md:max-w-full">
//           <div className="flex flex-wrap gap-5 justify-between py-px w-full">
//             <div className="text-xs">Add New Activity</div>
//             <button type="button" className="text-xs" onClick={handleClose}>Go Back</button>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col px-6 w-full text-xs max-md:pr-5 max-md:max-w-full">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/a692a1e7fb9a4df4b996ef5e0515ffb1/09ef0c94900ed264ca454f84181243c3555496d487e360c0f68fad7bdbf79837?apiKey=a692a1e7fb9a4df4b996ef5e0515ffb1&"
//           alt=""
//           className="object-contain stroke-[1.512px] stroke-sky-900 w-[74px]"
//         />
//         <label htmlFor="activity" className="self-start mt-7 max-md:ml-2.5">Activity</label>
//         <textarea
//           id="activity"
//           className="flex shrink-0 p-4 self-end mt-3 max-w-full rounded-md border border-solid border-zinc-400 h-[156px] w-[499px]"
//           aria-label="Activity description"
//         />
//         <label htmlFor="assignee-select" className="self-start mt-9 max-md:ml-2.5">Assignee</label>
//         <div className="flex flex-wrap gap-5 justify-between self-end px-3.5 py-2.5 mt-2 w-full text-xs tracking-normal text-center text-black rounded-md border border-solid border-zinc-400 max-w-[498px] max-md:max-w-full">
//           <div className="flex gap-5">
//             {assignees.map((assignee) => (
//               <AssigneeChip key={assignee.id} name={assignee.name} />
//             ))}
//           </div>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/a692a1e7fb9a4df4b996ef5e0515ffb1/88e0cda1fce3e1d8232eb1e883a512b11cfdf91fbf70827cab60e90235d93d15?apiKey=a692a1e7fb9a4df4b996ef5e0515ffb1&"
//             alt=""
//             className="object-contain shrink-0 my-auto w-6 aspect-[1.04]"
//           />
//         </div>
//         <button
//            onClick={handleClose}
//           className="self-end px-16 py-5 mt-7 w-full font-medium text-center text-white bg-sky-900 rounded-md max-w-[499px] max-md:px-5 max-md:max-w-full"
//         >
//           Add Activity
//         </button>
//       </div>
//     </form>
//   );
// }

// export default ActivityForm;




    // const onDragEnd = (result) => {
    //     const { destination, source } = result;

    //     if (!destination) return;

    //     if (
    //         destination.index === source.index &&
    //         destination.droppableId === source.droppableId
    //     ) {
    //         return;
    //     }

    //     const sourceColumn = columns[source.droppableId];
    //     const destinationColumn = columns[destination.droppableId];
    //     const [removed] = sourceColumn.splice(source.index, 1);
    //     destinationColumn.splice(destination.index, 0, removed);

    //     setColumns({
    //         ...columns,
    //         [source.droppableId]: sourceColumn,
    //         [destination.droppableId]: destinationColumn,  
    //     });
    // };






// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createActivity, updateActivity, fetchActivities } from "../../redux/slices/activitySlice";

// const staticUsers = [
//   { id: "674d5f5bdaf3d427df3586d9", name: "suryakant" },
//   { id: "674e94a149fc02f794dbc700", name: "Basant" },
//   { id: "6752fab6db6ed34d757aaff3", name: "Soumya" },
// ];

// function ActivityForm({ handleClose, outputId, state, year, quarter, selectedItem }) {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.activity);

//   const [activityDescription, setActivityDescription] = useState("");
//   const [activityCode, setActivityCode] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);

//   // Pre-fill form fields if editing
//   useEffect(() => {
//     if (selectedItem) {
//       setActivityDescription(selectedItem.name || "");
//       setActivityCode(selectedItem.code || "");
//       setSelectedUser(selectedItem.asigneeId || "");
//       setIsEditMode(true);
//     } else {
//       setActivityDescription("");
//       setActivityCode("");
//       setSelectedUser("");
//       setIsEditMode(false);
//     }
//   }, [selectedItem]);

//   const handleUserChange = (event) => {
//     setSelectedUser(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!activityDescription || !activityCode || !selectedUser) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const activityData = {
//       code: activityCode,
//       name: activityDescription,
//       outputId,
//       state,
//       year,
//       quarter,
//       asigneeId: selectedUser,
//       stage: selectedItem?.stage || "backlog",
//       isActive: true,
//     };

//     const action = isEditMode
//       ? updateActivity({ ...activityData, id: selectedItem._id })
//       : createActivity(activityData);

//     dispatch(action)
//       .unwrap()
//       .then(() => {
//         alert(isEditMode ? "Activity updated successfully!" : "Activity created successfully!");
//         dispatch(fetchActivities());
//         handleClose();
//       })
//       .catch((err) => {
//         console.error("Failed to save activity:", err);
//         alert("Failed to save activity. Please try again.");
//       });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col font-semibold text-black bg-white max-w-[644px]"
//     >
//       <div className="flex justify-between items-center">
//         <div className="text-lg font-bold">{isEditMode ? "Edit Activity" : "Add New Activity"}</div>
//         <button type="button" className="text-sm text-gray-600" onClick={handleClose}>
//           Go Back
//         </button>
//       </div>

//       <div className="mt-4">
//         <label htmlFor="activity" className="block text-sm">
//           Activity Description
//         </label>
//         <textarea
//           id="activity"
//           value={activityDescription}
//           onChange={(e) => setActivityDescription(e.target.value)}
//           className="w-full border rounded-md p-2"
//         />
//       </div>

//       <div className="mt-4">
//         <label htmlFor="code" className="block text-sm">
//           Activity Code
//         </label>
//         <input
//           id="code"
//           value={activityCode}
//           onChange={(e) => setActivityCode(e.target.value)}
//           className="w-full border rounded-md p-2"
//         />
//       </div>

//       <div className="mt-4">
//         <label htmlFor="user" className="block text-sm">
//           Assign To
//         </label>
//         <select
//           id="user"
//           value={selectedUser}
//           onChange={handleUserChange}
//           className="w-full border rounded-md p-2"
//         >
//           <option value="">Select a user</option>
//           {staticUsers.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mt-6">
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//         >
//           {isEditMode ? "Update Activity" : "Create Activity"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default ActivityForm;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createActivity, updateActivity, fetchActivities } from "../../redux/slices/activitySlice";

// const staticUsers = [
//     { id: "674d5f5bdaf3d427df3586d9", name: "suryakant" },
//     { id: "674e94a149fc02f794dbc700", name: "Basant" },
//     { id: "6752fab6db6ed34d757aaff3", name: "Soumya" },
// ];

// function ActivityForm({
//     handleClose,
//     outputId,
//     state,
//     year,
//     quarter,
//     selectedItem,
//     isEditMode = false,
// }) {
//     const dispatch = useDispatch();
//     const [selectedUser, setSelectedUser] = useState("");
//     const [activityDescription, setActivityDescription] = useState("");
//     const [activityCode, setActivityCode] = useState("");
//     const { status, error } = useSelector((state) => state.activity);

//     useEffect(() => {
//       if (isEditMode && selectedItem) {
//           setSelectedUser(selectedItem.asigneeId || "");
//           setActivityDescription(selectedItem.name || "");
//           setActivityCode(selectedItem.code || "");
//       } else {
//           setSelectedUser("");
//           setActivityDescription("");
//           setActivityCode("");
//       }
//   }, [isEditMode, selectedItem]);
  

//     const handleUserChange = (event) => {
//         setSelectedUser(event.target.value);
//     };

//     const formatStage = (stage) => {
//         switch (stage) {
//             case "completed":
//                 return "Completed";
//             case "inProgress":
//                 return "In Progress";
//             case "notInitiated":
//                 return "Not Initiated";
//             case "backlog":
//                 return "Backlog";
//             default:
//                 return stage;
//         }
//     };

//     const handleSubmit = (event) => {
//       event.preventDefault();
  
//       if (!activityDescription || !activityCode || !selectedUser) {
//           alert("Please fill in all fields.");
//           return;
//       }

//       const updatedData = {
//           code: activityCode,
//           name: activityDescription,
//           outputId,
//           state,
//           year,
//           quarter,
//           asigneeId: selectedUser,
//           stage:formatStage(selectedItem?.stage),
//           isActive: true,
//       };
  
//       if (isEditMode) {
//           const activityId = selectedItem?._id;
  
//           if (!activityId) {
//               console.error("Error: Missing activity ID in edit mode.");
//               alert("Failed to update activity: Missing ID.");
//               return;
//           }
  
//           dispatch(updateActivity({ id: activityId, updatedData }))
//               .unwrap()
//               .then(() => {
//                   alert("Activity updated successfully!");
//                   dispatch(fetchActivities({ outputId, state, year, quarter }));
//                   handleClose();
//               })
//               .catch((err) => {
//                   console.error("Failed to update activity:", err);
//                   alert("Failed to update activity. Please try again.");
//               });
//       } else {
//           dispatch(createActivity(updatedData))
//               .unwrap()
//               .then(() => {
//                   alert("Activity created successfully!");
//                   dispatch(fetchActivities({ outputId, state, year, quarter }));
//                   handleClose();
//               })
//               .catch((err) => {
//                   console.error("Failed to create activity:", err);
//                   alert("Failed to create activity. Please try again.");
//               });
//       }
//   };
  

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="flex flex-col font-semibold text-black bg-white max-w-[644px]"
//         >
//             <div className="flex justify-between items-center">
//                 <div className="text-lg font-bold">
//                     {isEditMode ? "Edit Activity" : "Add New Activity"}
//                 </div>
//                 <button
//                     type="button"
//                     className="text-sm text-gray-600"
//                     onClick={handleClose}
//                 >
//                     Go Back
//                 </button>
//             </div>

//             <div className="mt-4">
//                 <label htmlFor="activity" className="block text-sm">
//                     Activity Description
//                 </label>
//                 <textarea
//                     id="activity"
//                     value={activityDescription}
//                     onChange={(e) => setActivityDescription(e.target.value)}
//                     className="w-full p-3 mt-2 border rounded"
//                     placeholder="Enter activity description"
//                 />
//             </div>

//             <div className="mt-4">
//                 <label htmlFor="activity-code" className="block text-sm">
//                     Activity Code
//                 </label>
//                 <input
//                     id="activity-code"
//                     type="text"
//                     value={activityCode}
//                     onChange={(e) => setActivityCode(e.target.value)}
//                     className="w-full p-3 mt-2 border rounded"
//                     placeholder="Enter activity code"
//                 />
//             </div>

//             <div className="mt-4">
//                 <label htmlFor="assignee-select" className="block text-sm">
//                     Assign To
//                 </label>
//                 <select
//                     id="assignee-select"
//                     value={selectedUser}
//                     onChange={handleUserChange}
//                     className="w-full p-3 mt-2 border rounded"
//                 >
//                     <option value="" disabled>
//                         Select Assignee
//                     </option>
//                     {staticUsers.map((user) => (
//                         <option key={user.id} value={user.id}>
//                             {user.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <button
//     type="submit"
//     className="w-full py-3 mt-6 font-medium text-white bg-blue-600 rounded"
//     disabled={status === "loading"}
// >
//     {status === "loading"
//         ? isEditMode
//             ? "Updating..."
//             : "Adding..."
//         : isEditMode
//         ? "Update Activity"
//         : "Add Activity"}
// </button>


//             {error && (
//                 <div className="mt-4 text-sm text-red-600">{`Error: ${error}`}</div>
//             )}
//         </form>
//     );
// }

// export default ActivityForm;






// import React, { useState, useEffect } from "react";
// import StatusCard from "./StatusCard/StatusCard";
// import { FaPlus, FaEdit} from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { Scrollbars } from 'react-custom-scrollbars-2';
// import ActivityFilter from "../activity-filter/ActivityFilter";
// import ActivityForm from "../activity-form/ActivityForm";
// import NewActivityForm from "../activity-form/NewActivityForm";
// import ProgressModal from "../progress-modal/ProgressModal";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchIR, deleteIR } from "../../redux/slices/irSlice";
// import { fetchSIR, deleteSIR } from "../../redux/slices/sirSlice";
// import { fetchOutput, deleteOutput } from "../../redux/slices/ouputSlice";
// import {  fetchActivities, fetchStates, deleteActivity } from "../../redux/slices/activitySlice"; 

// function ProgressCard() {
//     const [selectedId, setSelectedId] = useState(null);
//     const [selectedSirDataId, setSelectedSirDataId] = useState(null);
//     const [selectedOutputDataId, setSelectedOutputDataId] = useState(null);
//     const [columns, setColumns] = useState({}); 
//     const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
//     const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
//     const [modalType, setModalType] = useState(null);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [isSelectionComplete, setIsSelectionComplete] = useState(false);
//     const [selectedStage, setSelectedStage] = useState(null);
//     const [activeTab, setActiveTab] = useState("status");
//     const [isStatusVisible, setIsStatusVisible] = useState(false);


    
//     const [selectedState, setSelectedState] = useState("");
//     const [selectedYear, setSelectedYear] = useState("");
//     const [selectedQuarter, setSelectedQuarter] = useState("");

//     const dispatch = useDispatch();
//     const irData = useSelector((state) => state.ir.irs || []);
//     const sirData = useSelector((state) => state.sir.sirs || []); 
//     const outputData = useSelector((state) => state.output.outputs || []);
//     const activityData = useSelector((state) => state.activity.activities || []);
//     const stateData = useSelector((state) => state.activity.states || []);

    

//     useEffect(() => { 
//         dispatch(fetchIR());
//         dispatch(fetchStates());
//         dispatch(fetchActivities());
//     }, [dispatch]);

//     const getStateNames = (stateIds) => {
//         return stateIds.map((id) => {
//           const state = stateData.find((s) => s._id === id);
//           return state ? state.name : "Unknown State";
//         });
//       };
      

//     const handleEdit = (type, item) => {
//         setModalType(type);
//         if (type === "ir") setSelectedId(item._id);
//         if (type === "sir") setSelectedSirDataId(item._id);
//         if (type === "output") setSelectedOutputDataId(item._id);
//         setIsProgressModalOpen(true);
//         setSelectedItem(item); 
//     };
     
    
//     const handleDelete = (type, itemId) => {
//         if (window.confirm("Are you sure you want to delete this item?")) {
//             if (type === "ir") dispatch(deleteIR(itemId));
//             if (type === "sir") dispatch(deleteSIR(itemId));
//             if (type === "output") dispatch(deleteOutput(itemId));
//         }
//     };
    

//     const handleProgressModalToggle = (type) => {
//         setModalType(type);
//         setSelectedItem(null); 
//         setIsProgressModalOpen(true);
//     }; 
  
//     const handleCloseModal = () => {
//         setIsActivityModalOpen(false);
//         setIsProgressModalOpen(false);
//     };

   
//      const handleProgressItemClick = (id) => {
//        setSelectedId(id);
//        setSelectedSirDataId(null);
//        setSelectedOutputDataId(null);
//        dispatch(fetchSIR(id));
//      };
   
//      const handleSirDataItemClick = (id) => {
//        setSelectedSirDataId(id);
//        setSelectedOutputDataId(null);
//        dispatch(fetchOutput(id));
//      };
   
//      const handleOutputDataItemClick = (id) => {
//        setSelectedOutputDataId(id);
//        setActiveTab("status");
//      };

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//         if (tab === "status") {
//             setIsStatusVisible(true); 
//         } else {
//             setIsStatusVisible(false); 
//         }
//     };
    

//     const formatTitle = (title) => {
//         return title
//             .replace(/([a-z])([A-Z])/g, "$1 $2")
//             .replace(/^\w/, (c) => c.toUpperCase());
//     };

//     const getStatusColor = (columnId) => {
//         switch (columnId) {
//             case "notInitiated":
//                 return "#68B266";
//             case "inProgress":
//                 return "#FFA500";
//             case "completed":
//                 return "#973FCF";
//             default:
//                 return "#FF0037";
//         }
//     };

//     const formatStage = (columnId) => {
//         switch (columnId) {
//             case "completed":
//                 return "Completed";
//             case "inProgress":
//                 return "In Progress";
//             case "notInitiated":
//                 return "Not Initiated";
//             case "backlog":
//                 return "Backlog";
//             default:
//                 return columnId;
//         }
//     };

  
    

//     const filteredSirData = sirData.filter((sir) => sir.irId === selectedId);
//     const filteredOutputData = outputData.filter(
//       (output) => output.sirId === selectedSirDataId
//     );
  
//     const onDragEnd = (result) => {
//         const { destination, source } = result;
    
//         if (!destination) return;
    
//         if (
//             destination.index === source.index &&
//             destination.droppableId === source.droppableId
//         ) {
//             return;
//         }
    
//         const sourceColumn = [...columns[source.droppableId]];
//         const destinationColumn = [...columns[destination.droppableId]];
//         const [removed] = sourceColumn.splice(source.index, 1);
    
//         removed.stage = formatStage(destination.droppableId); 
//         destinationColumn.splice(destination.index, 0, removed);
    
//         setColumns({
//             ...columns,
//             [source.droppableId]: sourceColumn,
//             [destination.droppableId]: destinationColumn,
//         });
//     };
    
//     useEffect(() => {
    
//         if (!activityData.length) return;

//         const initialColumns = {
//             completed: [],
//             inProgress: [],
//             notInitiated: [],
//             backlog: [],
//         };
    
//         const stageMapping = {
//             "In Progress": "inProgress",
//             "Completed": "completed",
//             "Not Initiated": "notInitiated",
//             "Backlog": "backlog",
//         };
        
//         activityData.forEach((task) => {
//             const normalizedStage = stageMapping[task.stage] || "backlog";
//             if (initialColumns[normalizedStage]) {
//                 initialColumns[normalizedStage].push(task);
//             }
//         });
        
//         setColumns(initialColumns);
//         console.log("Columns initialized:", initialColumns);
//     }, [activityData]);
    

//     const handleModalToggle = (columnId, type = "activity") => {
//         setModalType(type);
//         setSelectedItem(null); 
//         setIsActivityModalOpen(true);
//         setSelectedStage(columnId); 
//     };

//     const handleEditActivity = (activity) => {
//         setModalType("activity");
//         setSelectedItem(activity); 
//         setIsActivityModalOpen(true);
//     };   

//     const handleSelectionComplete = (isComplete) => {
//         setIsSelectionComplete(isComplete);
//       }; 

//     const handleDeleteActivity = (activityId) => {
//         if (window.confirm("Are you sure you want to delete this activity?")) {
//             dispatch(deleteActivity(activityId));
//         }
//     };
//     return (
//         <div className="flex h-full pt-20 page-content">

//             {/* IR Section */}
//             <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                 <Scrollbars autoHide>
//                     <div className="flex flex-col pt-2 rounded-none">
//                         <div
//                             onClick={() => handleProgressModalToggle("ir")}
//                             className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//                         >
//                             <FaPlus className="text-white" />
//                         </div>

//                         {irData?.map((item) => (
//                             <StatusCard
//                                 key={item._id}
//                                 id={item._id}
//                                 slNo={item.code}
//                                 title={item.name}
//                                 status={item.status}
//                                 slNoBgColor="#1081BB"
//                                 isSelected={item._id === selectedId}
//                                 onClick={handleProgressItemClick}
//                                 onEdit={() => handleEdit("ir", item)}
//                                 onDelete={() => handleDelete("ir", item._id)}
//                             > 
//                             </StatusCard>
//                         ))}
//                     </div>
//                 </Scrollbars>
//             </div>

//             {/* SIR Section */}
//             {selectedId && (
//                 <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                     <Scrollbars autoHide>
//                         <div className="flex flex-col pt-2 rounded-none">
//                             {/* Button to add a new SIR item */}
//                             <div onClick={() => handleProgressModalToggle("sir")} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                 <FaPlus className="text-white" />
//                             </div>
//                             {filteredSirData.map((sirItem) => (
//                                 <StatusCard
//                                     key={sirItem._id}
//                                     id={sirItem._id}
//                                     slNo={sirItem.code}
//                                     title={sirItem.name}
//                                     status={sirItem.status}
//                                     slNoBgColor="#EE6925"
//                                     isSelected={sirItem._id === selectedSirDataId}
//                                     onClick={handleSirDataItemClick}
//                                     onEdit={() => handleEdit("sir", sirItem)}
//                                     onDelete={() => handleDelete("sir", sirItem._id)}
//                                 />
//                             ))}
//                         </div>
//                     </Scrollbars>
//                 </div>
//             )}

//             {/* Output Section */}
//             {selectedSirDataId && (
//                 <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                     <Scrollbars autoHide>
//                         <div className="flex flex-col pt-2 rounded-none">
//                             {/* Button to add a new Output item */}
//                             <div onClick={() => handleProgressModalToggle("output")} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                 <FaPlus className="text-white" />
//                             </div>
//                             {filteredOutputData.map((outputItem) => (
//                                 <StatusCard
//                                     key={outputItem._id}
//                                     id={outputItem._id}
//                                     slNo={outputItem.code}
//                                     title={outputItem.name}
//                                     status={outputItem.status}
//                                     slNoBgColor="#68B266"
//                                     isSelected={outputItem._id === selectedOutputDataId}
//                                     onClick={ handleOutputDataItemClick}
//                                     onEdit={() => handleEdit("output", outputItem)}
//                                     onDelete={() => handleDelete("output", outputItem._id)}
//                                 />
//                             ))}
//                         </div>
//                     </Scrollbars>
//                 </div>
//             )}

//             <div className="flex flex-col">
//             {selectedOutputDataId && (
//                     <div className="flex justify-center bg-sky-900 bg-opacity-10 gap-4 ">
//                         <button
//                             className={`px-4 py-2 ${
//                                 activeTab === "status" ? "bg-[#003765] text-white" : "bg-gray-200"
//                             }`}
//                             onClick={() => handleTabChange("status")}
//                         >
//                             Status
//                         </button>
//                         <button
//                             className={`px-4 py-2 ${
//                                 activeTab === "addActivity" ? "bg-[#003765] text-white" : "bg-gray-200"
//                             }`}
//                             onClick={() => handleTabChange("addActivity")}
//                         >
//                             Add Activity
//                         </button>
//                     </div>
//                 )}

//             {/* Tab Content */}
//             {activeTab === 'status' && isStatusVisible && (
//                 <div>
//                     {/* Activity Section */}
//                     {selectedOutputDataId && (
//                         <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full page-content min-h-screen min-w-[600px]  shadow-[2px_4px_4px_rgba(0,0,0,0.25)] ">
//                             <ActivityFilter
//                                 outputId={selectedOutputDataId}
//                                 state={selectedState}
//                                 year={selectedYear}
//                                 quarter={selectedQuarter}
//                                 setSelectedState={setSelectedState}
//                                 setSelectedYear={setSelectedYear}
//                                 setSelectedQuarter={setSelectedQuarter}
//                                 onSelectionComplete={handleSelectionComplete}
//                             />

//                             <DragDropContext onDragEnd={onDragEnd}>
//                                 {isSelectionComplete ? (
//                                     <div className="flex gap-4 flex-1  p-4">
//                                         {Object.entries(columns).map(([columnId, tasks]) => (
//                                             <div key={columnId} className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]">
//                                                 {/* Column header */}
//                                                 <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
//                                                     <div
//                                                         className="flex gap-3 items-center w-full pb-2.5"
//                                                         style={{ borderBottom: `2px solid ${getStatusColor(columnId)}` }}
//                                                     >
//                                                         <div
//                                                             className="w-[8px] h-[8px] rounded"
//                                                             style={{ backgroundColor: `${getStatusColor(columnId)}` }}
//                                                         ></div>
//                                                         <div className="text-base font-bold text-slate-900">
//                                                             {formatTitle(columnId)}
//                                                         </div>
//                                                         <div
//                                                             onClick={() => handleModalToggle(columnId)}
//                                                             className="flex gap-2.5 cursor-pointer ml-auto justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//                                                         >
//                                                             <FaPlus className="text-white" />
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Task list */}
//                                                 <div className="flex-1">
//                                                     <Scrollbars autoHide>
//                                                         <Droppable droppableId={columnId} isCombineEnabled={false}>
//                                                             {(provided) => (
//                                                                 <div
//                                                                     {...provided.droppableProps}
//                                                                     ref={provided.innerRef}
//                                                                     className="flex flex-col gap-2"
//                                                                 >
//                                                                     {tasks.map((task, index) => (
//                                                                         <Draggable key={task._id} draggableId={task._id} index={index}>
//                                                                             {(provided) => (
//                                                                                 <div
//                                                                                     {...provided.draggableProps}
//                                                                                     {...provided.dragHandleProps}
//                                                                                     ref={provided.innerRef}
//                                                                                     className="bg-gray-100 p-2 rounded-lg"
//                                                                                 >
//                                                                                     <div className="absolute top-2 right-2 flex gap-2">
//                                                                                         <FaEdit
//                                                                                             className="cursor-pointer text-gray-500 hover:text-blue-600"
//                                                                                             onClick={(e) => {
//                                                                                                 e.stopPropagation();
//                                                                                                 handleEditActivity(task._id);
//                                                                                             }}
//                                                                                         />
//                                                                                         <MdDelete
//                                                                                             className="cursor-pointer text-gray-500 hover:text-red-600"
//                                                                                             onClick={(e) => {
//                                                                                                 e.stopPropagation();
//                                                                                                 handleDeleteActivity(task._id);
//                                                                                             }}
//                                                                                         />
//                                                                                     </div>
//                                                                                     <div className="text-xl font-bold text-gray-800">
//                                                                                         {task.code}
//                                                                                     </div>
//                                                                                     <div className="text-sm text-gray-500">
//                                                                                         {task.name}
//                                                                                     </div>
//                                                                                 </div>
//                                                                             )}
//                                                                         </Draggable>
//                                                                     ))}
//                                                                     {provided.placeholder}
//                                                                 </div>
//                                                             )}
//                                                         </Droppable>
//                                                     </Scrollbars>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="flex items-center justify-center flex-1">
//                                         <p className="text-lg text-gray-600">
//                                             Please select State, Year, and Quarter to proceed.
//                                         </p>
//                                     </div>
//                                 )}
//                             </DragDropContext>
//                         </div>
//                     )}
//                 </div>
//             )}

// {activeTab === 'addActivity' && (
//     <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full page-content min-h-screen min-w-[700px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//         <div className="flex items-center justify-end pr-4 mb-4">
//             <button
//                 onClick={() => handleModalToggle(null, "addActivity")}
//                 className="flex items-center gap-2 bg-[#003765] text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
//             >
//                 <FaPlus />
//                 Add New Activity
//             </button>
//         </div>
//         <div className="flex gap-4 flex-wrap p-4">
//             {activityData.map((activity) =>
//                 activity.stateIds.map((stateId, index) => {
//                     const state = stateData.find((s) => s._id === stateId); // Fetch state details
//                     return (
//                         <div
//                             key={`${activity._id}-${stateId}-${index}`}
//                             className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]"
//                         >
//                             {/* Column Header */}
//                             <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
//                                 <div
//                                     className="flex gap-3 items-center w-full pb-2.5"
//                                     style={{ borderBottom: `2px solid ${state?.color || "gray"}` }}
//                                 >
//                                     <div
//                                         className="w-[8px] h-[8px] rounded"
//                                         style={{ backgroundColor: `${state?.color || "gray"}` }}
//                                     ></div>
//                                     <div className="text-base font-bold text-slate-900">
//                                         {state?.name || "Unknown State"}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Task List */}
//                             <div className="flex flex-col gap-2">
//                                 <div
//                                     className="relative bg-gray-100 p-2 rounded-lg shadow-sm"
//                                 >
//                                     <div className="text-xl font-bold text-gray-800">
//                                         {activity.code}
//                                     </div>
//                                     <div className="text-sm text-gray-500">
//                                         {activity.name}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })
//             )}
//         </div>
//     </div>
// )}



//             {/* Modals */}
//             {isActivityModalOpen && modalType === "activity" && (
//     <div className="modal-overlay">
//         <div className="modal-content">
//             <ActivityForm
//                 handleClose={handleCloseModal}
//                 outputId={selectedOutputDataId}
//                 state={selectedState}
//                 year={selectedYear}
//                 quarter={selectedQuarter}
//                 selectedItem={selectedItem}
//                 isEditMode={!!selectedItem}
//                 stage={selectedStage}
//             />
//         </div>
//     </div>
// )}

// {isActivityModalOpen && modalType === "addActivity" && (
//     <div className="modal-overlay">
//         <div className="modal-content">
//             <NewActivityForm
//                isOpen={isActivityModalOpen}
//                 handleClose={handleCloseModal}
//             />
//         </div>
//     </div>
// )}

//             {isProgressModalOpen && (
//                 <div className="modal-overlay">
//                 <div className="modal-content">
//                     <ProgressModal
//                         type={modalType}
//                         irId={selectedId}
//                         sirId={selectedSirDataId}
//                         selectedItem={selectedItem}
//                         onClose={handleCloseModal} 
//                     />
//                 </div>
//                 </div> 
//             )}
//         </div>
//     </div>
//     );
// }

// export default ProgressCard;






// import React, { useState, useEffect } from "react";
// import StatusCard from "./StatusCard/StatusCard";
// import { FaPlus, FaEdit} from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { Scrollbars } from 'react-custom-scrollbars-2';
// import ActivityFilter from "../activity-filter/ActivityFilter";
// import ActivityForm from "../activity-form/ActivityForm";
// import NewActivityForm from "../activity-form/NewActivityForm";
// import ProgressModal from "../progress-modal/ProgressModal";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchIR, deleteIR } from "../../redux/slices/irSlice";
// import { fetchSIR, deleteSIR } from "../../redux/slices/sirSlice";
// import { fetchOutput, deleteOutput } from "../../redux/slices/ouputSlice";
// import {  fetchActivities, fetchStates, deleteActivity } from "../../redux/slices/activitySlice"; 

// function ProgressCard() {
//     const [selectedId, setSelectedId] = useState(null);
//     const [selectedSirDataId, setSelectedSirDataId] = useState(null);
//     const [selectedOutputDataId, setSelectedOutputDataId] = useState(null);
//     const [columns, setColumns] = useState({}); 
//     const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
//     const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
//     const [modalType, setModalType] = useState(null);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [isSelectionComplete, setIsSelectionComplete] = useState(false);
//     const [selectedStage, setSelectedStage] = useState(null);
//     const [activeTab, setActiveTab] = useState("status");
//     const [isStatusVisible, setIsStatusVisible] = useState(false);


    
//     const [selectedState, setSelectedState] = useState("");
//     const [selectedYear, setSelectedYear] = useState("");
//     const [selectedQuarter, setSelectedQuarter] = useState("");

//     const dispatch = useDispatch();
//     const irData = useSelector((state) => state.ir.irs || []);
//     const sirData = useSelector((state) => state.sir.sirs || []); 
//     const outputData = useSelector((state) => state.output.outputs || []);
//     const activityData = useSelector((state) => state.activity.activities || []);
//     const stateData = useSelector((state) => state.activity.states || []);

    

//     useEffect(() => { 
//         dispatch(fetchIR());
//         dispatch(fetchStates());
//         dispatch(fetchActivities());
//     }, [dispatch]);

//     // const getStateNames = (stateIds) => {
//     //     return stateIds.map((id) => {
//     //       const state = stateData.find((s) => s._id === id);
//     //       return state ? state.name : "Unknown State";
//     //     });
//     //   };

//     useEffect(() => {
//         if (activityData.length > 0 && stateData.length > 0) {
//             const groupedByState = {};
    
//             activityData.forEach((activity) => {
//                 activity.stateIds.forEach((stateId) => {
//                     const state = stateData.find((s) => s._id === stateId);
    
//                     if (state) {
//                         if (!groupedByState[stateId]) {
//                             groupedByState[stateId] = { state, tasks: [] };
//                         }
//                         groupedByState[stateId].tasks.push({
//                             code: activity.code,
//                             name: activity.name,
//                         });
//                     }
//                 });
//             });
    
//             setColumns(groupedByState);
//         }
//     }, [activityData, stateData]);
    
    
    
//     const handleActivityAdded = async () => {
//         await dispatch(fetchActivities());
//     };
    
    
      

//     const handleEdit = (type, item) => {
//         setModalType(type);
//         if (type === "ir") setSelectedId(item._id);
//         if (type === "sir") setSelectedSirDataId(item._id);
//         if (type === "output") setSelectedOutputDataId(item._id);
//         setIsProgressModalOpen(true);
//         setSelectedItem(item); 
//     };
     
    
//     const handleDelete = (type, itemId) => {
//         if (window.confirm("Are you sure you want to delete this item?")) {
//             if (type === "ir") dispatch(deleteIR(itemId));
//             if (type === "sir") dispatch(deleteSIR(itemId));
//             if (type === "output") dispatch(deleteOutput(itemId));
//         }
//     };
    

//     const handleProgressModalToggle = (type) => {
//         setModalType(type);
//         setSelectedItem(null); 
//         setIsProgressModalOpen(true);
//     }; 
  
//     const handleCloseModal = () => {
//         setIsActivityModalOpen(false);
//         setIsProgressModalOpen(false);
//     };

   
//      const handleProgressItemClick = (id) => {
//        setSelectedId(id);
//        setSelectedSirDataId(null);
//        setSelectedOutputDataId(null);
//        dispatch(fetchSIR(id));
//      };
   
//      const handleSirDataItemClick = (id) => {
//        setSelectedSirDataId(id);
//        setSelectedOutputDataId(null);
//        dispatch(fetchOutput(id));
//      };
   
//      const handleOutputDataItemClick = (id) => {
//        setSelectedOutputDataId(id);
//        setActiveTab("status");
//      };

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//         if (tab === "status") {
//             setIsStatusVisible(true); 
//         } else {
//             setIsStatusVisible(false); 
//         }
//     };

    
    

//     const formatTitle = (title) => {
//         return title
//             .replace(/([a-z])([A-Z])/g, "$1 $2")
//             .replace(/^\w/, (c) => c.toUpperCase());
//     };

//     const getStatusColor = (columnId) => {
//         switch (columnId) {
//             case "notInitiated":
//                 return "#68B266";
//             case "inProgress":
//                 return "#FFA500";
//             case "completed":
//                 return "#973FCF";
//             default:
//                 return "#FF0037";
//         }
//     };

//     const formatStage = (columnId) => {
//         switch (columnId) {
//             case "completed":
//                 return "Completed";
//             case "inProgress":
//                 return "In Progress";
//             case "notInitiated":
//                 return "Not Initiated";
//             case "backlog":
//                 return "Backlog";
//             default:
//                 return columnId;
//         }
//     };

//     const filteredSirData = sirData.filter((sir) => sir.irId === selectedId);
//     const filteredOutputData = outputData.filter(
//       (output) => output.sirId === selectedSirDataId
//     );
  
//     const onDragEnd = (result) => {
//         const { destination, source } = result;
    
//         if (!destination) return;
    
//         if (
//             destination.index === source.index &&
//             destination.droppableId === source.droppableId
//         ) {
//             return;
//         }
    
//         const sourceColumn = [...columns[source.droppableId]];
//         const destinationColumn = [...columns[destination.droppableId]];
//         const [removed] = sourceColumn.splice(source.index, 1);
    
//         removed.stage = formatStage(destination.droppableId); 
//         destinationColumn.splice(destination.index, 0, removed);
    
//         setColumns({
//             ...columns,
//             [source.droppableId]: sourceColumn,
//             [destination.droppableId]: destinationColumn,
//         });
//     };
    
//     useEffect(() => {
    
//         if (!activityData.length) return;

//         const initialColumns = {
//             completed: [],
//             inProgress: [],
//             notInitiated: [],
//             backlog: [],
//         };
    
//         const stageMapping = {
//             "In Progress": "inProgress",
//             "Completed": "completed",
//             "Not Initiated": "notInitiated",
//             "Backlog": "backlog",
//         };
        
//         activityData.forEach((task) => {
//             const normalizedStage = stageMapping[task.stage] || "backlog";
//             if (initialColumns[normalizedStage]) {
//                 initialColumns[normalizedStage].push(task);
//             }
//         });
        
//         setColumns(initialColumns);
//     }, [activityData]);
    

//     const handleModalToggle = (columnId, type = "activity") => {
//         setModalType(type);
//         setSelectedItem(null); 
//         setIsActivityModalOpen(true);
//         setSelectedStage(columnId); 
//     };

//     const handleEditActivity = (activity) => {
//         setModalType("activity");
//         setSelectedItem(activity); 
//         setIsActivityModalOpen(true);
//     };   

//     const handleSelectionComplete = (isComplete) => {
//         setIsSelectionComplete(isComplete);
//       }; 

//     const handleDeleteActivity = (activityId) => {
//         if (window.confirm("Are you sure you want to delete this activity?")) {
//             dispatch(deleteActivity(activityId));
//         }
//     };
//     return (
//         <div className="flex h-full pt-20 page-content">

//             {/* IR Section */}
//             <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                 <Scrollbars autoHide>
//                     <div className="flex flex-col pt-2 rounded-none">
//                         <div
//                             onClick={() => handleProgressModalToggle("ir")}
//                             className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//                         >
//                             <FaPlus className="text-white" />
//                         </div>

//                         {irData?.map((item) => (
//                             <StatusCard
//                                 key={item._id}
//                                 id={item._id}
//                                 slNo={item.code}
//                                 title={item.name}
//                                 status={item.status}
//                                 slNoBgColor="#1081BB"
//                                 isSelected={item._id === selectedId}
//                                 onClick={handleProgressItemClick}
//                                 onEdit={() => handleEdit("ir", item)}
//                                 onDelete={() => handleDelete("ir", item._id)}
//                             > 
//                             </StatusCard>
//                         ))}
//                     </div>
//                 </Scrollbars>
//             </div>

//             {/* SIR Section */}
//             {selectedId && (
//                 <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                     <Scrollbars autoHide>
//                         <div className="flex flex-col pt-2 rounded-none">
//                             {/* Button to add a new SIR item */}
//                             <div onClick={() => handleProgressModalToggle("sir")} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                 <FaPlus className="text-white" />
//                             </div>
//                             {filteredSirData.map((sirItem) => (
//                                 <StatusCard
//                                     key={sirItem._id}
//                                     id={sirItem._id}
//                                     slNo={sirItem.code}
//                                     title={sirItem.name}
//                                     status={sirItem.status}
//                                     slNoBgColor="#EE6925"
//                                     isSelected={sirItem._id === selectedSirDataId}
//                                     onClick={handleSirDataItemClick}
//                                     onEdit={() => handleEdit("sir", sirItem)}
//                                     onDelete={() => handleDelete("sir", sirItem._id)}
//                                 />
//                             ))}
//                         </div>
//                     </Scrollbars>
//                 </div>
//             )}

//             {/* Output Section */}
//             {selectedSirDataId && (
//                 <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//                     <Scrollbars autoHide>
//                         <div className="flex flex-col pt-2 rounded-none">
//                             {/* Button to add a new Output item */}
//                             <div onClick={() => handleProgressModalToggle("output")} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
//                                 <FaPlus className="text-white" />
//                             </div>
//                             {filteredOutputData.map((outputItem) => (
//                                 <StatusCard
//                                     key={outputItem._id}
//                                     id={outputItem._id}
//                                     slNo={outputItem.code}
//                                     title={outputItem.name}
//                                     status={outputItem.status}
//                                     slNoBgColor="#68B266"
//                                     isSelected={outputItem._id === selectedOutputDataId}
//                                     onClick={ handleOutputDataItemClick}
//                                     onEdit={() => handleEdit("output", outputItem)}
//                                     onDelete={() => handleDelete("output", outputItem._id)}
//                                 />
//                             ))}
//                         </div>
//                     </Scrollbars>
//                 </div>
//             )}

//             <div className="flex flex-col">
//             {selectedOutputDataId && (
//                     <div className="flex justify-center bg-sky-900 bg-opacity-10 gap-4 ">
//                         <button
//                             className={`px-4 py-2 ${
//                                 activeTab === "status" ? "bg-[#003765] text-white" : "bg-gray-200"
//                             }`}
//                             onClick={() => handleTabChange("status")}
//                         >
//                             Status
//                         </button>
//                         <button
//                             className={`px-4 py-2 ${
//                                 activeTab === "addActivity" ? "bg-[#003765] text-white" : "bg-gray-200"
//                             }`}
//                             onClick={() => handleTabChange("addActivity")}
//                         >
//                             Add Activity
//                         </button>
//                     </div>
//                 )}

//             {/* Tab Content */}
//             {activeTab === 'status' && isStatusVisible && (
//                 <div>
//                     {/* Activity Section */}
//                     {selectedOutputDataId && (
//                         <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full page-content min-h-screen min-w-[600px]  shadow-[2px_4px_4px_rgba(0,0,0,0.25)] ">
//                             <ActivityFilter
//                                 outputId={selectedOutputDataId}
//                                 state={selectedState}
//                                 year={selectedYear}
//                                 quarter={selectedQuarter}
//                                 setSelectedState={setSelectedState}
//                                 setSelectedYear={setSelectedYear}
//                                 setSelectedQuarter={setSelectedQuarter}
//                                 onSelectionComplete={handleSelectionComplete}
//                             />

//                             <DragDropContext onDragEnd={onDragEnd}>
//                                 {isSelectionComplete ? (
//                                     <div className="flex gap-4 flex-1  p-4">
//                                         {Object.entries(columns).map(([columnId, tasks]) => (
//                                             <div key={columnId} className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]">
//                                                 {/* Column header */}
//                                                 <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
//                                                     <div
//                                                         className="flex gap-3 items-center w-full pb-2.5"
//                                                         style={{ borderBottom: `2px solid ${getStatusColor(columnId)}` }}
//                                                     >
//                                                         <div
//                                                             className="w-[8px] h-[8px] rounded"
//                                                             style={{ backgroundColor: `${getStatusColor(columnId)}` }}
//                                                         ></div>
//                                                         <div className="text-base font-bold text-slate-900">
//                                                             {formatTitle(columnId)}
//                                                         </div>
//                                                         <div
//                                                             onClick={() => handleModalToggle(columnId)}
//                                                             className="flex gap-2.5 cursor-pointer ml-auto justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm"
//                                                         >
//                                                             <FaPlus className="text-white" />
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Task list */}
//                                                 <div className="flex-1">
//                                                     <Scrollbars autoHide>
//                                                         <Droppable droppableId={columnId} isCombineEnabled={false}>
//                                                             {(provided) => (
//                                                                 <div
//                                                                     {...provided.droppableProps}
//                                                                     ref={provided.innerRef}
//                                                                     className="flex flex-col gap-2"
//                                                                 >
//                                                                     {tasks.map((task, index) => (
//                                                                         <Draggable key={task._id} draggableId={task._id} index={index}>
//                                                                             {(provided) => (
//                                                                                 <div
//                                                                                     {...provided.draggableProps}
//                                                                                     {...provided.dragHandleProps}
//                                                                                     ref={provided.innerRef}
//                                                                                     className="bg-gray-100 p-2 rounded-lg"
//                                                                                 >
//                                                                                     <div className="absolute top-2 right-2 flex gap-2">
//                                                                                         <FaEdit
//                                                                                             className="cursor-pointer text-gray-500 hover:text-blue-600"
//                                                                                             onClick={(e) => {
//                                                                                                 e.stopPropagation();
//                                                                                                 handleEditActivity(task._id);
//                                                                                             }}
//                                                                                         />
//                                                                                         <MdDelete
//                                                                                             className="cursor-pointer text-gray-500 hover:text-red-600"
//                                                                                             onClick={(e) => {
//                                                                                                 e.stopPropagation();
//                                                                                                 handleDeleteActivity(task._id);
//                                                                                             }}
//                                                                                         />
//                                                                                     </div>
//                                                                                     <div className="text-xl font-bold text-gray-800">
//                                                                                         {task.code}
//                                                                                     </div>
//                                                                                     <div className="text-sm text-gray-500">
//                                                                                         {task.name}
//                                                                                     </div>
//                                                                                 </div>
//                                                                             )}
//                                                                         </Draggable>
//                                                                     ))}
//                                                                     {provided.placeholder}
//                                                                 </div>
//                                                             )}
//                                                         </Droppable>
//                                                     </Scrollbars>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="flex items-center justify-center flex-1">
//                                         <p className="text-lg text-gray-600">
//                                             Please select State, Year, and Quarter to proceed.
//                                         </p>
//                                     </div>
//                                 )}
//                             </DragDropContext>
//                         </div>
//                     )}
//                 </div>
//             )}

// {activeTab === 'addActivity' && (
//     <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full min-h-screen">
//     <div className="flex items-center justify-end pr-4 mb-4">
//         <button
//             onClick={() => handleModalToggle(null, "addActivity")}
//             className="flex items-center gap-2 bg-[#003765] text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
//         >
//             <FaPlus />
//             Add New Activity
//         </button>
//     </div>
//     <div className="flex gap-4 flex-1 p-4">
//         {Object.values(columns).map(({ state, tasks }) => {
//             if (!state) return null; 
//             return (
//                 <div
//                     key={state._id}
//                     className="flex flex-col bg-white p-4 rounded-[8px] w-[300px]"
//                 >
//                     {/* State Header */}
//                     <div
//                         className="flex items-center mb-4 pb-2 border-b"
//                         style={{ borderBottomColor:"gray" }}
//                     >
//                         <div
//                             className="w-4 h-4 rounded-full"
//                             style={{ backgroundColor: "gray" }}
//                         ></div>
//                         <span className="ml-2 text-lg font-bold">{state.name || "Unknown State"}</span>
//                     </div>

//                     {/* Task List */}
//                     {tasks.length > 0 ? (
//                         tasks.map((task, index) => (
//                             <div
//                                 key={`${state._id}-${index}`}
//                                 className="relative bg-gray-100 p-2 mb-2 rounded-lg shadow-sm"
//                             >
//                                 <div className="absolute top-2 right-2 flex gap-2">
//                                     <FaEdit
//                                         className="cursor-pointer text-gray-500 hover:text-blue-600"
//                                         onClick={() => handleEditActivity(task)}
//                                     />
//                                     <MdDelete
//                                         className="cursor-pointer text-gray-500 hover:text-red-600"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleDeleteActivity(task._id);
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="text-xl font-bold text-gray-800">{task.code || "No Code"}</div>
//                                 <div className="text-sm text-gray-500">{task.name || "No Name"}</div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-gray-500 italic">No tasks available</div>
//                     )}
//                 </div>
//             );
//         })}
//     </div>
// </div>



// )}




//             {/* Modals */}
//             {isActivityModalOpen && modalType === "activity" && (
//     <div className="modal-overlay">
//         <div className="modal-content">
//             <ActivityForm
//                 handleClose={handleCloseModal}
//                 outputId={selectedOutputDataId}
//                 state={selectedState}
//                 year={selectedYear}
//                 quarter={selectedQuarter}
//                 selectedItem={selectedItem}
//                 isEditMode={!!selectedItem}
//                 stage={selectedStage}
//             />
//         </div>
//     </div>
// )}

// {isActivityModalOpen && modalType === "addActivity" && (
//     <div className="modal-overlay">
//         <div className="modal-content">
//             <NewActivityForm
//                isOpen={isActivityModalOpen}
//                 handleClose={handleCloseModal}
//             />
//         </div>
//     </div>
// )}

//             {isProgressModalOpen && (
//                 <div className="modal-overlay">
//                 <div className="modal-content">
//                     <ProgressModal
//                         type={modalType}
//                         irId={selectedId}
//                         sirId={selectedSirDataId}
//                         selectedItem={selectedItem}
//                         onClose={handleCloseModal} 
//                     />
//                 </div>
//                 </div> 
//             )}
//         </div>
//     </div>
//     );
// }

// export default ProgressCard;



// // Import necessary hooks at the top of your file
// import { useState } from "react";

// const YourComponent = () => {
//   const [activityData, setActivityData] = useState(initialActivityData); // Replace with your initial data
//   const [editModal, setEditModal] = useState({ isOpen: false, activity: null });

//   // Handle delete function
//   const handleDelete = (activityId) => {
//     if (window.confirm("Are you sure you want to delete this activity?")) {
//       setActivityData((prev) => prev.filter((activity) => activity._id !== activityId));
//     }
//   };

//   // Handle edit function
//   const handleEdit = (activity) => {
//     setEditModal({ isOpen: true, activity });
//   };

//   const saveEdit = (updatedActivity) => {
//     setActivityData((prev) =>
//       prev.map((activity) =>
//         activity._id === updatedActivity._id ? updatedActivity : activity
//       )
//     );
//     setEditModal({ isOpen: false, activity: null });
//   };

//   return (
//     <div className="container">
//       {activeTab === "addActivity" && (
//         <div className="flex flex-col px-4 bg-sky-900 bg-opacity-10 h-full page-content min-h-screen min-w-[700px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
//           <div className="flex items-center justify-end pr-4 mb-4">
//             <button
//               onClick={() => handleModalToggle(null, "addActivity")}
//               className="flex items-center gap-2 bg-[#003765] text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
//             >
//               <FaPlus />
//               Add New Activity
//             </button>
//           </div>
//           <div className="flex gap-4 flex-1 p-4">
//             {Object.entries(
//               activityData.reduce((acc, activity) => {
//                 activity.stateIds.forEach((stateId) => {
//                   if (!acc[stateId]) acc[stateId] = [];
//                   acc[stateId].push(activity);
//                 });
//                 return acc;
//               }, {})
//             ).map(([stateId, activities]) => {
//               const state = stateData.find((s) => s._id === stateId);
//               return (
//                 <div
//                   key={stateId}
//                   className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]"
//                 >
//                   {/* Column Header */}
//                   <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
//                     <div
//                       className="flex gap-3 items-center w-full pb-2.5"
//                       style={{ borderBottom: `2px solid ${state?.color || "gray"}` }}
//                     >
//                       <div
//                         className="w-[8px] h-[8px] rounded"
//                         style={{ backgroundColor: `${state?.color || "gray"}` }}
//                       ></div>
//                       <div className="text-base font-bold text-slate-900">
//                         {state?.name || "Unknown State"}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Task List */}
//                   <div className="flex flex-col gap-2">
//                     {activities.map((activity) => (
//                       <div
//                         key={activity._id}
//                         className="relative bg-gray-100 p-2 rounded-lg shadow-sm"
//                       >
//                         <div className="absolute top-2 right-2 flex gap-2">
//                           <FaEdit
//                             className="cursor-pointer text-gray-500 hover:text-blue-600"
//                             onClick={() => handleEdit(activity)}
//                           />
//                           <MdDelete
//                             className="cursor-pointer text-gray-500 hover:text-red-600"
//                             onClick={() => handleDelete(activity._id)}
//                           />
//                         </div>
//                         <div className="text-xl font-bold text-gray-800">
//                           {activity.code}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {activity.name}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Edit Modal */}
//           {editModal.isOpen && (
//             <div className="modal">
//               <div className="modal-content">
//                 <h2>Edit Activity</h2>
//                 <input
//                   type="text"
//                   value={editModal.activity.code}
//                   onChange={(e) =>
//                     setEditModal((prev) => ({
//                       ...prev,
//                       activity: { ...prev.activity, code: e.target.value },
//                     }))
//                   }
//                   placeholder="Code"
//                   className="input"
//                 />
//                 <input
//                   type="text"
//                   value={editModal.activity.name}
//                   onChange={(e) =>
//                     setEditModal((prev) => ({
//                       ...prev,
//                       activity: { ...prev.activity, name: e.target.value },
//                     }))
//                   }
//                   placeholder="Name"
//                   className="input"
//                 />
//                 <div className="modal-actions">
//                   <button
//                     className="btn btn-save"
//                     onClick={() => saveEdit(editModal.activity)}
//                   >
//                     Save
//                   </button>
//                   <button
//                     className="btn btn-cancel"
//                     onClick={() => setEditModal({ isOpen: false, activity: null })}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };







import React, { useState, useEffect } from "react";
import StatusCard from "./StatusCard/StatusCard";
import { FaPlus, FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Scrollbars } from 'react-custom-scrollbars-2';
import ActivityFilter from "../activity-filter/ActivityFilter";
import ActivityForm from "../activity-form/ActivityForm";
import NewActivityForm from "../activity-form/NewActivityForm";
import ProgressModal from "../progress-modal/ProgressModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { fetchIR, deleteIR } from "../../redux/slices/irSlice";
import { fetchSIR, deleteSIR } from "../../redux/slices/sirSlice";
import { fetchOutput, deleteOutput } from "../../redux/slices/ouputSlice";
import {  fetchActivities, fetchStates, deleteActivity } from "../../redux/slices/activitySlice"; 

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

    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isActivityTabModalOpen, setIsActivityTabModalOpen] = useState(false);



    
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
        setModalType(null); // Reset modal type
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
    
        // Filter activities by selected state
        const filteredActivities = activityData.filter((activity) =>
            activity.stateIds.includes(stateId)
        );
    
        // Categorize activities by stage, defaulting to "Not Initiated" for undefined stages
        const initialColumns = {
            completed: [],
            inProgress: [],
            notInitiated: [],
            backlog: [],
        };
    
        const stageMapping = {
            "In Progress": "inProgress",
            "Completed": "completed",
            "Not Initiated": "notInitiated",
            "Backlog": "backlog",
        };
    
        filteredActivities.forEach((task) => {
            const normalizedStage = stageMapping[task.stage] || "notInitiated";
            if (initialColumns[normalizedStage]) {
                initialColumns[normalizedStage].push(task);
            }
        });
    
        setColumns(initialColumns);
    };
  
    const onDragEnd = (result) => {
        const { destination, source } = result;
    
        if (!destination) return;
    
        if (
            destination.index === source.index &&
            destination.droppableId === source.droppableId
        ) {
            return;
        }
    
        const sourceColumn = [...columns[source.droppableId]];
        const destinationColumn = [...columns[destination.droppableId]];
        const [removed] = sourceColumn.splice(source.index, 1);
    
        removed.stage = formatStage(destination.droppableId); 
        destinationColumn.splice(destination.index, 0, removed);
    
        setColumns({
            ...columns,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn,
        });
    };  

    const handleModalToggle = (columnId, type = "activity") => {
        setModalType(type);
        setSelectedItem(null); 
        setIsActivityModalOpen(true);
        setSelectedStage(columnId); 
    };

    const handleEditActivity = (activity) => {
        setModalType("activity");
        setSelectedItem(activity); 
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
        if (activeTab !== 'status') {
            setColumns({ notInitiated: [], inProgress: [], completed: [] });
            setSelectedState(null);
            setSelectedYear(null);
            setSelectedQuarter(null);
            setIsSelectionComplete(false);
        }
    }, [activeTab]);

    const handleActivityClick = (activity) => {
        setSelectedItem(activity); 
        setModalType("activity"); 
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
                            > 
                            </StatusCard>
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
                            <div onClick={() => handleProgressModalToggle("sir")} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
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
                            <div onClick={() => handleProgressModalToggle("output")} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
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
                                    onClick={ handleOutputDataItemClick}
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
                                activeTab === "status" ? "bg-[#003765] text-white" : "bg-gray-200"
                            }`}
                            onClick={() => handleTabChange("status")}
                        >
                            Status
                        </button>
                        <button
                            className={`px-4 py-2 ${
                                activeTab === "addActivity" ? "bg-[#003765] text-white" : "bg-gray-200"
                            }`}
                            onClick={() => handleTabChange("addActivity")}
                        >
                            Add Activity
                        </button>
                    </div>
                )}

           {/* Tab Content */}
{activeTab === 'status' && isStatusVisible && (
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
                                <div key={columnId} className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]">
                                    {/* Column header */}
                                    <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
                                        <div
                                            className="flex gap-3 items-center w-full pb-2.5"
                                            style={{ borderBottom: `2px solid ${getStatusColor(columnId)}` }}
                                        >
                                            <div
                                                className="w-[8px] h-[8px] rounded"
                                                style={{ backgroundColor: `${getStatusColor(columnId)}` }}
                                            ></div>
                                            <div className="text-base font-bold text-slate-900">
                                                {formatTitle(columnId)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task list */}
                                    <div className="flex-1">
                                        <Scrollbars autoHide>
                                        <Droppable droppableId={columnId} isCombineEnabled={false}>
    {(provided) => (
        <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-2"
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
                                onClick={() => handleActivityClick(task)}
                            >
                                <div className="text-xl font-bold text-gray-800">
                                    {task.code}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {task.name}
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


{activeTab === 'addActivity' && (
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
                                style={{ borderBottom: `2px solid ${state?.color || "gray"}` }}
                            >
                                <div
                                    className="w-[8px] h-[8px] rounded"
                                    style={{ backgroundColor: `${state?.color || "gray"}` }}
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
            {isActivityModalOpen && modalType === "activity" && (
    <div className="modal-overlay">
        <div className="modal-content">
            <ActivityForm
                handleClose={handleCloseModal}
                outputId={selectedOutputDataId}
                state={selectedState}
                year={selectedYear}
                quarter={selectedQuarter}
                // selectedItem={selectedItem}
                // isEditMode={!!selectedItem}
                stage={selectedStage}
            />
        </div>
    </div>
)}

{isActivityModalOpen && modalType === "addActivity" && (
    <div className="modal-overlay">
        <div className="modal-content">
            <NewActivityForm
               isOpen={isActivityModalOpen}
                handleClose={handleCloseModal}
                selectedItem={selectedItem}
                isEditMode={!!selectedItem}
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




