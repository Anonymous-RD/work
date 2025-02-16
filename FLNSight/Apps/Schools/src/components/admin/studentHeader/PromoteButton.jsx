import * as React from "react";

function PromoteButton() {
  return (
    <button 
      className="gap-2.5 self-stretch px-5 py-5 text-sm font-semibold text-gray-800 bg-lime-300 rounded-xl"
      type="button"
      aria-label="Promote Students"
      tabIndex={0}
    >
      Promote Student(s)
    </button>
  );
}

export default PromoteButton;