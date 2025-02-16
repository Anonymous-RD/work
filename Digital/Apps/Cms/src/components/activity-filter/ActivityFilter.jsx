import * as React from "react";
import ActivityMeter from "./ActivityMeter/ActivityMeter";


function ActivityFilter() {
    return (
        <div className="flex flex-wrap justify-between px-4 py-4 gap-4 items-center">
            <ActivityMeter current={1} total={2} percentage={50} />
            <div className="flex flex-wrap gap-3.5 items-center self-stretch text-base font-semibold text-gray-800 whitespace-nowrap ml-auto">
                <select className="filter-dropdown">
                    <option value="">State</option>
                    <option value="bihar">Bihar</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                </select>
                <select className="filter-dropdown">
                    <option value="">Year</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                </select>
                <select className="filter-dropdown">
                    <option value="">Quarter</option>
                </select>
                <select className="filter-dropdown">
                    <option value="">Download</option>
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF</option>
                </select>

            </div>
        </div>
    );
}

export default ActivityFilter;