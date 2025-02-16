import * as React from "react";

export function ProfilePhoto() {
  return (
    <div className="flex overflow-hidden flex-col w-[196px]">
      <div className="gap-2.5 py-2.5 pr-2.5 max-w-full text-gray-800 w-[196px]">
        Profile Photo
      </div>
      <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100 max-w-[195px]">
        <div className="self-center text-center">Drag and drop your file</div>
        <div className="mt-3 text-center">Or</div>
        <button className="gap-2.5 self-stretch py-3.5 pr-7 pl-7 mt-3 w-full whitespace-nowrap bg-lime-300 rounded-lg min-h-[42px] max-md:px-5">
          Change
        </button>
      </div>
    </div>
  );
}
