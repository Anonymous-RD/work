import React from "react";

function TeacherList() {
  return (
    <div className="flex flex-col justify-between bg-white overflow-x-auto">
      <div className="w-full border-t border-gray-100">
        {/* Table Header */}
        <div className="grid grid-cols-6 mt-6 items-center pb-2 text-gray-400 text-sm font-semibold">
          <div>TEACHER NAME</div>
          <div>EMAIL</div>
          <div>PHONE NO.</div>
          <div>SUBJECT</div>
          <div>DATE OF JOINING</div>
          <div className="text-center mr-16">ACTION</div>
        </div>
      </div>
    </div>
  );
}

export default TeacherList;
