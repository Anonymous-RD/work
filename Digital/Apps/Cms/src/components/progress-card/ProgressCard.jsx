import React, { useState } from "react";
import StatusCard from "./StatusCard/StatusCard";
import { FaPlus } from "react-icons/fa";
import { Scrollbars } from 'react-custom-scrollbars-2';
import ActivityFilter from "../activity-filter/ActivityFilter";
import ActivityForm from "../activity-form/ActivityForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const irData = [
    {
        id: 1,
        title: "Improved reporting system for foundational/early learning",
        status: 50,
        sirData: [
            {
                id: 101,
                title: "Improved data collection methods",
                status: 60,
                outputData: [
                    {
                        id: 1001,
                        title: "Data Collection Automation",
                        status: 70
                    },
                    {
                        id: 1002,
                        title: "Real-time Reporting",
                        status: 50
                    }
                ]
            },
            {
                id: 102,
                title: "Enhanced reporting frameworks",
                status: 40,
                outputData: [
                    {
                        id: 2001,
                        title: "Developing Templates",
                        status: 30
                    },
                    {
                        id: 2002,
                        title: "Developing Templates",
                        status: 30
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Improved classroom instructional materials, policies, strategies and standards adopted and practiced",
        status: 90,
        sirData: [
            {
                id: 201,
                title: "Upgraded classroom tools",
                status: 75,
                outputData: [
                    {
                        id: 3001,
                        title: "New Whiteboards",
                        status: 80
                    }
                ]
            },
            {
                id: 202,
                title: "Adopted new educational policies",
                status: 80,
                outputData: [
                    {
                        id: 4001,
                        title: "Policy Implementation",
                        status: 60
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Improved professional development of education functionaries for early grade teaching and learning",
        status: 50,
        sirData: [
            {
                id: 301,
                title: "Improved data collection methods",
                status: 60,
                outputData: [
                    {
                        id: 3001,
                        title: "Data Collection Automation",
                        status: 70
                    },
                    {
                        id: 3002,
                        title: "Real-time Reporting",
                        status: 50
                    }
                ]
            },
            {
                id: 302,
                title: "Enhanced reporting frameworks",
                status: 40,
                outputData: [
                    {
                        id: 4001,
                        title: "Developing Templates",
                        status: 30
                    },
                    {
                        id: 4002,
                        title: "Developing Templates",
                        status: 30
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Improved professional development of education functionaries for early grade teaching and learning",
        status: 50,
        sirData: [
            {
                id: 401,
                title: "Improved data collection methods",
                status: 60,
                outputData: [
                    {
                        id: 4001,
                        title: "Data Collection Automation",
                        status: 70
                    },
                    {
                        id: 4002,
                        title: "Real-time Reporting",
                        status: 50
                    }
                ]
            },
            {
                id: 402,
                title: "Enhanced reporting frameworks",
                status: 40,
                outputData: [
                    {
                        id: 5001,
                        title: "Developing Templates",
                        status: 30
                    },
                    {
                        id: 5002,
                        title: "Developing Templates",
                        status: 30
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Improved professional development of education functionaries for early grade teaching and learning",
        status: 50,
        sirData: [
            {
                id: 501,
                title: "Improved data collection methods",
                status: 60,
                outputData: [
                    {
                        id: 6001,
                        title: "Data Collection Automation",
                        status: 70
                    },
                    {
                        id: 6002,
                        title: "Real-time Reporting",
                        status: 50
                    }
                ]
            },
            {
                id: 502,
                title: "Enhanced reporting frameworks",
                status: 40,
                outputData: [
                    {
                        id: 7001,
                        title: "Developing Templates",
                        status: 30
                    },
                    {
                        id: 7002,
                        title: "Developing Templates",
                        status: 30
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Improved professional development of education functionaries for early grade teaching and learning",
        status: 50,
        sirData: [
            {
                id: 601,
                title: "Improved data collection methods",
                status: 60,
                outputData: [
                    {
                        id: 8001,
                        title: "Data Collection Automation",
                        status: 70
                    },
                    {
                        id: 8002,
                        title: "Real-time Reporting",
                        status: 50
                    }
                ]
            },
            {
                id: 602,
                title: "Enhanced reporting frameworks",
                status: 40,
                outputData: [
                    {
                        id: 9001,
                        title: "Developing Templates",
                        status: 30
                    },
                    {
                        id: 9002,
                        title: "Developing Templates",
                        status: 30
                    }
                ]
            }
        ]
    },
];

const initialColumns = {
    completed: [
        { id: "001", activity: "001", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
        { id: "002", activity: "002", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
        { id: "003", activity: "003", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
        { id: "004", activity: "004", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
        { id: "005", activity: "005", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
        { id: "006", activity: "006", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
    ],
    inProgress: [
        { id: "007", activity: "003", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
    ],
    notInitiated: [
        { id: "008", activity: "004", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
    ],
    backlog: [
        { id: "009", activity: "005", description: "Develop training module based on Aadharshila curriculum (in video format) for training of Master Trainers (MTs) followed by training of AWWs" },
    ],
};

function ProgressCard() {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedSirDataId, setSelectedSirDataId] = useState(null);
    const [selectedOutputDataId, setSelectedOutputDataId] = useState(null);
    const [columns, setColumns] = useState(initialColumns);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleProgressItemClick = (id) => {
        setSelectedId(id);
        setSelectedSirDataId(null); // Reset related item selection
        setSelectedOutputDataId(null);
    };

    const handleSirDataItemClick = (id) => {
        setSelectedSirDataId(id);
        setSelectedOutputDataId(null);
    };

    const handleOutputDataItemClick = (id) => {
        setSelectedOutputDataId(id);
    };

    const selectedItem = irData.find(item => item.id === selectedId);
    const selectedSirDataItem = selectedItem?.sirData.find(
        (sirItem) => sirItem.id === selectedSirDataId
    );

    const selectedOutputDataItem = selectedSirDataItem?.outputData.find(
        (outputItem) => outputItem.id === selectedOutputDataId
    );



    const formatTitle = (title) => {
        return title
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space between lowercase and uppercase letters
            .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
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

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return; // Dropped outside any valid area

        if (
            destination.index === source.index &&
            destination.droppableId === source.droppableId
        ) {
            return; // No change in position
        }

        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        const [removed] = sourceColumn.splice(source.index, 1);
        destinationColumn.splice(destination.index, 0, removed);

        setColumns({
            ...columns,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn,
        });
    };


    return (

        <div className="flex h-full pt-16 page-content">

            <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
                <Scrollbars autoHide>
                    <div className="flex flex-col pt-2 rounded-none">
                        <div onClick={handleModalToggle} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
                            <FaPlus className="text-white" />
                        </div>
                        {irData.map((item, index) => (
                            <StatusCard
                                key={item.id}
                                id={item.id}
                                slNo={`${index + 1}.1`}
                                title={item.title}
                                status={item.status}
                                slNoBgColor="#1081BB"
                                isSelected={item.id === selectedId} // Pass selection state
                                onClick={handleProgressItemClick} // Pass click handler
                            />
                        ))}
                    </div>
                </Scrollbars>
            </div>

            {selectedItem && (
                <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
                    <Scrollbars autoHide>
                        <div className="flex flex-col pt-2 rounded-none">
                            <div onClick={handleModalToggle} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
                                <FaPlus className="text-white" />
                            </div>
                            {selectedItem.sirData.map((sirItem, index) => (
                                <StatusCard
                                    key={sirItem.id}
                                    id={sirItem.id}
                                    slNo={`${selectedItem.id}.${index + 1}.1`}
                                    title={sirItem.title}
                                    status={sirItem.status}
                                    slNoBgColor="#EE6925"
                                    isSelected={sirItem.id === selectedSirDataId} // Pass selection state
                                    onClick={handleSirDataItemClick} // Pass click handler
                                />
                            ))}
                        </div>
                    </Scrollbars>
                </div>
            )}

            {selectedSirDataItem && (
                <div className="min-w-[230px] max-w-[230px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]">
                    <Scrollbars autoHide>
                        <div className="flex flex-col pt-2 rounded-none">
                            <div onClick={handleModalToggle} className="flex cursor-pointer gap-2.5 justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
                                <FaPlus className="text-white" />
                            </div>
                            {selectedSirDataItem.outputData.map((outputItem, index) => {
                                return (
                                    <StatusCard
                                        key={outputItem.id}
                                        id={outputItem.id}
                                        slNo={`${selectedItem.id}.${index + 1}.1 ${String.fromCharCode(97 + index)}`}
                                        title={outputItem.title}
                                        status={outputItem.status}
                                        slNoBgColor="#68B266"
                                        isSelected={outputItem.id === selectedOutputDataId}
                                        onClick={() => handleOutputDataItemClick(outputItem.id)}
                                    />
                                );
                            })}
                        </div>
                    </Scrollbars>
                </div>
            )}

            {selectedOutputDataId && (
                <div className="flex flex-col flex-1 bg-sky-900 bg-opacity-10">
                    <ActivityFilter />

                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex gap-4 flex-1 p-4">

                            {Object.entries(columns).map(([columnId, tasks]) => (
                                <div key={columnId} className="flex flex-col bg-white p-4 rounded-[8px] w-[250px]">

                                    <div className="flex flex-col rounded-none max-w-[290px] mb-[20px]">
                                        <div className="flex gap-3 items-center w-full pb-2.5" style={{ borderBottom: `2px solid ${getStatusColor(columnId)}` }}>
                                            <div className="w-[8px] h-[8px] rounded" style={{ backgroundColor: `${getStatusColor(columnId)}` }}></div>
                                            <div className="text-base font-bold text-slate-900">
                                                {formatTitle(columnId)}
                                            </div>
                                            <div onClick={handleModalToggle} className="flex gap-2.5 cursor-pointer ml-auto justify-center self-center items-center px-2.5 w-8 min-h-8 bg-sky-900 rounded-lg shadow-sm">
                                                <FaPlus className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <Scrollbars autoHide>
                                            <Droppable droppableId={columnId} isCombineEnabled={false}>
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="flex flex-col gap-2"
                                                    >
                                                        {tasks.map((task, index) => (
                                                            <Draggable
                                                                key={task.id} draggableId={task.id}
                                                                index={index}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}
                                                                        className="p-3 bg-gray-100 rounded shadow"
                                                                    >
                                                                        <div className="text-sm font-medium">
                                                                            {`Activity ${task.activity}`}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">
                                                                            {task.description}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                        </Scrollbars>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DragDropContext>

                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ActivityForm handleClose={handleCloseModal}/>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProgressCard;