import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyCard from "../../components/admin/SurveyCard";
import { FiSearch, FiPlus } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { fetchAllSurveys, deleteSurveyById } from "@/api/api";
import { toast } from "react-hot-toast";
const SurveyList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetchAllSurveys();
        setSurveys(response);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };
    fetchSurveys();
  }, [surveys]);

  const handleDeleteSurvey = async (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      try {
        const response = await deleteSurveyById(id);
        if (response.message === "Survey deleted successfully") {
        toast.success(response.message);
        setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.id !== id));
      }
      } catch (error) {
        toast.error("Failed to delete survey. Please try again.");
      }
    }
  };

  const handleCreateSurvey = () => navigate("/add");

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = survey.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || survey.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id) => { 
    navigate(`/edit/${id}`)
    const surveyToEdit = filteredSurveys.find((survey) => survey._id === id);
    navigate("/add", { state: { surveyToEdit } });
  };

  const handleView = (id) => { navigate(`/view/${id}`) };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 space-x-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-xs">
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 cursor-pointer"
            onClick={handleIconClick}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search surveys"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out"
          />
        </div>
        {/* Filter Dropdowns */}
        <div className="flex space-x-4">
          <div
          // onClick={}
          // className="relative w-[180px] px-2 bg-lime-400 gap-1 flex items-center border rounded-[10px] cursor-pointer"
          >
            {/* <MdAdd className="font-bold text-2xl" /> */}
            <button
              onClick={handleCreateSurvey}
              className="flex gap-2.5 items-center px-5 py-3.5 font-semibold text-sm text-white bg-sky-900 rounded-xl"
            >
              <FiPlus size={18} />New Survey
            </button>
          </div>
          {/* Status Filter */}
          <div className="relative w-[140px] flex">
            <IoFilter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <select value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-[160px] sm:h-[50px] border border-gray-300 rounded-2xl pl-4 pr-2 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-500 transition duration-300 ease-in-out appearance-none"
            >
              <option value="All">All</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurveys.map((survey) => (
          <SurveyCard key={survey.id} survey={survey} 
          onView={() => {handleView}}
          onEdit={handleEdit}
          onDelete={handleDeleteSurvey}/>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;
