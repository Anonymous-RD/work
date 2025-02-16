import * as React from "react";

export function PhotoUpload() {
  return (
    <div className="flex overflow-hidden flex-col min-w-[196px] max-w-[240px]">
      <label
        htmlFor="profile-photo"
        className="gap-2.5 py-2.5 pr-2.5 max-w-full text-gray-800 w-[196px]"
      >
        Profile Photo
      </label>
      <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100">
        <div className="self-center text-center">Drag and drop your file</div>
        <div className="mt-3 text-center">Or</div>
        <button
          type="button"
          className="gap-2.5 self-stretch py-3.5 pr-4 pl-4 mt-3 w-[120px] bg-lime-300 rounded-lgmin-h-[42px] text-center cursor-pointer rounded-[10px] "
          onClick={() => document.getElementById("profile-photo").click()}
        >
          Change
        </button>
        <input
          type="file"
          id="profile-photo"
          className="sr-only"
          accept="image/*"
          aria-label="Upload profile photo"
        />
      </div>
    </div>
  );
}


