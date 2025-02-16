import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "../../components/common/Loader";  // Assuming you have a Loader component
import { fetchThemes, createBestPractice } from "../../api/api";  // Assuming createBestPractice API exists
import { useHeader } from "../../components/context/HeaderContext";

const AddBestPractices = () => {
  const editor = useRef(null);
  const { control, handleSubmit, register, setValue, watch } = useForm();
  const [themedata, setThemedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredImage, setFeaturedImage] = useState(null);
  const { setTitle, setBackUrl } = useHeader();
  const selectedThemes = watch("themes", []);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await fetchThemes();
        setThemedata(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  useEffect(() => {
    setTitle("Add Best Practice");
    setBackUrl("/bestpractices"); // Set the back URL to the Blogs page
    return () => {
      setBackUrl(null); // Reset back URL when leaving the page
    };
  }, [setTitle, setBackUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    console.log(selectedOptions);  // selectedOptions will now be an array of selected theme IDs
  };


  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      themes: Array.isArray(data.themes) ? data.themes : [data.themes],
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
      const response = await createBestPractice(formData);
      if (response) {
        console.log("Best practice created successfully:", response);
        reset({
          title: "",
          content: "",
          themes: [],
        });
      }
    } catch (error) {
      console.error("Error creating best practice:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300 bg-gray-50"
    >
      {/* Left Layout */}
      <div className="w-full lg:w-[70%] py-6 px-0 rounded-lg bg-white">
        {/* Title and Themes */}
        <div className="flex gap-6 mb-4">
          {/* Title */}
          <div className="flex-1">
            <label className="block font-normal mb-3 text-[#1B212D]">Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter Best Practice Title"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300 placeholder:text-[#78778B]"
            />
          </div>

          {/* Themes */}
          <div className="flex-1">
            <label className="block font-normal mb-3 text-[#1B212D]">Themes</label>
            <select
              {...register("themes", {
                required: true,
                onChange: (e) => { handleSelectChange(e) },
              })}
              multiple
              className="w-full p-3 text-[#78778B] border rounded-md focus:outline-none focus:ring-2 border-gray-300"
            >
              <option value="" disabled>
                Select a Theme
              </option>
              {themedata.map((theme) => (
                <option key={theme._id} value={theme._id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex flex-col w-full mb-6">
          <label className="block font-normal mb-2 text-[#1B212D]">Synopsis</label>
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
        <button type="submit" className="bg-[#003765] text-[#FFFFFF] py-3 px-6 rounded-lg hover:opacity-90">
          PUBLISH
        </button>
      </div>

      {/* Right Layout */}
      <div className="w-full lg:w-[30%] rounded-lg py-6 px-0 transition-all duration-300 bg-white">
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
              <p className="text-[#3A3A49] mt-2">
                Select a file or drag and drop here
              </p>
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
    </form>
  );
};

export default AddBestPractices;