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
import { toast } from "react-hot-toast";
import Cookies from "js-cookie"; 

const sidebarItems = [
  {
    icon: <GoHomeFill size={20} />,
    label: "Dashboard",
    path: "/Dashboard",
  },
  {
    icon: <BiSolidReport size={20} />,
    label: "Reports",
    path: "/projects",
  },
  {
    icon: <MdTask size={20} />,
    label: "FLN",
    children: [
      {
        label: "Monitoring",
        path: "/assessments",
      },
      {
        label: "Learner Outcomes",
        path: "/Learner-Outcomes",
      },
      {
        label: "Assessment Questions",
        path: "/Assessment-Questions",
      },
    ],
  },
  {
    icon: <IoIosSchool size={20} />,
    label: "Schools",
    path: "/study-data",
  },
  {
    icon: <HiUsers size={20} />,
    label: "Users",
    path: "/users",
  },
  {
    icon: <IoMdSettings size={20} />,
    label: "Settings",
    // children: [
    //   {
    //     label: "Administrative ",
    //     path: "/administrative",
    //   },
    //   {
    //     label: "Academic",
    //     path: "/academic",
    //   },
    // ],
    children: [
      {
        label: "Administrative",
        path: "/administrative",
      },
      {
        label: "Academic",
        path: "/academic",
      },
     
    ],
  },

  {
    icon: <IoNotificationsSharp size={20} />,
    label: "Notificaiton",
    path: "/settings",
  },
  {
    icon: <IoNotificationsSharp size={20} />,
    label: "Polls Management",
    path: "/notifications",
  },
];

const bottomItems = [
  {
    icon: <BiSolidHelpCircle size={20} />,
    label: "Help",
    path: "/help",
  },
  {
    icon: <RiLogoutCircleRFill size={20} />,
    label: "Logout",
    path: "/logout",
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
      onClick(label);
    }
  };

  return (
    <div>
      {/* Parent item */}
      <div
        onClick={handleClick}
        className={`flex gap-3 items-center py-2 my-1 pl-4 w-full whitespace-nowrap rounded-xl cursor-pointer transition-all duration-2000 text-sm ${
          isActive
            ? "text-black bg-lime-300"
            : "text-gray-400 hover:bg-lime-100"
        }`}
      >
        <div className="shrink-0">{icon}</div>
        <span className="self-stretch my-auto  text-sm ">{label}</span>
        {/* Conditionally render the expand icon */}
        {children &&
          (isExpanded ? (
            <FaCaretUp className="ml-auto mr-1" fontSize={20} />
          ) : (
            <IoMdArrowDropdown className="ml-auto mr-1" fontSize={20} />
          ))}
      </div>
      {/* Child items */}
      <div
        className={`overflow-hidden transition-max-height duration-300 ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        {children && (
          <div className="ml-8 mt-2">
            {children.map((child, index) => (
              <div
                key={index}
                onClick={() => onClick(child.label)}
                className={`flex gap-1 items-center py-1 pr-10 pl-4 w-full whitespace-nowrap rounded-xl cursor-pointer transition-all duration-2000 my-2 ${
                  location.pathname === child.path
                    ? "text-black bg-lime-300"
                    : "text-gray-500 hover:bg-lime-300"
                }`}
              >
                <span className="text-sm font-medium my-1">{child.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState(null); // No menu is expanded by default
  const [activeParent, setActiveParent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL

  const dispatch = useDispatch();

  const handleItemClick = (label) => {
    console.log("label =", label);

    const routes = {
      Dashboard: import.meta.env.VITE_DASHBOARD_URL,
      Monitoring: import.meta.env.VITE_ASSESSMENT_URL,
      Users: import.meta.env.VITE_USER_URL,
      "Learner Outcomes": import.meta.env.VITE_LOUTCOME_URL,
      "Assessment Questions": import.meta.env.VITE_ASSESSMENTQUESTIONS_URL,
      // Administrative: import.meta.env.VITE_ADMINISTRATIVE_URL,
      "Administrative": import.meta.env.VITE_ADMINISTRATIVE_URL,

      Academic: import.meta.env.VITE_ACADEMIC_URL,

      // Add other labels and their corresponding URLs as needed
    };

    const targetUrl = routes[label];

    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      console.error("Invalid label: ", label);
    }

    setActiveParent(label);
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
      // console.error("Invalid label: ", label);
    }
  };

  useEffect(() => {
    const savedExpandedItem = localStorage.getItem("expandedItem");
    if (savedExpandedItem) {
      setExpandedItem(savedExpandedItem);
    }

    const currentPath = location.pathname;
    sidebarItems.forEach((item) => {
      if (currentPath.startsWith(item.path)) {
        setActiveParent(item.label);
      }
    });
  }, [location.pathname]);

  const toggleExpand = (label) => {
    setExpandedItem((prev) => {
      const newState = prev === label ? null : label;
      localStorage.setItem("expandedItem", newState);
      return newState;
    });
  };

  return (
    <nav className="flex flex-col justify-center px-6 pt-8 bg-neutral-50 h-full max-w-[280px] ">
      {/* Header */}
      <div className="flex gap-3 items-center mb-8">
        <img src={flnlogo} alt="FLN Logo" className="h-full w-8" />
        <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 overflow-y-auto text-sm">
        <div className="flex flex-col text-sm">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              children={item.children}
              isExpanded={expandedItem === item.label}
              toggleExpand={() => toggleExpand(item.label)}
              path={item.path}
              navigate={navigate}
              isActive={activeParent === item.label}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col mb-8 text-sm">
        {bottomItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            navigate={navigate}
            isActive={location.pathname === item.path}
            onClick={() => handleItemClickbottom(item.label)}
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
