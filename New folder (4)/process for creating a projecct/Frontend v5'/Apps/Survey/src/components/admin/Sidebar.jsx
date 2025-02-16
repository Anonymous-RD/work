import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaCaretUp } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { BiSolidReport } from "react-icons/bi";
import { MdTask } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { IoIosSchool } from "react-icons/io";
import { HiUsers } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import flnlogo from "../../assets/login/flnlogo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/fetchUserDetailsSlice";

const sidebarItems = [
  {
    icon: <GoHomeFill size={20} />,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <BiSolidReport size={20} />,
    label: "Reports",
    path: "/admin/projects",
  },
  {
    icon: <MdTask size={20} />,
    label: "FLN",
    path: "/admin/assessment",
  },
  {
    icon: <RiAdminFill size={20} />,
    label: "Administrative",
    children: [
      {
        label: "Districts",
        path: "/admin/districts",
      },
      {
        label: "Block/Zones",
        path: "/admin/blocks",
      },
      {
        label: "Invite",
        path: "/admin/invite",
      },
    ],
  },
  {
    icon: <IoIosSchool size={20} />,
    label: "Study Data",
    path: "/admin/study-data",
  },
  {
    icon: <HiUsers size={20} />,
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: <IoMdSettings size={20} />,
    label: "Settings",
    path: "/admin/roles",
  },
  {
    icon: <IoNotificationsSharp size={20} />,
    label: "Notifications",
    path: "/admin/notifications",
  },
];

const bottomItems = [
  {
    icon: <BiSolidHelpCircle size={20} />,
    label: "Help",
    path: "/admin/help",
  },
  {
    icon: <RiLogoutCircleRFill size={20} />,
    label: "Logout",
    path: "/admin/logout",
  },
];

const SidebarItem = ({
  icon,
  label,
  children,
  isExpanded,
  toggleExpand,
  path,
  navigate,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (path) {
      navigate(path);
    } else if (toggleExpand) {
      toggleExpand();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      {/* Parent item */}
      <div
        onClick={handleClick}
        className={`flex gap-3 items-center py-2 my-1 pl-4 w-full whitespace-nowrap rounded-xl cursor-pointer  ${
          isActive
            ? "text-black bg-lime-300"
            : "text-gray-400 hover:bg-lime-100"
        }`}
      >
        <div className="shrink-0">{icon}</div>
        <span className="self-stretch my-auto text-base font-sm ">{label}</span>
        {/* Conditionally render the expand icon */}
        {children &&
          (isExpanded ? (
            <FaCaretUp className="ml-2 mr-1" fontSize={14} />
          ) : (
            <IoMdArrowDropdown className="ml-auto mr-1" fontSize={20} />
          ))}
      </div>
      {/* Child items */}
      {children && isExpanded && (
        <div className="ml-8 mt-2">
          {children.map((child, index) => (
            <NavLink
              key={index}
              to={child.path}
              className={({ isActive }) =>
                `flex gap-3 items-center py-2 pr-10 pl-4 w-full whitespace-nowrap rounded-xl ${
                  isActive
                    ? "text-black bg-lime-300"
                    : "text-gray-500 hover:bg-lime-300"
                }`
              }
            >
              <span className="text-sm font-medium">{child.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState(null); // No menu is expanded by default
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null); // New state to track active child
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL

  const dispatch = useDispatch();

  const handleItemClick = (label) => {
    setActiveItem(label);
    console.log("label =", label);
    console.log("activeItem =", activeItem);
  };
  const handleItemClickbottom = (label) => {
    const routes = {
      Logout: import.meta.env.VITE_LOGOUT_URL,
    };

    const targetUrl = routes[label];

    if (targetUrl) {
      dispatch(logout());
      window.location.href = targetUrl;
    } else {
      console.error("Invalid label: ", label);
    }
    // if (label === "Logout") {
    //   dispatch(logout());
    //   window.location.href = targetUrl;
    //   console.log("label =", label);
    // }
  };

  useEffect(() => {
    // Get expanded item state from localStorage
    const savedExpandedItem = localStorage.getItem("expandedItem");
    if (savedExpandedItem) {
      setExpandedItem(savedExpandedItem);
    }

    const currentPath = location.pathname;
    let activeItem = sidebarItems.find((item) =>
      currentPath.startsWith(item.path)
    );

    // Reset active parent if the path doesn't match the "Administrative" section
    if (activeItem && activeItem.label !== "Administrative") {
      setActiveParent(activeItem.label);
    }

    if (activeItem) {
      setActiveParent(activeItem.label);

      // If the parent has children, check if one of them is active
      if (activeItem.children) {
        const activeChildItem = activeItem.children.find((child) =>
          currentPath.startsWith(child.path)
        );
        if (activeChildItem) {
          setActiveChild(activeChildItem.path);
        } else {
          setActiveChild(null); // No child active, clear active child
        }
      }
    }

    // Check for active paths for other sidebar items (bottom items and other parents)
    sidebarItems.forEach((item) => {
      if (currentPath.startsWith(item.path)) {
        setActiveParent(item.label);
      }
    });
  }, [location.pathname]);

  const toggleExpand = (label) => {
    setExpandedItem((prev) => {
      const newState = prev === label ? null : label;
      localStorage.setItem("expandedItem", newState); // Save the expanded item state to localStorage
      return newState;
    });
  };

  const handleParentClick = (label) => {
    const routes = {
      Dashboard: import.meta.env.VITE_DASHBOARD_URL,
      Users: import.meta.env.VITE_USER_URL,
    };

    const targetUrl = routes[label];

    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      console.error("Invalid label: ", label);
    }

    //below localhost
    // const targetUrl = import.meta.env.VITE_PROD_URL;

    // // if (targetUrl) {
    // //   window.location.href = targetUrl;
    // // } else {
    // //   console.error(`No URL configured for label: ${label}`);
    // // }

    // //for production
    // if (label === "Dashboard") {
    //   // window.location.href = `${targetUrl}?id=${token}`;
    //   window.location.href = targetUrl;
    // }

    setActiveParent(label);
    setActiveChild(null); // Reset child when switching parents
    // Automatically set the first child of Administrative as active
    if (label === "Administrative") {
      setActiveChild(sidebarItems[3].children[0].path);
      navigate(sidebarItems[3].children[0].path); // Navigate to the first child
    }
  };

  return (
    <nav className="flex flex-col justify-center px-6 pt-14 pb-36 bg-neutral-50 max-w-[280px]  h-[800px]">
      {/* Header */}
      <div className="flex gap-3 items-center mb-4">
        <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
        <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 overflow-y-auto ">
        <div className="flex flex-col">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              children={item.children}
              isExpanded={expandedItem === item.label} // Only expands when clicked
              toggleExpand={() => toggleExpand(item.label)}
              path={item.path}
              navigate={navigate}
              isActive={
                activeParent === item.label ||
                (item.children &&
                  item.children.some((child) => child.path === activeChild)) ||
                location.pathname === item.path // Match exact parent path
              }
              onClick={() => handleParentClick(item.label)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col mt-0">
        {bottomItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            navigate={navigate}
            isActive={location.pathname === item.path} // Active state for bottom items
            onClick={() => handleItemClickbottom(item.label)}
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;

console.log(location.pathname);
