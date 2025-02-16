import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { updateNewsLetters, fetchNewsLettersById } from "../../api/api";
import { useLocation } from "react-router-dom";
import { useHeader } from "../../components/context/HeaderContext";

const EditNewsLetters = () => {
  const editor = useRef(null);
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [content, setContent] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const { Id } = location.state || {};
  const { setTitle, setBackUrl } = useHeader();

  useEffect(() => {
    setTitle("Edit News Letter");
    setBackUrl("/newsletters"); // Set the back URL to the Newsletters page
    return () => {
      setBackUrl(null); // Reset back URL when leaving the page
    };
  }, [setTitle, setBackUrl]);

  useEffect(() => {
    if (Id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetchNewsLettersById(Id);
          const news = response?.data || {};
          setNewsletterTitle(news.title || "");
          setContent(news.content || "");
          setReleaseDate(news.releaseDate ? new Date(news.releaseDate) : null);
          if (news.imageUrl) setFeaturedImage(news.imageUrl);
          if (news.fileUrl) setFile(news.fileUrl);
        } catch (error) {
          console.error("Error fetching newsletter:", error);
          setError("Failed to fetch newsletter details.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [Id]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") setFeaturedImage(file || null);
    if (type === "file") setFile(file || null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formattedReleaseDate = releaseDate
      ? format(releaseDate, "yyyy/MM/dd")
      : null;

    const imageUrl =
      featuredImage instanceof File
        ? URL.createObjectURL(featuredImage)
        : featuredImage;

    const fileUrl = file instanceof File ? URL.createObjectURL(file) : file;

    const formData = {
      title: newsletterTitle,
      content,
      isActive: true,
      imageUrl:
        imageUrl ||
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      fileUrl: fileUrl || null,
      releaseDate: formattedReleaseDate,
    };

    try {
      setLoading(true);
      const response = await updateNewsLetters(Id, formData);
      if (response) {
        console.log("Newsletter updated successfully:", response);
        setNewsletterTitle("");
        setContent("");
        setReleaseDate(null);
      }
    } catch (error) {
      console.error("Error updating newsletter:", error);
      setError("Failed to update newsletter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col lg:flex-row px-8 pt-20 min-h-screen gap-8 bg-gray-50"
    >
      {/* Left Layout */}
      <div className="w-full lg:w-[70%] py-6 bg-white">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-6 mb-4">
          <div className="flex-1">
            <label className="block font-normal mb-3 text-[#1B212D]">
              Title
            </label>
            <input
              type="text"
              value={newsletterTitle}
              onChange={(e) => setNewsletterTitle(e.target.value)}
              placeholder="Enter Newsletter Title"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
            />
          </div>

          <div className="flex-1">
            <label className="block font-normal mb-3 text-[#1B212D]">
              Release Date
            </label>
            <DatePicker
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="DD-MM-YYYY"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col w-full mb-6">
          <label className="block font-normal mb-2 text-[#1B212D]">
            Content
          </label>
          <div className="h-[300px] border rounded-md border-gray-300">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
              className="w-full h-full px-4 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#003765] text-white py-3 px-6 rounded-lg hover:opacity-90"
        >
          UPDATE
        </button>
      </div>

      {/* Right Layout */}
      <div className="w-full lg:w-[30%] py-6 bg-white">
        <div>
          <h3 className="text-[#1B212D] font-normal mb-3">Image</h3>
          <div className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4">
            {featuredImage && (
              <img
                src={
                  typeof featuredImage === "string"
                    ? featuredImage
                    : URL.createObjectURL(featuredImage)
                }
                alt="Featured"
                className="h-full w-full object-cover rounded-md"
              />
            )}
            <input
              type="file"
              className="mt-2"
              onChange={(e) => handleFileChange(e, "image")}
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <h3 className="text-[#1B212D] font-normal mb-3">PDF</h3>
          <div className="border-dashed rounded-md flex flex-col items-center justify-center h-48 mb-4">
            {file && (
              <a
                href={
                  typeof file === "string"
                    ? file
                    : URL.createObjectURL(file)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View PDF
              </a>
            )}
            <input
              type="file"
              className="mt-2"
              onChange={(e) => handleFileChange(e, "file")}
              accept="application/pdf"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditNewsLetters;
