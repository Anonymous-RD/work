import React from "react";
import { useLocation } from "react-router-dom";
import StudentProfile from "@/components/admin/studentProfile/StudentProfile";
import { usePageMetadata } from "@/context/PageMetadataContext";
import { useEffect } from "react";


const EditStudentPage = () => {
  const { state } = useLocation();
 
  const { setMetadata } = usePageMetadata();         useEffect(() => {
    setMetadata({
      title: "Edit Student",
      backPath: "/students",
    });
  }, [setMetadata]);


  return (
  
      <div className="mt-6">
        <StudentProfile />
      </div>
   
  );
};

export default EditStudentPage;


