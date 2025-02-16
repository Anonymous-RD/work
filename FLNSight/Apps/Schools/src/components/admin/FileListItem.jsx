import React from "react";

export function FileListItem({
  type,
  fileName,
  date,
  author,
  description,
  iconSrc,
}) {
  return (
    <div className="grid grid-cols-6 gap-16 py-5 items-center text-sm text-gray-800 border-b border-gray-100">
      {/* Type */}
      <div className="flex items-center gap-3">
        <img src={iconSrc} alt={`${type} icon`} className="w-8 h-8" />
        <span className="text-sm font-medium text-gray-500">{type}</span>
      </div>
      {/* File Name */}
      <div className="text-sm font-medium text-gray-800">{fileName}</div>
      {/* Date */}
      <div className="text-sm font-medium text-gray-500">{date}</div>
      {/* Author */}
      <div className="text-sm font-medium text-gray-500">{author}</div>
      {/* Description */}
      <div className="text-sm font-medium text-gray-500">{description}</div>
      {/* Actions */}
      <div className="flex gap-2">
        <button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/11ff730405fa38a6340524f8c456e6b0e7953ab2b70e080848f59e84bb399053"
            alt="View"
            className="w-5 h-5"
          />
        </button>
        <button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dab349dc6ee75ea895b7b5628f6751bf721cc50bb678817f31cfa5b4dd17c824"
            alt="Edit"
            className="w-5 h-5"
          />
        </button>
        <button>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a4194a1156489bf64e573a882024bd4743a84947d1c5fc0952b663b17f6bc1a"
            alt="Delete"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
