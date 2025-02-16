import * as React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function StatusCard({ slNo, id, title, status, isSelected, onClick, slNoBgColor }) {
    return (
        <div className={`px-4 pb-5 w-full mt-5 cursor-pointer ${isSelected ? "bg-sky-900 bg-opacity-10" : ""}`} onClick={() => onClick(id)}>
            <div className={`flex flex-col pr-4 rounded ${!isSelected ? "bg-stone-50" : ""}`}>
                <div className="z-10 self-end px-3 py-1 -mt-2 text-xs font-semibold text-white bg-sky-600 rounded w-[79px]" style={{ backgroundColor: slNoBgColor }}>
                    IR {slNo}
                </div>
                <div className="flex flex-col pl-4 pb-4 mt-3.5 w-full">
                    <div className="text-xs text-slate-900">{title}</div>
                    {status !== null && (
                        <>
                            <div className="flex gap-5 justify-between mt-3 text-xs text-neutral-500">
                                <div>Completion Status</div>
                                <div>{status}%</div>
                            </div>
                            <ProgressBar percentage={status} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StatusCard;