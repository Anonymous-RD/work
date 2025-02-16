import * as React from "react";

function ActivityMeter({ current, total, percentage }) {
    return (
        <div className="flex flex-col self-stretch my-auto rounded-none min-w-[240px] w-[270px] max-md:max-w-full">
            <div className="flex gap-2.5 items-start text-sm">
                <div className="text-neutral-700">My Activity Meter</div>
                <div className="flex gap-px whitespace-nowrap rounded-none w-[41px]">
                    <div className="grow font-bold text-blue-500">{current.toString().padStart(2, '0')}</div>
                    <div className="text-neutral-700">/{total.toString().padStart(2, '0')}</div>
                </div>
            </div>
            <div className="flex flex-col items-start relative mt-2.5 max-w-full bg-indigo-50 rounded-xl w-[270px] max-md:pr-5">
                <div className="flex shrink-0 h-3 bg-blue-500 rounded-xl" style={{ width: `${percentage}%` }} />
                <div className="absolute mt-1.5 text-xs text-neutral-500 top-[10px]" style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}>{percentage}%</div>
            </div>
        </div>
    );
}

export default ActivityMeter;