import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ViewProfile2 from "@/components/admin/viewProfile/ViewPorfile2";
import { usePageMetadata } from "@/context/PageMetadataContext";


const ViewStudentPage = () => {
  const { state } = useLocation();
  
  const { setMetadata } = usePageMetadata();         useEffect(() => {
    setMetadata({
      title: "Glen Stark",
      backPath: "/students",
    });
  }, [setMetadata]);


  return (
   
      <div className="mt-6">
        <ViewProfile2/>
      </div>
  
  );
};

export default ViewStudentPage;

