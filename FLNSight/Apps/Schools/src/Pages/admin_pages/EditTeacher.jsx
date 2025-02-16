import * as React from "react";
import { FormInput } from "@/components/admin/FormInput";
import { SelectInput } from "@/components/admin/SelectInput";
import { usePageMetadata } from "@/context/PageMetadataContext";
import { useEffect } from "react";

export function EditTeacher() {
  const { setMetadata } = usePageMetadata();

  useEffect(() => {
    setMetadata({
      title: "Edit Teacher",
      backPath: "/teachers",
    });
  }, [setMetadata]);

  return (
    <>
      <div className="flex gap-8 border-t-2 mt-5 ml-6 border-solid border-neutral-100 items-start text-sm font-medium">
        <div className="flex flex-col w-[196px]">
          <label
            htmlFor="profilePhoto"
            className="gap-2.5 py-2.5 pr-2.5 mt-3 max-w-full text-gray-800 w-[196px]"
          >
            Profile Photo
          </label>
          <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100 max-w-[195px]">
            <div className="self-center text-center">
              Drag and drop your file
            </div>
            <div className="mt-3 text-center">Or</div>
            <button
              className="gap-2.5 self-stretch py-3.5 ml-5 mt-3 w-28 whitespace-nowrap bg-lime-300 rounded-xl min-h-[42px] max-md:px-5"
              onClick={() => document.getElementById("profilePhoto").click()}
            >
              Change
            </button>
            <input
              type="file"
              id="profilePhoto"
              className="sr-only"
              accept="image/*"
              aria-label="Upload profile photo"
            />
          </div>
        </div>

        <div className="mt-5 ml-4 bg-white">
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-2">
              <label className="gap-2.5 pr-2.5 w-full text-black font-medium whitespace-nowrap tracking-widess">
                Teacher Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Teacher Name"
                // value={formData.name}
                // onChange={handleChange}
                className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                aria-label="Enter Sectio
                 n Name"
              />
            </div>

            <div className="col-span-2">
              <label className="gap-2.5 pr-2.5 w-full  text-black font-medium whitespace-nowrap tracking-widess">
                Gender
              </label>
              <select
                type="text"
                name="name"
                placeholder="Select Class"
                // value={formData.name}
                // onChange={handleChange}
                className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                aria-label="Select Class"
              >
                <option value="Male">Male</option>
              </select>
            </div>

            <div className="col-span-2 row-start-2">
              <label className="gap-2.5  pr-2.5 w-full text-black font-medium whitespace-nowrap ">
                Phone No.
              </label>
              <input
                type="tel"
                name="name"
                placeholder="Enter Phone No."
                // value={formData.name}
                // onChange={handleChange}
                className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                aria-label="Enter Section Code"
              />
            </div>

            <div className="col-span-2">
              <label className="gap-2.5 pr-2.5 w-full  text-black font-medium whitespace-nowrap tracking-widess">
                Email
              </label>
              <input
                type="email"
                name="name"
                placeholder="Enter Email"
                // value={formData.name}
                // onChange={handleChange}
                className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                aria-label="Select Class"
              />
            </div>

            <div className="col-span-2 row-start-3">
              <label className="gap-2.5  pr-2.5 w-full text-black font-medium whitespace-nowrap ">
                Lorem Ipsum
              </label>
              <input
                type="text"
                name="name"
                placeholder="Placeholder"
                // value={formData.name}
                // onChange={handleChange}
                className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                aria-label="Enter Section Code"
              />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-16 ml-6 w-full border-t border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
      <button
        type="submit"
        className="gap-2.5 self-stretch mt-7 ml-6 p-3.5 w-60 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-lime-300 rounded-xl"
      >
        Update
      </button>
    </>
  );
}
