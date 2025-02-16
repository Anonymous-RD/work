import React, { useState, useEffect } from "react";
import axios from "axios";

const DynamicDrop = ({ url,setData }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to fetch data from the API
  const fetchData = async (searchQuery) => {
    setLoading(true); // Set loading to true before fetching data
    setNotFound(false);

    try {
      const response = await axios.get(`${url}${searchQuery}`);

      if (response.data && response.data.length > 0) {
        setResults(response.data);
      } else {
        setResults([]);
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
      setNotFound(true);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        if (value.trim() !== "") {
          fetchData(value);
          setData(value);
        } else {
          setResults([]);
          setNotFound(false);
        }
      }, 300) // Adjust debounce delay as needed
    );
  };

  // Handle selecting a result
  const handleSelect = (name) => {
    setQuery(name); // Update the input with the selected name or email
    setData(name)
    setResults([]); // Clear the dropdown
    setNotFound(false); // Reset not found state
  };

  return (
    <div className="dropdown-container relative">
      <input
        type="text"
        name="user"
        autoComplete="off"
        placeholder="Enter User Email"
        value={query}
        onChange={handleInputChange}
        className="gap-6 !py-3 focus:outline-none focus:border-zinc-600 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
        aria-label="Enter Invitee Email"
      />
      {query && (
        <div className="dropdown absolute w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
          {loading ? (
            <p className="p-2 text-gray-500">Loading...</p> // Display loading text if loading is true
          ) : (
            <>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(result.email)} // Display selected email in the input
                  >
                    {result.name}
                  </div>
                ))
              ) : notFound ? (
                <p className="p-2 text-red-500">Name not found</p> // Display "not found" message
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicDrop;
