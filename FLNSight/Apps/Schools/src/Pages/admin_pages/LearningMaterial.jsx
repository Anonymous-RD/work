import React, { useEffect } from "react";
import { FileList } from "@/components/admin/FileList";
import { usePageMetadata } from "@/context/PageMetadataContext";
import { useState } from "react";

function LearningMaterial({ filename, size, progress }) {
  const { setMetadata } = usePageMetadata();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    setMetadata({
      title: "Teaching/Learning Materials",
      backPath: null,
    });
  }, [setMetadata]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsProfileOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Perform delete logic here
    console.log(`${name} deleted`);
    setIsModalOpen(false);
  };

  const uploadItems = [
    { filename: "demo_video.mp4", size: "5.7MB", progress: 5 },
    { filename: "demo_video.mp4", size: "5.7MB", progress: 5 },
    { filename: "demo_video.mp4", size: "5.7MB", progress: 5 },
  ];

  return (
    <div className="mt-2 ml-3  bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Search */}
        <form className="flex gap-3 items-center w-full sm:w-1/5 bg-gray-100 px-4 py-3 rounded-xl shadow-sm">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/436e8d12b2c4bf1a809d9e27f15e88b7e1cdf572434f2fec5c9d1e691515126a"
            alt="Search Icon"
            className="w-5 h-5"
          />
          <input
            type="search"
            id="searchInput"
            placeholder="Search Files"
            className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 flex-grow"
          />
        </form>
        {/* Upload Button */}
        <button
          className=" bg-lime-300 hover:bg-lime-400 transition text-gray-800 font-semibold py-3 px-5 mr-5 rounded-xl flex items-center gap-2"
          onClick={openModal}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffc955f346f963eedcb9ac62114fb99f206c951c9443da9842c8e1d97a58f789"
            alt="Upload"
            className="w-5 h-5"
          />
          <span>Upload</span>
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex overflow-hidden flex-col items-start px-8 py-9 bg-white rounded-3xl max-w-[614px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              <div className="text-xl font-extrabold tracking-tight text-zinc-700">
                Upload
              </div>
              <div className="flex flex-col self-stretch mt-5 w-full max-md:max-w-full">
                <form className="flex gap-6 justify-center items-center py-4 pr-6 pl-7 w-full rounded-xl border-[2px] border-dashed border-neutral-400  max-w-[600px] max-md:px-5 max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5e5f42a1c31b86264edf580a7885ccfdfc1a5340dbeb5172df93580f12f1445?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
                  />
                  <div className="flex gap-5 justify-center items-center self-stretch my-auto min-w-[285px]">
                    <div className="flex flex-col justify-center self-stretch my-auto text-sm min-w-[285px] w-[285px]">
                      <label htmlFor="fileInput" className="text-zinc-800">
                        Select a file or drag and drop here
                      </label>
                      <div className="mt-3 tracking-tight text-gray-400">
                        JPG, XLSX or PDF, file size no more than 10MB
                      </div>
                    </div>
                    <label
                      htmlFor="fileInput"
                      className=" px-4 py-3 text-xs bg-lime-300 hover:bg-lime-400 transition text-gray-800 uppercase font-semibold  rounded-xl cursor-pointer"
                      role="button"
                      tabIndex="0"
                    >
                      Select file(S)
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="sr-only"
                      multiple
                      accept=".jpg,.xlsx,.pdf"
                    />
                  </div>
                </form>
                <div className="flex flex-col justify-center py-4 w-full max-w-[539px] max-md:max-w-full">
                  {uploadItems.map((item, index) => (
                    <div className="flex flex-wrap gap-4 my-2 bg-white rounded-md">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a20bdf9dfe8f03f420f4cb54c43cfe61b53c45784c662da48f7256c3818c3a9?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211"
                        alt=""
                        className="object-contain mt-2 shrink-0 self-start w-7 aspect-square"
                      />
                      <div
                        className="flex flex-col grow shrink-0 justify-between basis-0 min-h-[26px] w-fit max-md:max-w-full"
                        key={index}
                      >
                        <div className="flex flex-wrap gap-10 justify-between items-center w-full whitespace-nowrap text-zinc-700 max-md:max-w-full">
                          <div className="gap-2 self-stretch my-auto text-sm tracking-tight">
                            {item.filename}
                          </div>
                          <div className="self-stretch my-auto text-xs">
                            {item.size}
                          </div>
                        </div>
                        <div className="flex flex-col mt-2 w-full max-md:max-w-full">
                          <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                            <div className="bg-lime-300 h-1 rounded-full w-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 justify-center items-center mt-4 ml-5 text-sm tracking-tight text-center whitespace-nowrap max-md:ml-2.5">
                <button
                  className="self-stretch my-auto text-zinc-700"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className=" bg-lime-300 hover:bg-lime-400 transition text-gray-800 shadow-sm font-semibold py-3 px-5 mr-5 rounded-xl flex items-center gap-2"
                  onClick={openModal}
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffc955f346f963eedcb9ac62114fb99f206c951c9443da9842c8e1d97a58f789"
                    alt="Upload"
                    className="w-5 h-5"
                  />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full mt-7 border-t border-gray-100 overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-16 mt-4 text-sm font-semibold text-gray-400 py-3">
          <div className="pl-10">TYPE</div>
          <div>FILE NAME</div>
          <div>CREATED</div>
          <div>AUTHOR</div>
          <div>PERMISSION</div>
          <div>ACTION</div>
        </div>
        <FileList />
      </div>
    </div>
  );
}

export default LearningMaterial;
