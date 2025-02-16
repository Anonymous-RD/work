import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { updateBestPractice, fetchBestPracticesById, fetchThemes } from "../../api/api";
import { useLocation } from "react-router-dom";
import { useHeader } from "../../components/context/HeaderContext";

const EditBestPractices = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const location = useLocation();
  const { id } = location.state || {};
  const { setTitle, setBackUrl } = useHeader();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [themes, setThemes] = useState([]);
  const [existingPractice, setExistingPractice] = useState(null);
  useEffect(() => {
      setTitle("Edit Best Practice");
      setBackUrl("/bestpractices"); // Set the back URL to the Blogs page
      return () => {
        setBackUrl(null); // Reset back URL when leaving the page
      };
    }, [setTitle, setBackUrl]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const themeResponse = await fetchThemes();
        setThemes(themeResponse.data);

        if (id) {
          const practiceResponse = await fetchBestPracticesById(id);
          const practice = practiceResponse.data;
          setExistingPractice(practice);
          setValue("title", practice.title);
          setValue("content", practice.content);
          setValue("themes", practice.themes); // Assuming themes is an array of theme objects
          if (practice.featuredImage) {
            setFeaturedImage(practice.featuredImage);
          }
        }
      } catch (error) {
        console.error("Error fetching themes or practice:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      themes: data.themes, // Array of selected theme IDs
      status: "Draft", // Adjust status if needed
      isActive: true,
    };

    if (featuredImage) {
      formData.featuredImage =
        featuredImage instanceof File
          ? URL.createObjectURL(featuredImage)
          : featuredImage;
    }

    try {
      const response = await updateBestPractice(id, formData);
      console.log("Best Practice updated successfully:", response);
    } catch (error) {
      console.error("Error updating best practice:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300">
      {/* Left Layout */}
      <div className="w-full lg:w-[70%] py-6 px-0 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6 mb-4">
            {/* Title */}
            <div className="flex-1">
              <label className="block font-normal mb-3">Title</label>
              <input
                {...register("title")}
                type="text"
                placeholder="Enter Best Practice Title"
                className="w-full p-3 border rounded-md focus:outline-none"
              />
            </div>

            {/* Themes (Multiple Selector) */}
            <div className="flex-1">
              <label className="block font-normal mb-3">Themes</label>
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
                JPG, PNG, or PDF, file size no more than 10MB
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

export default EditBestPractices;
