import React from 'react';

const IconButton = ({ src, alt }) => {
  return (
    <button className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <img
        src={src}
        alt={alt}
        className="object-contain w-6 h-6"
        loading="lazy"
      />
    </button>
  );
};

export default IconButton;