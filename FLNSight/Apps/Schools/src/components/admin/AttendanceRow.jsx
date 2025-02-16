import React from "react";

export default function AttendanceRow({
  date,
  day,
  status,
  statusColor,
  imageUrl,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between w-full border-b py-5 text-sm">
      {/* Date Column */}
      <div className="w-full md:w-1/3 text-gray-800 font-medium">{date}</div>

      {/* Day Column */}
      <div className="w-full md:w-2/3 text-gray-500 font-medium">{day}</div>

      {/* Attendance Status */}
      <div className={`w-full md:w-2/3 ml-12 font-semibold ${statusColor}`}>
        {status}
      </div>

      {/* Action Column */}
      <div className="w-full md:w-1/5 flex justify-center md:justify-start">
        {/* <img
          src={imageUrl}
          alt="Status Icon"
          className="w-8 h-8 rounded-full object-cover"
          loading="lazy"
        /> */}
        <img
          loading="lazy"
          src={imageUrl}
          className="object-contain self-stretch ml-6 my-auto aspect-[0.25] w-[5px]"
          alt=""
        />
      </div>
    </div>
  );
}
