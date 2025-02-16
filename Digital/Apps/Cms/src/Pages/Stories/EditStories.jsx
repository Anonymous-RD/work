import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { fetchStoriesById, fetchThemes, updateStory } from "../../api/api";
import { useLocation } from "react-router-dom"; // To fetch `Id` from location.state
import { useHeader } from "../../components/context/HeaderContext";

const EditStories = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const location = useLocation();
  const { Id } = location.state || {}; // Fetching the story ID from the route state
  const { setTitle, setBackUrl } = useHeader();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [themes, setThemes] = useState([]);
  const [existingStory, setExistingStory] = useState(null);

  useEffect(() => {
    setTitle("Edit Success Story...");
    setBackUrl("/stories"); // Set the back URL to the Blogs page
    return () => {
      setBackUrl(null); // Reset back URL when leaving the page
    };
  }, [setTitle, setBackUrl]);

  useEffect(() => {
    const fetchThemesAndStory = async () => {
      try {
        // Fetch the themes first
        const themeResponse = await fetchThemes();
        setThemes(themeResponse.data);

        // Fetch the story data by ID
        if (Id) {
          const storyResponse = await fetchStoriesById(Id);
          const story = storyResponse.data;
          console.log("Story fetched:", story);

          // Set the fetched story data to the form
          setExistingStory(story);
          setValue("title", story.title);
          setValue("content", story.content);
          const themeIds = story.themes.map((theme) => theme._id); // Extract _id from each theme object
          setValue("themes", themeIds); // Assuming themes is an array of theme IDs
          if (story.featuredImage) {
            setFeaturedImage(story.featuredImage);
          }
        }
      } catch (error) {
        console.error("Error fetching themes or story:", error);
      }
    };

    fetchThemesAndStory();
  }, [Id, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      themes: data.themes, // Array of theme IDs
      status: "Draft", // Adjust if needed
      isActive: true,
    };

    // Handling the featured image logic
    if (featuredImage) {
      formData.imageUrl =
        featuredImage instanceof File
          ? URL.createObjectURL(featuredImage)
          : featuredImage;
      formData.featuredImage = featuredImage;
    } else {
      formData.imageUrl =
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"; // Default image
    }

    try {
      const response = await updateStory(Id, formData); // Assuming `Id` is part of location.state
      if (response.message = "Story updated successfully") {
        console.log("Story updated successfully:", response);
      }
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300"
    >
      {/* Left Layout */}
      <div className="w-full lg:w-[70%] py-6 px-0 rounded-lg">
        {/* Title and Theme */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6 mb-4">
            {/* Title */}
            <div className="flex-1">
              <label className="block font-normal mb-3">Title</label>
              <input
                {...register("title")}
                type="text"
                placeholder="Enter Blog Title"
                className="w-full p-3 border rounded-md focus:outline-none"
              />
            </div>

            {/* Theme */}
            <div className="flex-1">
              <label className="block font-normal mb-3">Theme</label>
              <select
                {...register("themes")}
                multiple
                className="w-full p-3 text-[#78778B] border rounded-md focus:outline-none"
              >
                {themes.map((theme) => (
                  <option key={theme._id} value={theme._id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex flex-col w-full mb-6">
            <label className="block font-normal mb-2">Content</label>
            <div className="h-[300px] border rounded-[10px]">
              <JoditEditor
                value={watch("content")}
                onChange={(newContent) => setValue("content", newContent)}
                className="w-full h-full px-4 py-2"
              />
            </div>
          </div>

          {/* Publish Button */}
          <button
            type="submit"
            className="bg-[#003765] text-[#FFFFFF] py-3 px-6 rounded-lg hover:opacity-90"
          >
            UPDATE
          </button>
        </form>
      </div>

      {/* Right Layout */}
      <div className="w-full lg:w-[30%] rounded-lg py-6 px-0">
        <h3 className="text-[#1B212D] font-normal mb-3">Featured Image</h3>
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

export default EditStories;
