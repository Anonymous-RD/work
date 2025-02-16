import { auth } from "@/firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import flnlogo from "../../assets/login/flnlogo.png";import React, { useState, useEffect } from "react";
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
    console.log("label =", label);

    const routes = {
      Dashboard: import.meta.env.VITE_DASHBOARD_URL,
      FLN: import.meta.env.VITE_ASSESSMENT_URL,
      // Add other labels and their corresponding URLs as needed
    };

    const targetUrl = routes[label];

    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      console.error("Invalid label: ", label);
    }

    // NOTE: The code above is a cleaner way to handle the redirections based on the label and below code is for local host.

    // const targetUrl = import.meta.env.VITE_PROD_URL;

    // if (targetUrl) {
    //   window.location.href = targetUrl;
    // } else {
    //   console.error(`No URL configured for label: ${label}`);
    // }

    // const token = Cookies.get("token");
    // if (label === "Assessments") {
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
    //   toast.success("Successfully Logged Out !");
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

  // const handleParentClick = (label) => {
  //   if (label === "Assessment") {
  //     window.location.href = "http://localhost:5174/admin/assessment";
  //   }
  //   setActiveParent(label);
  //   setActiveChild(null); // Reset child when switching parents
  //   // Automatically set the first child of Administrative as active
  //   if (label === "Administrative") {
  //     setActiveChild(sidebarItems[3].children[0].path);
  //     navigate(sidebarItems[3].children[0].path); // Navigate to the first child
  //   }
  // };

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
              onClick={() => handleItemClick(item.label)}
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

import loginright from "../../assets/login/login_right.png";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (!code) {
      setMessage("Invalid or missing reset code.");
      setIsLoading(false);
      return;
    }
    setOobCode(code);

    verifyPasswordResetCode(auth, code)
      .then((email) => {
        setEmail(email);
        setIsLoading(false);
      })
      .catch(() => {
        setMessage("Invalid or expired reset code.");
        setIsLoading(false);
      });
  }, [searchParams]);

  const validate = () => {
    let errors = {};
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      await confirmPasswordReset(auth, oobCode, password);

      Swal.fire({
        icon: "success",
        iconColor: "#C8EE44",
        title: "Reset password successfully",
        text: ` You can start logging into your account now.`,
        textColor: "black",
        showConfirmButton: false,
        timer: 3500
       
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/"); // Redirect to the home page after successful reset
        }
      });

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setMessage("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="relative h-screen">
  //       {/* Overlay for the loading spinner */}
  //       <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
  //         <svg
  //           className="animate-spin h-10 w-10 text-lime-300"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //         >
  //           <circle
  //             className="opacity-25"
  //             cx="12"
  //             cy="12"
  //             r="10"
  //             stroke="currentColor"
  //             strokeWidth="4"
  //           ></circle>
  //           <path
  //             className="opacity-75"
  //             fill="currentColor"
  //             d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.292A8.962 8.962 0 014 12H2c0 2.487.832 4.78 2.219 6.573l1.543-1.281z"
  //           ></path>
  //         </svg>
  //       </div>
  //       {/* Page content with spinner overlay */}
  //       <div className="flex overflow-hidden flex-col pr-10 pl-[30px] bg-white max-md:px-5 max-md:pb-24 opacity-50 pointer-events-none">
  //         <div className="self-start w-full  max-md:mt-10  ml-14">
  //           <div className="flex gap-20 max-md:flex-col">
  //             <div className="left flex flex-col w-1/2">
  //               <div className="flex flex-col mt-18 max-md:mt-10 ml-10">
  //                 <div className="flex gap-3 items-center mb-10  mt-10 ">
  //                   <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
  //                   <h1 className="text-2xl text-gray-800 font-bold">
  //                     FLNSight
  //                   </h1>
  //                 </div>
  //                 <div className="flex flex-col self-start mt-20">
  //                   <h1 className="text-3xl font-bold text-gray-800">
  //                     Reset Password
  //                   </h1>
  //                   <p className="mt-2 text-base text-gray-500">
  //                     Reset a password for {email}
  //                   </p>
  //                 </div>
  //                 <form
  //                   className="flex flex-col mt-6 w-full max-w-[404px]"
  //                   onSubmit={handleSubmit}
  //                 >
  //                   <div className="flex flex-col w-full">
  //                     <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium">
  //                       <label
  //                         htmlFor="password"
  //                         className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
  //                       >
  //                         Password
  //                       </label>
  //                       <input
  //                         id="password"
  //                         type="password"
  //                         name="password"
  //                         value={password}
  //                         onChange={(e) => setPassword(e.target.value)}
  //                         placeholder="Enter your password"
  //                         className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
  //                           errors.password
  //                             ? "border-red-500"
  //                             : "border-zinc-100"
  //                         } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
  //                         required
  //                       />
  //                       {errors.password && (
  //                         <p className="text-red-500 text-sm mt-1">
  //                           {errors.password}
  //                         </p>
  //                       )}
  //                     </div>
  //                     <div className="flex flex-col justify-center mt-1.5 w-full">
  //                       <label
  //                         htmlFor="confirmPassword"
  //                         className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
  //                       >
  //                         Confirm Password
  //                       </label>
  //                       <input
  //                         type="password"
  //                         id="confirmPassword"
  //                         value={confirmPassword}
  //                         onChange={(e) => setConfirmPassword(e.target.value)}
  //                         placeholder="Confirm your password"
  //                         className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
  //                           errors.confirmPassword
  //                             ? "border-red-500"
  //                             : "border-zinc-100"
  //                         } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
  //                         required
  //                       />
  //                       {errors.confirmPassword && (
  //                         <p className="text-red-500 text-sm mt-1">
  //                           {errors.confirmPassword}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </div>
  //                   <div className="flex flex-col items-center mt-6 max-w-full text-base font-semibold text-center text-gray-800 w-[404px]">
  //                     <div className="flex flex-col w-full max-w-[404px]">
  //                       <button
  //                         type="submit"
  //                         className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl hover:bg-orange-300"
  //                       >
  //                         {loading ? (
  //                           <svg
  //                             className="animate-spin h-5 w-5 text-white mx-auto"
  //                             xmlns="http://www.w3.org/2000/svg"
  //                             fill="none"
  //                             viewBox="0 0 24 24"
  //                           >
  //                             <circle
  //                               className="opacity-25"
  //                               cx="12"
  //                               cy="12"
  //                               r="10"
  //                               stroke="currentColor"
  //                               strokeWidth="4"
  //                             ></circle>
  //                             <path
  //                               className="opacity-75"
  //                               fill="currentColor"
  //                               d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.292A8.962 8.962 0 014 12H2c0 2.487.832 4.78 2.219 6.573l1.543-1.281z"
  //                             ></path>
  //                           </svg>
  //                         ) : (
  //                           "Reset Password"
  //                         )}
  //                       </button>
  //                     </div>
  //                   </div>
  //                   {message && (
  //                     <p className="mt-4 text-center text-red-500">{message}</p>
  //                   )}
  //                 </form>
  //               </div>
  //             </div>
  //             <div className="right flex flex-col w-1/2 h-screen max-md:w-full max-md:hidden">
  //               <div
  //                 className="h-full w-full bg-cover bg-no-repeat bg-center"
  //                 style={{ backgroundImage: `url(${loginright})` }}
  //                 aria-label="Background"
  //               ></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="w-full lg:w-1/2 px-4 lg:px-12 xl:px-24 py-8 lg:py-12 flex items-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-20">
              <img src={flnlogo} alt="FLN Logo" className="h-8 w-6 mr-3" />
              <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
            </div>
            <div className="flex flex-col self-start mt-20">
              <h1 className="text-3xl font-bold text-gray-800">
                Reset Password
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Reset a password for {email}
              </p>
            </div>
            <form
              className="flex flex-col mt-6 w-full max-w-[404px]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full">
                <div className="flex flex-col justify-center mt-1.5 w-full">
                  <label
                    htmlFor="password"
                    className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-zinc-100"
                    } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center mt-1.5 w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-zinc-100"
                    } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center mt-6 max-w-full text-base font-semibold text-center text-gray-800 w-[404px]">
                <div className="flex flex-col w-full max-w-[404px]">
                  <button
                    type="submit"
                    className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl hover:bg-orange-300"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.292A8.962 8.962 0 014 12H2c0 2.487.832 4.78 2.219 6.573l1.543-1.281z"
                        ></path>
                      </svg>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </div>
              {message && (
                <p className="mt-4 text-center text-red-500">{message}</p>
              )}
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-64 lg:h-screen">
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <img
              src={loginright}
              alt="Login background"
              className="object-fit object-center w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
