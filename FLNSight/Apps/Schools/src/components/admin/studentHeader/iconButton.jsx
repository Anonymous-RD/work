import * as React from "react";

export function IconButton({ src, alt }) {
  return (
    <button 
      className="flex items-center justify-center"
      tabIndex={0}
      aria-label={alt}
    >
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="object-contain shrink-0 w-6 aspect-square"
      />
    </button>
  );
}