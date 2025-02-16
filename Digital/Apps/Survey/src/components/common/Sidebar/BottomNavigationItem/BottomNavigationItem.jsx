import * as React from "react";

export function BottomNavigationItem({ icon, label, onClick }) {
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="flex gap-3 items-center py-3.5 pr-20 pl-4 w-full rounded-lg"
    >
     {icon}
      <div className="self-stretch my-auto">{label}</div>
    </div>
  );
}