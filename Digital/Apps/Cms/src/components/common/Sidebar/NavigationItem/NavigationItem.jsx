import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function NavigationItem({ icon, label, isActive, url, isExpanded, onClick, onExpand, subItems }) {
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        if (url.startsWith("http://") || url.startsWith("https://")) {
            // External navigation
            window.location.replace(url);
        } else {
            // Local navigation
            navigate(url);
        }
    };

    return (
        <>
            <div
                role="button"
                tabIndex={0}
                onClick={() => {
                    onClick();
                    if (subItems) {
                        onExpand();
                    } else if (url) {
                        handleNavigation(url); // Use the handleNavigation method
                    } else {
                        console.log(`No URL defined for ${label}`);
                    }
                }}
                className={`flex overflow-hidden items-start w-full rounded-lg ${isActive ? 'bg-sky-900 text-white' : 'text-black'
                    }`}
            >
                <div className="flex overflow-hidden flex-1 shrink gap-3 items-center py-3.5 pr-1.5 pl-4 w-full basis-0">
                    {icon}
                    <div className="flex-1 shrink text-sm font-medium basis-0">
                        {label}
                    </div>
                    {subItems && (
                        <div className="flex items-center">
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    )}
                </div>
            </div>
            {/* Render Submenus */}
            {isExpanded && subItems && (
                <div className="ml-6 mt-2 space-y-1">
                    {subItems.map((subItem, index) => (
                        <div
                            key={index}
                            role="button"
                            tabIndex={0}
                            onClick={() => subItem.url && handleNavigation(subItem.url)}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 py-2 px-3 rounded-lg"
                        >
                            {subItem.label}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
