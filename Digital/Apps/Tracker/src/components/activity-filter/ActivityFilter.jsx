import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchActivities } from "../../redux/slices/activitySlice";

function ActivityFilter({
  outputId,
  state,
  year,
  quarter,
  setSelectedState,
  setSelectedYear,
  setSelectedQuarter,
  onSelectionComplete,
}) {
  const [dropdownData, setDropdownData] = useState({
    states: [],
    years: ["2022", "2023", "2024", "2025", "2026"],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true); // Flag for initial render

  // Quarters data
  const quarters = [
    { label: "Jan-Mar", value: "Q1" },
    { label: "Apr-Jun", value: "Q2" },
    { label: "Jul-Sep", value: "Q3" },
    { label: "Oct-Dec", value: "Q4" },
  ];

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const activitiesResponse = await fetch(
          "https://us-central1-styletrends-5dc20.cloudfunctions.net/awp_tracker/activity/"
        );
        const activitiesData = await activitiesResponse.json();

        const stateIds = [
          ...new Set(activitiesData.flatMap((activity) => activity.stateIds)),
        ];

        const statesResponse = await fetch(
          "https://us-central1-styletrends-5dc20.cloudfunctions.net/awp_tracker/state/"
        );

        if (!statesResponse.ok) {
          throw new Error(
            `Failed to fetch states: ${statesResponse.statusText}`
          );
        }

        const statesData = await statesResponse.json();
        const filteredStates = statesData.data.filter((st) =>
          stateIds.includes(st._id)
        );

        setDropdownData((prev) => ({
          ...prev,
          states: filteredStates,
        }));
      } catch (error) {
        console.error("Error fetching states:", error);
        setError("Failed to fetch states.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStates();
  }, []); // Fetch states only on component mount

  // Fetch activities only when all filters are selected
  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchFilteredActivities = () => {
      if (outputId && state && year && quarter) {
        dispatch(fetchActivities({ outputId, state, year, quarter }));
        onSelectionComplete(true);
      } else {
        onSelectionComplete(false);
      }
    };

    // Add debounce to avoid multiple API calls on rapid input changes
    const debounceTimer = setTimeout(fetchFilteredActivities, 500); // 500ms delay

    return () => clearTimeout(debounceTimer); // Cleanup previous calls if dependencies change quickly
  }, [outputId, state, year, quarter]); // Dependency array ensures this runs only when these values change

  // Handle state change
  const handleStateChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedState(selectedValue === "all" ? "" : selectedValue);
  };

  return (
    <div className="flex justify-end items-center gap-4 py-4">
      {/* Loading and Error Handling */}
      {isLoading && <p>Loading states...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* State Dropdown */}
      <select
        value={state}
        onChange={handleStateChange}
        className="p-2 border rounded"
        disabled={isLoading}
      >
        <option value="">Select State</option>
        <option value="all">All</option>
        {dropdownData.states.map((st) => (
          <option key={st._id} value={st._id}>
            {st.name}
          </option>
        ))}
      </select>

      {/* Year Dropdown */}
      <select
        value={year}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Select Year</option>
        {dropdownData.years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      {/* Quarter Dropdown */}
      <select
        value={quarter}
        onChange={(e) => setSelectedQuarter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Select Quarter</option>
        {quarters.map((q) => (
          <option key={q.value} value={q.value}>
            {q.label}
          </option>
        ))}
      </select>

      {/* Download Button */}
      <button className="p-2 bg-blue-500 text-white rounded">Download</button>
    </div>
  );
}

export default ActivityFilter;
