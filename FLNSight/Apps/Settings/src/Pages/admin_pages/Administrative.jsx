import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMetadata } from "../../context/PageMetadataContext";

const Administrative = () => {
  const [showDistricts, setShowDistricts] = useState(false);
  const navigate = useNavigate();
  const { setMetadata } = usePageMetadata();

  useEffect(() => {
    setMetadata({ title: "Administrative", backPath: null }); 
  }, [setMetadata]);

  return (
    <>     
      <div className="w-full  bg-white">

      <hr className="mb-2 border-gray-200" />
        {/* Title Section */}
        <div className="py-6 px-0 max-w-5xl">
          <div className="flex items-center space-x-2" style={{
            fontFamily: "Kumbh Sans",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "24.8px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            color: "#000000",
          }}> 
            <h3>Select Mode</h3>
            <p>
              (For States select Districts & Blocks and for UT select Zones)
            </p> 
          </div>
        </div>

        {/* Main Section */}
        <div className=" max-w-4xl">    
          {/* Toggle Button */}
          <div className="flex items-center mb-4">
            <label className="text-lg font-medium mr-4">Districts/Blocks</label>
            <div
              onClick={() => setShowDistricts(!showDistricts)}
              className={`relative w-14 h-7 cursor-pointer rounded-full ${
                showDistricts ? "bg-lime-300" : "bg-[#EFEFEF]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-[#DBDBDB] rounded-full shadow-md transform transition-transform ${
                  showDistricts ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
            <label className="text-lg font-medium ml-4">Zones</label> 
          </div>

          {/* Informational Paragraph */}
          <p
            className="text-sm text-gray-400 italic font-roboto mb-20"
            style={{
              width: "242px",
              height: "14px",
              top: "215px",
              left: "290px",
              gap: "0px",
              opacity: "0px",
              fontFamily: "Arimo Hebrew Subset Italic",
              fontSize: "12px",
              fontStyle: "italic",
              fontWeight: "400",
              lineHeight: "13.8px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#929EAE",
            }}
          >
            *Once data is added, this cannot be changed.
          </p>

          {/* Options */}
          <div className="border border-gray-100 rounded-md mt-1">
            {!showDistricts && (
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
                onClick={() => navigate("/districts")}
              >
                <span className="text-sm font-medium text-gray-800">Districts</span> 
                <span className="text-gray-400 text-6xl">&rsaquo;</span>
              </div>
            )}

            {/* Blocks/Zones */}
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
              onClick={() => navigate("/blocks")}
            >
              <span className="text-sm font-medium text-gray-800">Blocks/Zones</span>
              <span className="text-gray-400 text-6xl">&rsaquo;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Administrative;
