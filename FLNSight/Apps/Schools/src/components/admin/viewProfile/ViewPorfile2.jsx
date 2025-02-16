import * as React from "react";
import { FormField2 } from "./FormField2";
import { PhotoUpload2 } from "./PhotoUpload2";




const studentData = [
  { label: "Name", value: "lorem ipsum",  type: "text" , placeholder: true },
  { label: "Class", value: "....", type: "text" },
  { label: "Date of Birth", value: "....", type: "text" },
  { label: "Father Name", value: "lorem ipsum", type: "text" ,placeholder: true  },
  { label: "Roll No", value: "lorem ipsum", type: "text", placeholder: true },
  { label: "Year", value: "lorem ipsum", type: "text", placeholder: true }
];


function ViewProfile2() {
  return (
      
    <form className="flex overflow-hidden flex-wrap gap-8 items-start text-sm font-medium">
      <PhotoUpload2 />
      
      <div className="  gap-8 gap-x-40 items-end grid grid-cols-2 ">
        {studentData.map((field, index) => (
          <FormField2
            key={index}
            label={field.label}
            value={field.value}
            type={field.type}
            icon={field.icon}
            placeholder={field.placeholder}
          />
          
        ))}
      </div>
      </form>
       
  );
}

export default  ViewProfile2 ;