import React, { useState } from 'react';
import InputField from '../../components/admin/InputField';
import ToggleSwitch from '../../components/admin/ToggleSwitch';

const inputFields = [
  { label: 'Name', placeholder: 'Enter Invitee Name' },
  { label: 'Email', placeholder: 'Enter Invitee Email' },
  { label: 'Role', placeholder: 'Select Invitee Role' }
];

function AdministrativeInvite() {
  const [isInviteEnabled, setIsInviteEnabled] = useState(false);

  // Toggle handler for the switch
  const handleToggle = () => {
    setIsInviteEnabled((prevState) => !prevState);
  };

  return (
    <section className="flex flex-col">
      <header className="flex overflow-hidden flex-col w-full min-h-[252px] max-md:max-w-full">
        <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
          <div className="flex gap-2.5 items-center">
            <h2 className="self-stretch my-auto text-sm font-medium text-gray-800">
              Bulk Invite
            </h2>
            {/* Passing handleToggle function to the ToggleSwitch */}
            <ToggleSwitch isOn={isInviteEnabled} handleToggle={handleToggle} />
          </div>
          <form
            className="flex flex-wrap gap-8 items-start mt-2.5 w-full text-sm font-medium max-md:max-w-full"
            disabled={!isInviteEnabled} // Disable form when toggle is off
          >
            {inputFields.map((field, index) => (
              <InputField
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                disabled={!isInviteEnabled} // Disable individual fields when toggle is off
              />
            ))}
          </form>
        </div>
        <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
        <button
          className="gap-2.5 self-stretch p-3.5 mt-8 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-lime-300 rounded-xl w-[146px]"
          disabled={!isInviteEnabled} // Disable the invite button when toggle is off
        >
          Invite
        </button>
      </header>
    </section>
  );
}

export default AdministrativeInvite;
