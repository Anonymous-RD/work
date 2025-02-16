// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// const sidebarItems = [
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c517e71eb0611a78542a05ead5f9f0db1efbd26e7d5a4e3fab869ba1b63e3fe?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Home",
//     path: "/admin/home",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2e6cb742cae03a30a6caf46b4ad16698f27de21e41c501e42f42891889748215?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Projects",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bb8c041ad188a33cae31fb9b0ba62df9895c11aedd1df9504584cfd16c55127?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Blogs",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8eede9806a3627d97968125a4a7cc938411589ba1e8589d05b6bf5ad12b118d7?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "E-Learning",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c641746dcd0f0fc8c79c3d0b54db67d51223ae0bb4cb7acd4ab04422a1cfec65?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Study Data",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2cb69b9ec20ff895ee604ce5c384ba49a97ead9b1bba747d2d6c9444af65b6a?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Study Reports",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c517e71eb0611a78542a05ead5f9f0db1efbd26e7d5a4e3fab869ba1b63e3fe?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Forms",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/be6159b5c901765f40136e032db4b8aad6630d99b451354d2f1dfb798ceaf529?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Users",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/48795b3f56b15732001c20be347741c5e00f72bba402202f4fbd9170aebc45cf?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Roles",
//   },
// ];

// const bottomItems = [
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a6ae2bb89fa1a4269524d1d6c0eb55da9d70ac20e89ef34b75ea5a865cd7337?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Help",
//   },
//   {
//     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8be84e6ff873a40d9d02db6fff8741a13823ae1a8863499bfca790e662dedaa4?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
//     label: "Logout",
//   },
// ];

// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("Home");

//   const handleItemClick = (label) => {
//     setActiveItem(label);
//     <NavLink to="/{label}">{`lable`}</NavLink>;
//     console.log("label =", label);
//   };
//   const handleItemClickbottom = (label) => {
//     console.log("label =", label);
//   };

//   const SidebarItem = ({ icon, label, isActive, onClick }) => {
//     return (
//       <button
//         className={`flex gap-3 items-center py-3.5 pr-20 pl-4 w-full whitespace-nowrap rounded-lg ${
//           isActive ? "text-black bg-lime-300" : "text-gray-400"
//         }`}
//         onClick={onClick}
//         aria-current={isActive ? "page" : undefined}
//       >
//         <img
//           loading="lazy"
//           src={icon}
//           alt=""
//           className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
//         />
//         <span className="self-stretch my-auto">{label}</span>
//       </button>
//     );
//   };

//   return (
//     <nav className="flex flex-col justify-center px-6 pt-9 pb-28 bg-neutral-50 max-w-[280px]">
//       <h1 className="gap-3 self-stretch w-full text-2xl text-gray-800">
//         IPEL Projects
//       </h1>
//       <div className="flex flex-col mt-10 max-w-full text-sm font-medium text-gray-400 h-[520px] w-[200px]">
//         <div className="flex flex-col w-full max-w-[200px]">
//           {sidebarItems.map((item, index) => (
//             <SidebarItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               isActive={item.label === activeItem}
//               onClick={() => handleItemClick(item.label)}
//             />
//           ))}
//         </div>
//         <div className="flex flex-col mt-20 w-full whitespace-nowrap max-w-[200px]">
//           {bottomItems.map((item, index) => (
//             <SidebarItem
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               onClick={() => handleItemClickbottom(item.label)}
//             />
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import flnlogo from "../../assets/login/flnlogo.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import loginright from "../../assets/login/login-right.png";

const sidebarItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c517e71eb0611a78542a05ead5f9f0db1efbd26e7d5a4e3fab869ba1b63e3fe?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2e6cb742cae03a30a6caf46b4ad16698f27de21e41c501e42f42891889748215?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Reports",
    path: "/admin/projects",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bb8c041ad188a33cae31fb9b0ba62df9895c11aedd1df9504584cfd16c55127?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "FLN",
    path: "/admin/assessments",
     dropdown: [
      { label: "Monitoring", path: "/admin/monitoring" },
      { label: "Learner Outcomes", path: "/admin/learner-outcomes" },
      { label: "Assessment Questions", path: "/admin/assessment-questions" },
    ],
    
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8eede9806a3627d97968125a4a7cc938411589ba1e8589d05b6bf5ad12b118d7?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Administrative",
    path: "/e-learning",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c641746dcd0f0fc8c79c3d0b54db67d51223ae0bb4cb7acd4ab04422a1cfec65?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Study Data",
    path: "/study-data",
  },
  //   {
  //     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2cb69b9ec20ff895ee604ce5c384ba49a97ead9b1bba747d2d6c9444af65b6a?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
  //     label: "Study Reports",
  //     path: "/study-reports",
  //   },
  //   {
  //     icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c517e71eb0611a78542a05ead5f9f0db1efbd26e7d5a4e3fab869ba1b63e3fe?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
  //     label: "Forms",
  //     path: "/forms",
  //   },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/be6159b5c901765f40136e032db4b8aad6630d99b451354d2f1dfb798ceaf529?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/48795b3f56b15732001c20be347741c5e00f72bba402202f4fbd9170aebc45cf?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Settings",
    path: "/roles",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/48795b3f56b15732001c20be347741c5e00f72bba402202f4fbd9170aebc45cf?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Notifications",
    path: "/notifications",
  },
];

const bottomItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a6ae2bb89fa1a4269524d1d6c0eb55da9d70ac20e89ef34b75ea5a865cd7337?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Help",
    path: "/help",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8be84e6ff873a40d9d02db6fff8741a13823ae1a8863499bfca790e662dedaa4?placeholderIfAbsent=true&apiKey=23ab6000e0a042c69f395cff4f4fdfc1",
    label: "Logout",
    path: "/logout",
  },
];

const SidebarItem = ({ icon, label, path, dropdown }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(dropdown ? true : false); // Open dropdown if it has sub-items
  const [activeSubItem, setActiveSubItem] = useState(
    dropdown ? dropdown[0].path : null // Default to first dropdown item (Monitoring)
  );

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="w-full">
      <NavLink
        to={path}
        onClick={dropdown ? toggleDropdown : null}
        className={({ isActive }) =>
          `flex gap-3 items-center py-3.5 pr-4 pl-4 w-full whitespace-nowrap rounded-lg justify-between ${
            isActive ? "text-black bg-lime-300" : "text-gray-400"
          }`
        }
      >
        <div className="flex gap-3 items-center">
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <span className="self-stretch my-auto">{label}</span>
        </div>
        {dropdown && (
          <span className="self-stretch my-auto">
            {isDropdownOpen ? (
              <FaChevronUp className="text-sm text-gray-400" />
            ) : (
              <FaChevronDown className="text-sm text-gray-400" />
            )}
          </span>
        )}
      </NavLink>
      {dropdown && isDropdownOpen && (
        <div className="ml-10 mt-2 space-y-2">
          {dropdown.map((subItem, index) => (
            <NavLink
              key={index}
              to={subItem.path}
              className={`block py-2 px-4 rounded hover:bg-lime-200 ${
                activeSubItem === subItem.path ? "bg-lime-300 text-black" : "text-gray-500"
              }`}
              onClick={() => setActiveSubItem(subItem.path)}
            >
              {subItem.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <nav className="flex flex-col justify-between px-6 pt-28 pb-28 bg-neutral-50 max-w-[280px] h-full">
      {/* Top Section */}
      <div>
        <div className="flex gap-3">
          <img src={flnlogo} alt="" className="h-8 w-8" />
          <h1 className="gap-3 self-stretch w-full text-2xl text-gray-800 font-bold">
            FLNSight
          </h1>
        </div>

        <div className="flex flex-col mt-10 max-w-full text-sm font-medium text-gray-400 h-auto w-[200px]">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              dropdown={item.dropdown}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-20">
      <div className="flex flex-col mt-auto text-sm font-medium text-gray-400">
        {bottomItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
      </div>
    </nav>
  );
};



export default Sidebar;
