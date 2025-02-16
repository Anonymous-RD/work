import * as React from "react";

export function FormField({ label, value, type, icon, placeholder }) {
  const fieldId = `${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col grow shrink basis-[calc(50%-16px)] min-w-[240px] max-w-[318px]">
      <label
        htmlFor={fieldId}
        className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
      >
        {label}
      </label>
      <div
        className={`flex ${
          icon
            ? "gap-10 justify-between items-center py-3 pr-5 pl-6"
            : "gap-6 px-6 pt-4 pb-4"
        } w-full rounded-xl border border-solid border-neutral-100 ${
          placeholder ? "text-gray-500" : "text-zinc-800"
        }`}
      >
        <div className="self-stretch my-auto">{value}</div>
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        )}
      </div>
    </div>
  );
}
