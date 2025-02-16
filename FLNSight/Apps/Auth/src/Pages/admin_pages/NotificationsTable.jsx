import * as React from "react";
import { useNavigate } from "react-router-dom";

// Notification Data
const notificationData = [
  {
    id: 1,
    title: "FLN Baseline Assessment",
    date: "14 Apr 2022",
    time: "8:00 PM",
    scope: "Teacher",
    roles: "District Admin",
    actionIcon:
      "https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/0a93fb1b060e31cb59a9bc2df0446490b09b03a0f132e77ff4390f1daeec6f87?apiKey=40e410915e3b45fca05820790b4d2e7d&",
  },
  {
    id: 2,
    title: "FLN Baseline Assessment",
    date: "14 Apr 2022",
    time: "8:00 PM",
    scope: "Student",
    roles: "School Admin",
    actionIcon:
      "https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/f831f4c9af54ab14e23549e9a5e8b20404b27cb6eced2d2dd74a037ac1dfaa0c?apiKey=40e410915e3b45fca05820790b4d2e7d&",
  },
];

// TableRow Component
const TableRow = ({
  id,
  title,
  date,
  time,
  scope,
  roles,
  actionIcon,
  onActionClick,
}) => (
  <div className="flex flex-col w-full max-md:max-w-full">
    <div className="flex flex-wrap gap-7 items-center w-full max-md:max-w-full">
      <div className="self-stretch my-auto text-sm font-semibold text-gray-400 w-[72px]">
        {id}
      </div>
      <div className="flex gap-4 items-center self-stretch my-auto text-sm font-medium text-gray-800 min-w-[240px] w-[301px]">
        <div className="self-stretch my-auto rounded-none w-[183px]">
          {title}
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch pr-8 my-auto rounded-none w-[149px]">
        <div className="text-sm font-medium text-gray-800">{date}</div>
        <div className="mt-1.5 text-sm text-gray-500">at {time}</div>
      </div>
      <div className="self-stretch my-auto text-sm font-semibold text-gray-400 w-[85px]">
        {scope}
      </div>
      <div className="self-stretch my-auto text-sm font-semibold text-gray-400 w-[215px]">
        {roles}
      </div>
      <button
        onClick={(e) => onActionClick(e, id)}
        className="flex gap-2.5 justify-center items-center self-stretch px-5 pt-3 pb-3 my-auto rounded"
        aria-label="Actions"
      >
        <img
          loading="lazy"
          src={actionIcon}
          alt="Action Icon"
          className="object-contain self-stretch my-auto aspect-[0.25] w-[5px]"
        />
      </button>
    </div>
  </div>
);

// Main NotificationsTable Component
function NotificationsTable() {
  const [dropdownVisible, setDropdownVisible] = React.useState(null); // Initially no dropdown is visible
  const [selectedNotificationId, setSelectedNotificationId] =
    React.useState(null); // To track selected notification
  const [dropdownPosition, setDropdownPosition] = React.useState({
    top: 0,
    left: 0,
  }); // Position of the dropdown
  const navigate = useNavigate();

  // Handle dropdown visibility and store selected notification ID
  const toggleDropdown = (e, id) => {
    e.stopPropagation(); // Prevent click from closing dropdown immediately
    setSelectedNotificationId(id);

    // Get the position of the button clicked (three dots button)
    const buttonRect = e.target.getBoundingClientRect();
    const dropdownWidth = 150; // Assuming the dropdown has a fixed width of 150px

    // Set dropdown position to be centered with respect to the button
    setDropdownPosition({
      top: buttonRect.bottom + window.scrollY, // Position dropdown below the button
      left: buttonRect.left + buttonRect.width / 2 - dropdownWidth / 2, // Center the dropdown horizontally
    });

    // Toggle visibility based on current dropdown state
    setDropdownVisible(dropdownVisible === id ? null : id); // Hide if clicked again, show if clicked
  };

  // Close the dropdown when clicked outside
  const closeDropdown = () => setDropdownVisible(null);

  // Listen for clicks outside the dropdown to close it
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown") && !e.target.closest("button")) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAction = (action) => {
    console.log(`${action} notification with ID: ${selectedNotificationId}`);
    setDropdownVisible(null); // Close dropdown after action
  };

  return (
    <div className="flex flex-col pb-7 rounded-none">
      <div className="flex gap-5 justify-between self-end max-w-full text-sm text-gray-800 w-[332px]">
        <button
          className="flex gap-2.5 items-center px-5 py-3.5 font-semibold bg-lime-300 rounded-xl"
          onClick={() => navigate("/Create-Notification")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/ffc955f346f963eedcb9ac62114fb99f206c951c9443da9842c8e1d97a58f789?apiKey=40e410915e3b45fca05820790b4d2e7d&"
            alt="Create Notification"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="self-stretch my-auto">Create Notification</span>
        </button>
        <button className="flex gap-2.5 justify-center items-center self-start px-5 py-3.5 font-medium whitespace-nowrap rounded-xl border border-solid border-neutral-100">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/40e410915e3b45fca05820790b4d2e7d/ca876a912f937328779c1a3f4445077a3dc8fa15658d1d6c1300efd92bffee34?apiKey=40e410915e3b45fca05820790b4d2e7d&"
            alt="Filters"
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <span className="self-stretch my-auto">Filters</span>
        </button>
      </div>
      <div className="mt-5 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
      <div className="flex flex-col mt-5 w-full max-md:max-w-full">
        <div className="flex overflow-hidden flex-wrap gap-7 items-center w-full text-xs font-semibold text-gray-400 uppercase min-h-[15px] max-md:max-w-full">
          <div className="self-stretch my-auto w-[72px]">sl no.</div>
          <div className="self-stretch my-auto w-[301px]">Title</div>
          <div className="self-stretch my-auto w-[149px]">sent on</div>
          <div className="self-stretch my-auto w-[85px]">scope</div>
          <div className="self-stretch my-auto w-[215px]">Roles</div>
          <div className="self-stretch my-auto w-[108px]">ACTION</div>
        </div>
        <div className="flex flex-col mt-5 w-full max-md:max-w-full ">
          {notificationData.map((notification) => (
            <TableRow
              key={notification.id}
              {...notification}
              onActionClick={toggleDropdown} // Pass toggleDropdown to handle click
            />
          ))}
        </div>
      </div>

      {/* Dropdown menu that appears when the three dots button is clicked */}
      {dropdownVisible && (
        <div
          className="dropdown absolute bg-white shadow-xl rounded-xl"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <button
            onClick={() => handleAction("View")}
            className="w-full p-2 text-left text-sm hover:bg-gray-100 hover:rounded-t-xl border-b border-gray-200"
          >
            View
          </button>
          <button
            onClick={() => handleAction("Edit")}
            className="w-full p-2 text-left text-sm hover:bg-gray-100 border-b border-gray-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleAction("Delete")}
            className="w-full p-2 text-left text-sm hover:bg-gray-100  hover:rounded-b-xl"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationsTable;
