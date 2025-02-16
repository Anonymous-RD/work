import React from "react";

import StudentForm from "@/components/admin/studentForm/StudentForm";

import { usePageMetadata } from "@/context/PageMetadataContext";
import { useEffect } from "react";

export default function AddStudentPage() {

  const { setMetadata } = usePageMetadata();         
  useEffect(() => {
    setMetadata({
      title: "Add Student",
      backPath: "/students",
    });
  }, [setMetadata]);


  return (
    
      <div className="mt-10">
        <StudentForm />
      </div>
 
  );
}