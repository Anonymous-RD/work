import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form
import { fetchBlogById, fetchThemes, updateBlog } from "../../api/api";
import Loader from "../../components/common/Loader";
import { useHeader } from "../../components/context/HeaderContext";

const EditBlogs = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { blogId } = location.state || {};

  const { control, handleSubmit, setValue, getValues } = useForm(); // Initialize React Hook Form
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const { setTitle, setBackUrl } = useHeader();

  useEffect(() => {
      setTitle("Edit Blog");
      setBackUrl("/blogs"); // Set the back URL to the Blogs page
      return () => {
        setBackUrl(null); // Reset back URL when leaving the page
      };
    }, [setTitle, setBackUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch themes
        const themesResponse = await fetchThemes();
        setThemes(themesResponse.data);
        // Fetch blog data
        if (blogId) {
          const blog = await fetchBlogById(blogId);
          const { title, content, themes, imageUrl } = blog.data;

          setValue("title", title);
          setValue("content", content);
          setValue(
            "themes",
            themes.map((theme) => theme._id) // Extract theme IDs
          );
          setFeaturedImage(imageUrl);
        } else {
          navigate("/blogs");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogId, setValue, navigate]);

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      themes: data.themes, // Array of theme IDs
      status: "Published",
      isActive: true,
      authorId: "675ac092cd05ed95e78a8670",
    };

    if (featuredImage) {
      formData.imageUrl =
        featuredImage instanceof File
          ? URL.createObjectURL(featuredImage)
          : featuredImage;
      formData.featuredImage = featuredImage;
    } else {
      formData.imageUrl =
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";
    }

    try {
      await updateBlog(blogId, formData);
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFeaturedImage(file);
  };

  if (loading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8"
    >
      {/* Left Layout */}
      <div className="w-full lg:w-[70%] py-6 px-0 rounded-lg">
        <div className="flex gap-6 mb-4">
          {/* Title */}
          <div className="flex-1">
            <label className="block font-normal mb-3">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter Blog Title"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
                />
              )}
            />
          </div>

          {/* Theme */}
          <div className="flex-1">
            <label className="block font-normal mb-3">Themes</label>
            <Controller
              name="themes"
              control={control}
              render={({ field: { onChange, value } }) => (
                <select
                  multiple
                  value={value || []} // Ensure the value is an array
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(
                      (option) => option.value
                    );
                    onChange(selectedOptions); // Update themes in the form state
                  }}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
                >
                  {Array.isArray(themes) &&
                    themes.map((theme) => (
                      <option key={theme._id} value={theme._id}>
                        {theme.name}
                      </option>
                    ))}
                </select>
              )}
            />
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex flex-col w-full mb-6">
          <label className="block font-normal mb-2">Content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <JoditEditor
                ref={editor}
                value={field.value}
                onChange={(content) => field.onChange(content)}
                className="w-full h-[300px] border rounded-[10px] border-gray-300"
              />
            )}
          />
        </div>

        {/* Publish Button */}
        <button
          type="submit"
          className="bg-[#003765] text-[#FFFFFF] py-3 px-6 rounded-lg hover:opacity-90"
        >
          PUBLISH
        </button>
      </div>

      {/* Right Layout */}
      <div className="w-full lg:w-[30%] rounded-lg py-6 px-0">
        <h3 className="text-[#1B212D] font-normal mb-3">Featured Image</h3>
        <div className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4 text-center">
          {featuredImage ? (
            <img
              src={
                featuredImage instanceof File
                  ? URL.createObjectURL(featuredImage)
                  : featuredImage
              }
              alt="Uploaded"
              className="h-full w-full object-cover rounded-md"
            />
          ) : (
            <>
              <FiUploadCloud size={40} color="#003765" />
              <p className="text-[#3A3A49] mt-2">Select a file or drag and drop here</p>
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

export default EditBlogs;
