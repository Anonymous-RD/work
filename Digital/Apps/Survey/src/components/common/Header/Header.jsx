import * as React from "react";

import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";



const Header = () => {
    return (
        <div className="flex flex-wrap gap-10 justify-between items-center header bg-white h-20 px-8">
            <div className="self-stretch my-auto text-2xl font-semibold text-gray-800">
                AWP Tracker
            </div>
            <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
                <div className="flex gap-10 items-start self-stretch my-auto">
                    <button className="shrink-0 w-6 aspect-square" tabIndex={0} >
                        <FaSearch />
                    </button>
                    <button className="shrink-0 w-6 aspect-square" tabIndex={0} >
                        <FaBell />
                    </button>
                </div>
                <button
                    className="flex gap-10 justify-between items-center self-stretch py-1.5 pr-4 pl-2 text-sm font-semibold text-gray-800 bg-neutral-50 rounded-[100px] w-[215px]"
                    tabIndex={0}
                >
                    <div className="flex gap-3 items-center self-stretch my-auto">
                        <img
                            loading="lazy"
                            src=""
                            className="object-contain shrink-0 self-stretch my-auto w-9 rounded-full aspect-square"
                        />
                        <div className="self-stretch my-auto">Vibhan Nabil</div>
                    </div>

                </button>
            </div>
        </div>
    );
}

export default Header;