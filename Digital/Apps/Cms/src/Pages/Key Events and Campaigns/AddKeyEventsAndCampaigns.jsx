import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import { fetchThemes, createEventsAndCompaign } from "../../api/api";
import { useHeader } from "../../components/context/HeaderContext";

const AddKeyEventsAndCampaigns = () => {
  const editor = useRef(null);
  const { control, handleSubmit, reset, formState: { errors }, } = useForm();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [themedata, setThemedata] = useState([]);
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("");
  const { setTitle, setBackUrl } = useHeader();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  useEffect(() => {
    setTitle("Add Key Events and Campaigns");
    setBackUrl("/keyevents");
    return () => {
      setBackUrl(null);
    };
  },[ setTitle, setBackUrl]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetchThemes();
        setThemedata(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTheme();
  }, []);

  

  const darkTheme = theme === "dark" ? "bg-[#1B212D] text-white" : "bg-white";

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      themes: data.themes, // Use selected theme
      type: data.type, // Key Event or Campaign
      status: "Draft",
      isActive: true,
    };

    const imageUrls = [];

  if (featuredImage) {
    imageUrls.push(URL.createObjectURL(featuredImage));  // Add the selected image's URL
    formData.featuredImage = featuredImage;  // Keep the file reference for upload
  } else {
    // If no image is selected, you can still push a default image to the array
    imageUrls.push("https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg");
  }

  // Assign imageUrls as an array to formData
  formData.imageUrl = imageUrls;

  console.log("Data to be sent to backend:", formData);
    
    try {
      const response = await createEventsAndCompaign(formData);

      console.log("Event or Campaign created successfully:", response);
      if (response, message === "Event or Campaign created successfully") {
        reset({
          title: "",
          content: "",
          theme: "",
          type: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300 ${theme === "dark" ? "bg-[#1B212D] text-white" : "bg-gray-50"
        }`}
    >
      {/* Left Layout */}
      <div className={`w-full lg:w-[70%] py-6 px-0 rounded-lg ${darkTheme}`}>
        {/* Title and Theme */}
        <div className="flex gap-6 mb-4">
          {/* Title */}
          <div className="flex-1">
            <label
              className={`block font-normal mb-3 ${theme === "dark" ? "text-white" : "text-[#1B212D]"}`}
            >
              Title
            </label>
            <input
              {...control.register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter Event or Campaign Title"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-gray-600 bg-[#1B212D] text-white placeholder:text-white"
                  : "border-gray-300 placeholder:text-[#78778B]"
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Theme */}
          <div className="flex-1">
            <label
              className={`block font-normal mb-3 ${theme === "dark" ? "text-white" : "text-[#1B212D]"}`}
            >
              Theme
            </label>
            <select
              {...control.register("themes", { required: "Please select a theme" })}
              onChange={(e) => setTheme(e.target.value)}
              className={`w-full p-3 text-[#78778B] border rounded-md focus:outline-none focus:ring-2 ${
                theme === "dark" ? "border-gray-600 bg-[#1B212D] text-white" : "border-gray-300"
              }`}
              multiple
            >
              <option value="" disabled>
                Select a Theme
              </option>
              {themedata.map((themeOption) => (
                <option key={themeOption._id} value={themeOption._id}>
                  {themeOption.name}
                </option>
              ))}
            </select>
            {errors.theme && <p className="text-red-500 text-sm">{errors.theme.message}</p>}
          </div>
        </div>

        {/* Type Section */}
        <div className="mb-4">
  <label
    className={`block font-normal mb-3 ${theme === "dark" ? "text-white" : "text-[#1B212D]"}`}
  >
    Type
  </label>
  <div className="flex gap-6">
    <label className="flex items-center gap-2">
      <input
        {...control.register("type")}
        type="radio"
        value="Key_Events"
        className="h-4 w-4"
      />
      <span className={`${theme === "dark" ? "text-white" : "text-[#1B212D]"}`}>Key Event</span>
    </label>
    <label className="flex items-center gap-2">
      <input
        {...control.register("type")}
        type="radio"
        value="Campaign"
        className="h-4 w-4"
      />
      <span className={`${theme === "dark" ? "text-white" : "text-[#1B212D]"}`}>Campaign</span>
    </label>
  </div>
</div>


        {/* Content Editor */}
        <div className="flex flex-col w-full mb-6">
          <label className={`block font-normal mb-2 ${theme === "dark" ? "text-white" : "text-[#1B212D]"}`}>
            Synopsis
          </label>
          <div
            className={`h-[300px] border rounded-[10px] ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
          >
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <JoditEditor
                  ref={editor}
                  value={field.value}
                  onChange={(newContent) => field.onChange(newContent)}
                  className={`w-full h-full px-4 py-2 ${
                    theme === "dark"
                      ? "bg-[#1B212D] text-white placeholder:text-gray-400"
                      : "placeholder:text-[#1B212D]"
                  }`}
                />
              )}
            />
          </div>
        </div>

        {/* Publish Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-[#003765] text-[#FFFFFF] py-3 px-6 rounded-lg hover:opacity-90"
        >
          PUBLISH
        </button>
      </div>

      {/* Right Layout */}
      <div
        className={`w-full lg:w-[30%] rounded-lg py-6 px-0 transition-all duration-300 ${theme === "dark" ? "bg-[#1B212D] text-white" : "bg-white"
          }`}
      >
        <h3 className="text-[#1B212D] font-normal mb-3">Images</h3>
        <div className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4 text-center" style={{ border: "1px dashed #003765" }}>
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

export default AddKeyEventsAndCampaigns;
