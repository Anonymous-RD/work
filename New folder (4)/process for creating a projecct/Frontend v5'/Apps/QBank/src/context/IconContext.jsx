import React, { createContext, useContext, useState } from "react";

const IconContext = createContext(null);

export const useIconContext = () => {
  return useContext(IconContext);
};

export const IconProvider = ({ children }) => {
  const [icon, setIcon] = useState(null); // Default icon state is null

  const setIconState = (iconPath) => {
    setIcon(iconPath); // Set the icon state
  };

  const clearIconState = () => {
    setIcon(null); // Clear the icon state
  };

  return (
    <IconContext.Provider value={{ icon, setIconState, clearIconState }}>
      {children}
    </IconContext.Provider>
  );
};
