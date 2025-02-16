import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMetadata } from "../../context/PageMetadataContext";

const Academic = () => {
  const navigate = useNavigate();
  const { setMetadata } = usePageMetadata();

  useEffect(() => {
    setMetadata({ title: "Academic", backPath: null }); 
  }, [setMetadata]);

  return (
    <div className="w-full  bg-white">
      {/* Main Content */}
      <div className="py-6 px-0">
        <div className="max-w-4xl">
          {/* Classes */}
          <div
            className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-gray-100"
            style={{
              width: "925px",
              height: "65.7px",
              padding: "16px 18px 17.7px 16.85px",
              gap: "0px",
              borderRadius: "6.42px 0px 0px 0px",
              border: "0.8px solid #E7EEEC",
              background: "#0C513F05",
            }}
            onClick={() => navigate("/classes")}
          >
            <span className="text-sm font-medium text-gray-800">Classes</span>
            <span className="text-gray-400 text-6xl">&rsaquo;</span>
          </div>

          {/* Subjects */}
          <div
            className="flex justify-between items-center px-4 py-4 mt-4 cursor-pointer hover:bg-gray-100"
            style={{
              width: "925px",
              height: "65.7px",
              padding: "16px 18px 17.7px 16.85px",
              gap: "0px",
              borderRadius: "6.42px 0px 0px 0px",
              border: "0.8px solid #E7EEEC",
              background: "#0C513F05",
            }}
            onClick={() => navigate("/subjects")}
          >
            <span className="text-sm font-medium text-gray-800">Subjects</span>
            <span className="text-gray-400 text-6xl">&rsaquo;</span>
          </div>

          {/* Chapters */}
          <div
            className="flex justify-between items-center px-4 py-4 mt-4 cursor-pointer hover:bg-gray-100"
            style={{
              width: "925px",
              height: "65.7px",
              padding: "16px 18px 17.7px 16.85px",
              gap: "0px",
              borderRadius: "6.42px 0px 0px 0px",
              border: "0.8px solid #E7EEEC",
              background: "#0C513F05",
            }}
            onClick={() => navigate("/chapters")}
          >
            <span className="text-sm font-medium text-gray-800">Chapters</span>
            <span className="text-gray-400 text-6xl">&rsaquo;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academic;
