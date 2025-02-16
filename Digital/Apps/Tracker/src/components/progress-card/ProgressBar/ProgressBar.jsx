import * as React from "react";

function ProgressBar({ percentage }) {
  return (
    <div className="flex flex-col items-start w-44 max-w-full bg-indigo-50 rounded-md">
      <div 
        className="flex shrink-0 bg-blue-500 rounded-md h-[7px]" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;