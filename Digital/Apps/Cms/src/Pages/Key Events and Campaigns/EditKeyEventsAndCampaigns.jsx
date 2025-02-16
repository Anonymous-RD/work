import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { fetchEventsAndCompaignsById, fetchThemes, updateEventsAndCompaign } from "../../api/api";
import { useHeader } from "../../components/context/HeaderContext";

const EditKeyEventsAndCampaigns = () => {
  const editor = useRef(null);
  const location = useLocation();
  const { id } = location.state || {}; // Fetching the event/campaign ID from the route state

  const [featuredImage, setFeaturedImage] = useState(null);
  const [content, setContent] = useState("");
  const [themes, setThemes] = useState([]); // Available themes
  const [selectedThemes, setSelectedThemes] = useState([]); // Selected theme IDs
  const { setTitle, setBackUrl } = useHeader();
  const [type, setType] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  useEffect(() => {
      setTitle("Edit Key Events and Campaigns");
      setBackUrl("/keyevents");
      return () => {
        setBackUrl(null);
      };
    },[ setTitle, setBackUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch available themes
        const themeResponse = await fetchThemes();
        setThemes(themeResponse.data);

        // Fetch event/campaign data by ID
        if (id) {
          const eventResponse = await fetchEventsAndCompaignsById(id);
          const eventData = eventResponse.data;
          console.log("Event/Campaign fetched:", eventData);

          // Set fetched data to the state
          setEventTitle(eventData.title);
          setContent(eventData.content);
          setType(eventData.type);
          setSelectedThemes(eventData.themes.map((theme) => theme._id));
          if (eventData.featuredImage) {
            setFeaturedImage(eventData.featuredImage);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  const handleThemeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedThemes(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: eventTitle,
      content,
      type,
      themes: selectedThemes,
    };

    // Handling the featured image logic
    if (featuredImage) {
      formData.imageUrl =
        featuredImage instanceof File
          ? URL.createObjectURL(featuredImage)
          : featuredImage;
      formData.featuredImage = featuredImage;
    }
    console.log("Form Data:", formData);
    
    try {
      const response = await updateEventsAndCompaign(id, formData);
      if (response.message === "Event/Campaign updated successfully") {
        console.log("Event/Campaign updated successfully:", response);
      }
    } catch (error) {
      console.error("Error updating Event/Campaign:", error);
    }
  };

  const darkTheme = themes === "dark" ? "bg-[#1B212D] text-white" : "bg-white";

  return (
    <div
      className={`flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300 ${
        themes === "dark" ? "bg-[#1B212D] text-white" : "bg-gray-50"
      }`}
    >
      {/* Left Layout */}
      <div className={`w-full lg:w-[70%] py-6 px-0 rounded-lg ${darkTheme}`}>
        <form onSubmit={handleSubmit}>
          {/* Title and Theme Section */}
          <div className="flex gap-6 mb-4">
            {/* Title */}
            <div className="flex-1">
              <label
                className={`block font-normal mb-3 ${
                  themes === "dark" ? "text-white" : "text-[#1B212D]"
                }`}
              >
                Title
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter Event or Compaign Title"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  themes === "dark"
                    ? "border-gray-600 bg-[#1B212D] text-white placeholder:text-white"
                    : "border-gray-300 placeholder:text-[#78778B]"
                }`}
              />
            </div>

            {/* Themes */}
            <div className="flex-1">
              <label
                className={`block font-normal mb-3 ${
                  themes === "dark" ? "text-white" : "text-[#1B212D]"
                }`}
              >
                Themes
              </label>
              <select
                multiple
                value={selectedThemes}
                onChange={handleThemeChange}
                className={`w-full p-3 text-[#78778B] border rounded-md focus:outline-none focus:ring-2 ${
                  themes === "dark"
                    ? "border-gray-600 bg-[#1B212D] text-white"
                    : "border-gray-300"
                }`}
              >
                {themes.map((theme) => (
                  <option key={theme._id} value={theme._id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Section */}
          <div className="mb-4">
            <label
              className={`block font-normal mb-3 ${
                themes === "dark" ? "text-white" : "text-[#1B212D]"
              }`}
            >
              Type
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Key_Events"
                  checked={type === "Key_Events"}  
                  onChange={() => setType("Key_Events")}
                  className="h-4 w-4"
                />
                <span
                  className={`${
                    themes === "dark" ? "text-white" : "text-[#1B212D]"
                  }`}
                >
                  Key Event
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="Compaigns"
                  checked={type === "Compaigns"}
                  onChange={() => setType("Compaigns")}
                  className="h-4 w-4 bg-[#003765]"
                />
                <span
                  className={`${
                    themes === "dark" ? "text-white" : "text-[#1B212D]"
                  }`}
                >
                  Campaign
                </span>
              </label>
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex flex-col w-full mb-6">
            <label
              className={`block font-normal mb-2 ${
                themes === "dark" ? "text-white" : "text-[#1B212D]"
              }`}
            >
              Synopsis
            </label>
            <div
              className={`h-[300px] border rounded-[10px] ${
                themes === "dark" ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setContent(newContent)}
                className={`w-full h-full px-4 py-2 ${
                  themes === "dark"
                    ? "bg-[#1B212D] text-white placeholder:text-gray-400"
                    : "placeholder:text-[#1B212D]"
                }`}
              />
            </div>
          </div>

          {/* Publish Button */}
          <button className="bg-[#003765] text-[#FFFFFF] py-3 px-6 rounded-lg hover:opacity-90">
            PUBLISH
          </button>
        </form>
      </div>

      {/* Right Layout */}
      <div
        className={`w-full lg:w-[30%] rounded-lg py-6 px-0 transition-all duration-300 ${
          themes === "dark" ? "bg-[#1B212D] text-white" : "bg-white"
        }`}
      >
        <h3 className="text-[#1B212D] font-normal mb-3">Images</h3>
        <div
          className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4 text-center"
          style={{ border: "1px dashed #003765" }}
        >
          {featuredImage ? (
            <img
              src={URL.createObjectURL(featuredImage)}
              alt="Uploaded"
              className="h-full w-full object-cover rounded-md"
            />
          ) : (
            <>
              <FiUploadCloud size={40} color="#003765" />
              <p className="text-[#3A3A49] mt-2">Select a file or drag and drop here</p>
              <p className="text-xs mt-2 text-[#929EAE] px-9">
                JPG, XLSX, or PDF, file size no more than 10MB
              </p>
              <label className="mt-2">
                <button className="bg-[#003765] uppercase text-[#FFFFFF] py-2 px-4 rounded-lg cursor-pointer hover:opacity-90">
                  Select File(s)
                </button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditKeyEventsAndCampaigns;
