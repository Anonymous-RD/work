import React, { useState } from "react";

function InviteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formArray = Object.keys(formData).map((key) => ({
      [key]: formData[key],
    }));
    console.log(formArray);
  };

  const districtFields = [
    { label: "District Name", placeholder: "Enter District Name" },
    { label: "District Code", placeholder: "Enter District Code" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <h1 className="text-sm font-medium text-gray-800">Bulk Invite</h1>
        <div
          className={`flex items-center justify-center w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
            toggle ? "bg-green-400" : "bg-gray-300"
          }`}
          onClick={() => setToggle(!toggle)}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              toggle ? "translate-x-3" : "-translate-x-3"
            }`}
          />
        </div>
      </div>

      {!toggle ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <header className="w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full mt-[25px]" />
          <section className="flex overflow-hidden flex-col min-h-[252px] max-md:max-w-full mt-5">
            <header className="flex flex-col justify-center items-start w-full max-md:max-w-full">
              <div className="flex gap-2.5 items-center">
                <h1 className="self-stretch my-auto text-xl font-medium text-black">
                  Single
                </h1>
              </div>
            </header>
            <div className="flex flex-wrap gap-5 items-start mt-2.5 w-full text-sm font-medium max-md:max-w-full">
              <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Invitee Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Enter Invitee Name"
                />
              </div>
              <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Invitee Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Enter Invitee Email"
                />
              </div>
              <br />

              <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
                <label className="gap-2.5  py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="Select Invitee Role"
                  value={formData.role}
                  onChange={handleChange}
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Select Invitee Role"
                />
              </div>
            </div>
          </section>
          <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
          <button
            type="submit"
            className="gap-2.5 self-stretch p-1 mt-8 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-lime-400 rounded-xl w-[126px] hover:bg-lime-500"
          >
            Invite
          </button>
        </form>
      ) : (
        <main className="flex flex-col rounded-none mt-10">
          <header className="w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full" />
          <section className="flex overflow-hidden flex-col mt-5 w-full min-h-[159px] max-md:max-w-full">
            <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
              <div className="flex gap-2.5 items-center">
                <h1 className="self-stretch my-auto text-xl font-medium text-black">
                  Bulk Add
                </h1>
              </div>
            </div>
            <form className="flex overflow-hidden flex-wrap gap-8 items-start mt-2.5 w-full text-sm font-medium max-md:max-w-full">
              {districtFields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center min-w-[240px] w-[398px]"
                >
                  <label
                    htmlFor={`district-${index}`}
                    className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800"
                  >
                    {field.label}
                  </label>
                  <input
                    id={`district-${index}`}
                    type="text"
                    placeholder={field.placeholder}
                    className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                    aria-label={field.label}
                  />
                </div>
              ))}
            </form>
          </section>
          <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
          <button
            type="submit"
            className="gap-2.5 self-start p-3.5 mt-7 text-base font-semibold leading-loose text-black whitespace-nowrap bg-teal-600 rounded-xl"
            aria-label="Add districts"
            tabIndex={0}
          >
            Add
          </button>
        </main>
      )}
    </div>
  );
}

export default InviteForm;
