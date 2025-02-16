import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { FiUploadCloud } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { createNewsLetter } from "../../api/api";
import { useHeader } from "../../components/context/HeaderContext";

const AddNewsLetters = () => {
  const editor = useRef(null);
  const { handleSubmit, register, reset, setValue, watch } = useForm();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const { setTitle, setBackUrl } = useHeader();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "image") setFeaturedImage(file);
      if (type === "file") setFile(file);
    }
  };

  useEffect(() => {
    setTitle("Add News Letter");
    setBackUrl("/newsletters"); // Set the back URL to the Blogs page
    return () => {
      setBackUrl(null); // Reset back URL when leaving the page
    };
  }, [setTitle, setBackUrl]);

  const onSubmit = async (data) => {
    const formattedReleaseDate = releaseDate
      ? format(releaseDate, "yyyy/MM/dd")
      : null;

    const formData = {
      title: data.title,
      content: content || "",
      status: "Draft",
      isActive: true,
      imageUrl: featuredImage
        ? URL.createObjectURL(featuredImage)
        : "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      fileUrl: file
        ? URL.createObjectURL(file)
        : "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      releaseDate: formattedReleaseDate,
    };

    console.log("Data to be sent to backend:", formData);

    try {
      const response = await createNewsLetter(formData);
      if (response) {
        console.log("News created successfully:", response);
        reset();
        setContent("");
        setFeaturedImage(null);
        setFile(null);
        setReleaseDate(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 transition-all duration-300 bg-gray-50"
    >
      {/* Left Layout */}
      <div className="w-full lg:w-[70%] py-6 px-0 rounded-lg bg-white">
        {/* Title and Release Date */}
        <div className="flex gap-6 mb-4">
          {/* Title */}
          <div className="flex-1">
            <label className="block font-normal mb-3 text-[#1B212D]">Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter Blog Title"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300 placeholder:text-[#78778B]"
            />
          </div>

          {/* Release Date */}
          <div className="flex-1">
            <label className="block font-normal mb-3 text-[#1B212D]">Release Date</label>
            <DatePicker
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300 text-[#78778B]"
            />
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex flex-col w-full mb-6">
          <label className="block font-normal mb-2 text-[#1B212D]">Synopsis</label>
          <div className="h-[300px] border rounded-[10px] border-gray-300">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
              className="w-full h-full px-4 py-2 placeholder:text-[#1B212D]"
            />
          </div>
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
      <div className="w-full lg:w-[30%] rounded-lg py-6 px-0 transition-all duration-300 bg-white">
        <div>
          <h3 className="text-[#1B212D] font-normal mb-3">Image</h3>
          <div
            className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4 text-center"
            style={{ border: "1px dashed #003765" }}
          >
            <FiUploadCloud size={40} color="#003765" />
            <p className="text-[#3A3A49] mt-2">Select a file or drag and drop here</p>
            <p className="text-xs mt-2 text-[#929EAE] px-9">
              JPG, PNG, file size no more than 10MB
            </p>
            <label className="mt-2">
              <button className="bg-[#003765] uppercase text-[#FFFFFF] py-2 px-4 rounded-lg cursor-pointer hover:opacity-90">
                Select File(s)
              </button>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "image")}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-[#1B212D] font-normal mb-3">PDF</h3>
          <div
            className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4 text-center"
            style={{ border: "1px dashed #003765" }}
          >
            <FiUploadCloud size={40} color="#003765" />
            <p className="text-[#3A3A49] mt-2">Select a PDF or drag and drop here</p>
            <p className="text-xs mt-2 text-[#929EAE] px-9">PDF File</p>
            <label className="mt-2">
              <button className="bg-[#003765] uppercase text-[#FFFFFF] py-2 px-4 rounded-lg cursor-pointer hover:opacity-90">
                Select File(s)
              </button>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "file")}
                accept="application/pdf"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewsLetters;

