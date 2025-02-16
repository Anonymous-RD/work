// import React from 'react';
// import { InputField } from './InputField';
// import { FileUpload } from './FileUpload';

// const formFields = [
//   { label: "Student Name", placeholder: "Enter Student Name", type: "text" },
//   { label: "Class", placeholder: "Select Class", type: "select" },
//   { label: "Date Of Birth", value: "dd-mm-yyyy", type: "date" },
//   { label: "Father Name", placeholder: "Enter Name", type: "text" },
//   { label: "Roll No.", placeholder: "Enter Roll No", type: "text" },
// ];

// function StudentForm() {
//   return (
//     <>
//     <form className="flex flex-row gap-8 font-medium items-start max-w-full" onSubmit={(e) => e.preventDefault()}>
//       {/* Profile Photo */}
//       <FileUpload />

//       {/* Input Fields */}
//       <div className="grid grid-cols-2 gap-8 w-full">
//         {formFields.map((field, index) => (
//           <InputField key={index} {...field} />
//         ))}
//       </div>
//     </form>
//      <div className="">
//      <button
//        type="submit"
//        className="p-3.5 mt-10 text-base font-semibold leading-loose text-black bg-lime-300 rounded-xl w-[137px] "
//      >
//        Add
//      </button>
//    </div>
//    </>
//   );
// }

// export default StudentForm;








import React from 'react';
import { InputField } from './InputField';
import { FileUpload } from './FileUpload';

const formFields = [
  { label: "Student Name", placeholder: "Enter Student Name", type: "text" },
  { label: "Class", placeholder: "Select Class", type: "select" },
  { label: "Date Of Birth", value: "dd-mm-yyyy", type: "date" },
  { label: "Father Name", placeholder: "Enter Name", type: "text" },
  { label: "Roll No.", placeholder: "Enter Roll No", type: "text" },
  { label: "Year", placeholder: "Enter Year", type: "text" }, // Added field
];

function StudentForm() {
  return (
    <>
      <form className="flex flex-row gap-8 font-medium items-start max-w-full" onSubmit={(e) => e.preventDefault()}>
        {/* Profile Photo */}
        <FileUpload />

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-8 w-full">
          {formFields.map((field, index) => (
            <InputField key={index} {...field} />
          ))}
        </div>
      </form>
      <div className="">
        <button
          type="submit"
          className="p-3.5 mt-10 text-base font-semibold leading-loose text-black bg-lime-300 rounded-xl w-[137px]"
        >
          Add
        </button>
      </div>
    </>
  );
}

export default StudentForm;