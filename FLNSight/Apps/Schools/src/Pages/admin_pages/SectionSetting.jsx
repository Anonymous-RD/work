import SectionList from "@/components/admin/SectionList";
import { usePageMetadata } from "@/context/PageMetadataContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SectionSetting() {
  const { setMetadata } = usePageMetadata();

  useEffect(() => {
    setMetadata({
      title: "Sections",
      backPath: null,
    });
  }, [setMetadata]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/AddSection");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 -mt-4 -ml-5">
      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <form className="flex gap-3 items-center bg-gray-100 px-4 py-3 rounded-xl w-full sm:w-64">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/436e8d12b2c4bf1a809d9e27f15e88b7e1cdf572434f2fec5c9d1e691515126a"
            alt="Search"
            className="w-5 h-5"
          />
          <input
            type="search"
            placeholder="Search Sections"
            className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm"
          />
        </form>
        <button
          onClick={handleClick}
          className="mt-4 sm:mt-0 flex items-center bg-lime-300 hover:bg-lime-400 text-gray-800 font-semibold px-5 py-3 rounded-xl"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffc955f346f963eedcb9ac62114fb99f206c951c9443da9842c8e1d97a58f789"
            alt="Add"
            className="w-5 h-5 mr-2"
          />
          Add Section
        </button>
      </div>

      {/* Section List */}
      <div className="w-full border-t border-gray-100">
        <div className="flex mt-2.5 py-3.5 text-gray-400 text-sm font-medium">
          <div className="w-1/4">SECTION NAME</div>
          <div className="w-1/4">CLASS NAME</div>
          <div className="w-1/4">SECTION CODE</div>
          <div className="w-1/4 pl-36 md:pl-20 lg:pl-24 xl:pl-36">ACTION</div>
        </div>
        <SectionList />
      </div>
    </div>
  );
}

export default SectionSetting;
