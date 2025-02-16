import React from 'react';

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`flex items-center cursor-pointer w-16 h-8 rounded-full p-1 transition-all duration-300 ${
        isOn ? 'bg-lime-300' : 'bg-gray-300'
      }`} 
      role="switch"
      aria-checked={isOn}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
          isOn ? 'transform translate-x-8' : ''
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;