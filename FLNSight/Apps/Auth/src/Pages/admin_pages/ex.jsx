import * as React from "react";



const roles = [
  { id: "districtAdmin", label: "District Admin", selected: true },
  { id: "blockAdmin", label: "Block Admin", selected: false },
  { id: "schoolAdmin", label: "School Admin", selected: false },
  { id: "mentors", label: "Mentors", selected: false },
  { id: "teachers", label: "Teachers", selected: false },
];

function NotificationForm() {
  // State to track the selected roles
  const [selectedRoles, setSelectedRoles] = React.useState(
    roles.reduce((acc, role) => {
      acc[role.id] = role.selected; // Initialize with the selected state from roles
      return acc;
    }, {})
  );

  // State to track the selected district, block, and school
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const [selectedBlock, setSelectedBlock] = React.useState("");
  const [selectedSchool, setSelectedSchool] = React.useState("");

  // Handle role selection/deselection
  const handleRoleChange = (roleId) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [roleId]: !prevRoles[roleId], // Toggle the selected state
    }));
  };

  return (
    <form
      className="flex flex-wrap gap-5 items-start"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col min-w-[240px] w-[826px] max-md:max-w-full">
        <div className="flex flex-wrap gap-8 text-sm font-medium">
          <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit">
            <label
              htmlFor="notificationTitle"
              className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
            >
              Title
            </label>
            <input
              id="notificationTitle"
              type="text"
              placeholder="Enter Notification Title"
              className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
              aria-label="Notification Title"
            />
          </div>
          <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit">
            <div className="flex flex-col justify-center w-full max-w-[398px]">
              <label
                htmlFor="notificationMessage"
                className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
              >
                Message
              </label>
              <textarea
                id="notificationMessage"
                placeholder="Enter a Notification Message"
                className="gap-6 px-6 py-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 min-h-[48px] max-md:px-5"
                aria-label="Notification Message"
              />
            </div>
          </div>
        </div>

        <div className="shrink-0 mt-5 h-px border border-solid border-neutral-100 max-md:max-w-full" />

        <div className="flex flex-col justify-center mt-5 w-full text-sm font-medium max-md:max-w-full">
          <div className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap max-md:max-w-full">
            Scope
          </div>
          <div className="flex relative gap-5 items-start w-full text-gray-500 max-md:max-w-full">
            {["district", "block", "school"].map((type) => (
              <select
                key={type}
                className="flex overflow-hidden z-0 flex-1 shrink gap-10 justify-between items-center py-3 pr-5 pl-6 rounded-xl border border-solid basis-0 border-neutral-100 min-h-[48px] min-w-[240px] max-md:pl-5"
                aria-label={`Select ${type}`}
              >
                <option value="">{`Select ${
                  type.charAt(0).toUpperCase() + type.slice(1)
                }`}</option>
                {scopeOptions[`${type}s`].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Roles Section */}
        <div className="flex flex-col justify-center mt-32 w-full max-md:mt-10 max-md:max-w-full">
          <div className="gap-2.5 py-2.5 pr-2.5 max-w-full text-sm font-medium text-gray-800 whitespace-nowrap min-h-[36px] w-[398px]">
            Roles
          </div>
          <div className="flex flex-wrap gap-10 items-start mt-2 w-full max-md:max-w-full">
            {roles.map((role) => (
              <div key={role.id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={role.id}
                  checked={selectedRoles[role.id]} // Control checkbox with state
                  onChange={() => handleRoleChange(role.id)} // Toggle role selection
                  className="w-5 h-5 rounded border border-solid border-zinc-400"
                  aria-label={role.label}
                />
                <label
                  htmlFor={role.id}
                  className="self-stretch my-auto text-xs capitalize text-zinc-800"
                >
                  {role.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="flex overflow-hidden flex-col text-sm font-medium w-[196px]">
        <label
          htmlFor="imageUpload"
          className="gap-2.5 py-2.5 pr-2.5 max-w-full text-gray-800 whitespace-nowrap w-[196px]"
        >
          Image
        </label>
        <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100 max-w-[195px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/f5e5f42a1c31b86264edf580a7885ccfdfc1a5340dbeb5172df93580f12f1445?apiKey=40e410915e3b45fca05820790b4d2e7d&"
            alt="Uploaded Image"
            className="object-contain self-center aspect-square w-[54px]"
          />
          <div className="self-center mt-3 text-center">
            Drag and drop your file
          </div>
          <div className="mt-3 text-center">Or</div>
          <button
            type="button"
            onClick={() => document.getElementById("imageUpload").click()}
            className="gap-2.5 self-stretch py-3.5 pr-4 pl-4 mt-3 w-full bg-lime-300 rounded-xl min-h-[42px]"
          >
            Browse File
          </button>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            aria-label="Upload image"
          />
        </div>
      </div>
    </form>
  );
}

export default NotificationForm;
