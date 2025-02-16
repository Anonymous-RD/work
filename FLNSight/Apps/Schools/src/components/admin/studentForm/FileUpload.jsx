import React from 'react';

export function FileUpload() {
  return (
    
    <div className="flex overflow-hidden flex-col w-[196px] max-w-full">

<div className="flex gap-2.5 items-center  ">
      <div className="self-stretch my-auto text-xl font-medium text-black ">
        Bulk Add
      </div>
      <div 
        className="flex flex-col self-stretch my-auto rounded-[100px] w-[68px]"
        role="button"
        tabIndex={0}
        aria-label="Toggle bulk add"
      >
        <div className="flex flex-col justify-center items-start p-1.5 bg-zinc-100 rounded-[100px]">
          <div className="flex shrink-0 w-6 h-6 border border-solid bg-zinc-300 border-neutral-300 rounded-[100px]" />
        </div>
      </div>
    </div>
      <label htmlFor="profile-photo" className="gap-2.5 py-2.5 pr-2.5 max-w-full text-gray-800 w-[196px]">
        Profile Photo
      </label>
      <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100 max-w-[196px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5e5f42a1c31b86264edf580a7885ccfdfc1a5340dbeb5172df93580f12f1445?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
          alt=""
          className="object-contain self-center aspect-square w-[54px]"
        />
        <div className="self-center mt-3 text-center">
          Drag and drop your file
        </div>
        <div className="mt-3 text-center">Or</div>
        <label
          htmlFor="profile-photo"
          className="gap-2.5 self-stretch py-3.5 pr-4 pl-4 mt-3 w-[120px] bg-lime-300 rounded-lgmin-h-[42px] text-center cursor-pointer rounded-[10px]" 
          tabIndex="0"
          role="button"
        >
          Browse File
        </label>
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



