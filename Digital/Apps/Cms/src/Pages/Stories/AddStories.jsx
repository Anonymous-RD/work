import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import { fetchThemes, createStory } from "../../api/api";
import { useHeader } from "../../components/context/HeaderContext";

const AddStories = () => {
  const editor = useRef(null);
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [themedata, setThemedata] = useState([]);
  const [content, setContent] = useState("");
  const { setTitle, setBackUrl } = useHeader();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  useEffect(() => {
    setTitle("Add Success Story...");
    setBackUrl("/stories"); // Set the back URL to the Blogs page
    return () => {
      setBackUrl(null); // Reset back URL when leaving the page
    };
  }, [setTitle, setBackUrl]);

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

  const darkTheme = watch("themes")?.includes("dark") ? "bg-[#1B212D] text-white" : "bg-white";

  // Handle multi-selection of themes
  const handleThemeChange = (e) => {
    const value = e.target.value;
    const currentThemes = watch("themes") || [];
    setValue("themes", currentThemes.includes(value)
      ? currentThemes.filter((theme) => theme !== value)
      : [...currentThemes, value]);
  };

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      themes: Array.isArray(data.themes) ? data.themes : [data.themes], // Ensure themes is an array
      status: "Draft",
      isActive: true,
    };
    if (featuredImage) {
      formData.imageUrl = URL.createObjectURL(featuredImage);
      formData.featuredImage = featuredImage;
    } else {
      formData.imageUrl =
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";
    }
    console.log("Data to be sent to backend:", formData);
    try {
      const response = await createStory(formData);
      if (response) {
        console.log("story created successfully:", response);
        reset({
          title: "",
          content: "",
          themes: [],
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300 ${watch("themes")?.includes("dark") ? "bg-[#1B212D] text-white" : "bg-gray-50"
        }`}
    >
      {/* Left Layout */}
      <div className={`w-full lg:w-[70%] py-6 px-0 rounded-lg ${darkTheme}`}>
        {/* Title and Theme */}
        <div className="flex gap-6 mb-4">
          {/* Title */}
          <div className="flex-1">
            <label
              className={`block font-normal mb-3 ${watch("themes")?.includes("dark") ? "text-white" : "text-[#1B212D]"}`}
            >
              Title
            </label>
            <input
              {...control.register("title", { required: "Title is required" })}
              type="text"
              placeholder="Enter story Title"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${watch("themes")?.includes("dark")
                ? "border-gray-600 bg-[#1B212D] text-white placeholder:text-white"
                : "border-gray-300 placeholder:text-[#78778B]"
                }`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Multi-Select Themes */}
          <div className="flex-1">
            <label
              className={`block font-normal mb-3 ${watch("themes")?.includes("dark") ? "text-white" : "text-[#1B212D]"}`}
            >
              Themes
            </label>
            <select
              value={watch("themes")}
              onChange={handleThemeChange}
              multiple
              className={`w-full p-3 text-[#78778B] border rounded-md focus:outline-none focus:ring-2 ${watch("themes")?.includes("dark")
                ? "border-gray-600 bg-[#1B212D] text-white"
                : "border-gray-300"
                }`}
            >
              <option value="" disabled>
                Select Themes
              </option>
              {themedata.map((themeOption) => (
                <option key={themeOption._id} value={themeOption._id} className="text-[#78778B]">
                  {themeOption.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex flex-col w-full mb-6">
          <label className="block font-normal mb-2 text-[#1B212D]">Content</label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <JoditEditor
                ref={editor}
                value={field.value}
                onChange={(newContent) => field.onChange(newContent)}
                className="w-full h-full px-4 py-2 border border-gray-300 rounded-[10px]"
              />
            )}
          />
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
        className={`w-full lg:w-[30%] rounded-lg py-6 px-0 transition-all duration-300 ${watch("themes")?.includes("dark") ? "bg-[#1B212D] text-white" : "bg-white"
          }`}
      >
        <h3 className="text-[#1B212D] font-normal mb-3">Featured Image</h3>
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

export default AddStories;
