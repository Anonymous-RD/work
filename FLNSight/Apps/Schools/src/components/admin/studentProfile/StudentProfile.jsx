import * as React from "react";
import { FormField } from "./FormField";
import { PhotoUpload } from "./PhotoUpload";
import UpdateButton from "./UpdateButton";



const studentData = [
  { label: "Name", value: "Glen Stark", type: "text" },
  { label: "Class", value: "Class 3(A)", type: "select", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8be0c5111a6fc684fb050172959fead50acdbaaf44581984a85d518744d38df3?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d" },
  { label: "Date of Birth", value: "27/09/1998", type: "date", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8c122968b35f6f423bfed0f7c05d68c3f6041cde4dd900f1228dff1b52e4d57d?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d" },
  { label: "Father Name", value: "James Stark", type: "text" },
  { label: "Roll No", value: "Enter Roll No", type: "text", placeholder: true },
  { label: "Year", value: "Enter Year", type: "text", placeholder: true }
];

function StudentProfile() {
  return (
      
    <form className="flex overflow-hidden flex-wrap gap-8 items-start text-sm font-medium">
      <PhotoUpload />
      
      <div className="  gap-8 gap-x-40 items-end grid grid-cols-2 ">
        {studentData.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            value={field.value}
            type={field.type}
            icon={field.icon}
            placeholder={field.placeholder}
          />
          
        ))}
      </div>
       <UpdateButton/>
      </form>
       
  );
}

export default StudentProfile;









