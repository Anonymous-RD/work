import * as React from "react";
import { NavigationItem } from "./NavigationItem/NavigationItem";
import { BottomNavigationItem } from "./BottomNavigationItem/BottomNavigationItem";
import { FaFileAlt } from "react-icons/fa";
import { FaCrosshairs } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/fetchUserDetailsSlice";
const authurl = import.meta.env.VITE_AUTH_URL;
const awptrackerurl = import.meta.env.VITE_TRACKER_URL;
const usersurl = import.meta.env.VITE_USERS_URL;
const surveyurl = import.meta.env.VITE_SURVEYS_URL;
const blogsurl = import.meta.env.VITE_BLOGS_URL;
const storiesurl = import.meta.env.VITE_STORIES_URL;
const bestpracticesurl = import.meta.env.VITE_BESTPRACTICES_URL;
const keyeventsurl = import.meta.env.VITE_KEYEVENTS_URL;
const newsletterurl = import.meta.env.VITE_NEWSLETTERS_URL;

const navigationItems = [
  {
    icon: <FaFileAlt />,
    label: "Project Data",
  },
  {
    icon: <FaFileAlt />,
    label: "Project MIS",
  },
  {
    icon: <FaFileAlt />,
    label: "Project Reports",
    subItems: [
      { label: "My Project Reports", url: "" },
      { label: "Shared Project Reports", url: "" },
    ],
  },
  {
    icon: <FaCrosshairs />,
    label: "AWP Tracker",
    url: "/tracker",
  },
  {
    icon: <FaFileAlt />,
    label: "Project Highlights",
    subItems: [
      { label: "Blogs", url: blogsurl },
      { label: "Success Stories", url: storiesurl },
      { label: "Best Practices", url: bestpracticesurl },
      { label: "Key Events & Campaigns", url: keyeventsurl },
      { label: "Newsletter", url: newsletterurl },
    ],
  },
  {
    icon: <FaFileAlt />,
    label: "Resources",
    subItems: [
      { label: "Learning Resources", url: "" },
      { label: "Media", url: "" },
    ],
  },
  {
    icon: <FaFileAlt />,
    label: "E-Learning Courses",
    url: "",
  },
  {
    icon: <FaFileAlt />,
    label: "Surveys",
    subItems: [
      { label: "Survey Forms", url: surveyurl },
      { label: "Survey Results", url: "" },
    ],
  },
  {
    icon: <FaFileAlt />,
    label: "Users",
    url: usersurl,
  },
];

const footerItems = [
  {
    icon: <FaQuestionCircle />,
    label: "Help",
  },
  {
    icon: <FaSignOutAlt />,
    label: "Logout",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = React.useState(3);
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleclickLogout = (e) => {
    e == "Logout" && dispatch(logout());
    window.location.href = authurl;
    console.log("97", e);
  };
  return (
    <div className="flex overflow-hidden flex-col bg-white app-menu navbar-menu">
      <div className="flex flex-col justify-start px-6 pt-4 pb-12 w-full bg-neutral-50 h-full">
        <div className="gap-3 self-stretch max-w-full text-2xl text-gray-800 w-[230px]">
          IPEL Intervention
        </div>
        <div className="flex flex-col pt-4 max-w-full flex-1 w-[200px]">
          <div className="flex flex-col flex-1 w-full max-w-[200px]">
            <Scrollbars autoHide>
              {navigationItems.map((item, index) => (
                <NavigationItem
                  key={index}
                  icon={item.icon}
                  url={item.url}
                  label={item.label}
                  isActive={index === activeItem}
                  isExpanded={index === expandedIndex}
                  onClick={() => {
                    if (item.url) {
                      if (
                        item.url.startsWith("http://") ||
                        item.url.startsWith("https://")
                      ) {
                        window.location.replace(item.url); // Replace the current URL
                      } else {
                        window.location.replace(
                          `${window.location.origin}${item.url}`
                        ); // Handle relative URL
                      }
                    } else {
                      setActiveItem(index);
                    }
                  }}
                  onExpand={() => handleExpand(index)}
                  subItems={item.subItems}
                />
              ))}
            </Scrollbars>
          </div>
          <div className="flex flex-col mt-auto w-full text-sm font-medium text-gray-400 whitespace-nowrap max-w-[200px]">
            {footerItems.map((item, index) => (
              <BottomNavigationItem
                key={index}
                icon={item.icon}
                label={item.label}
                onClick={() =>
                  console.log(
                    `Clicked ${item.label}${handleclickLogout(item.label)}`
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
