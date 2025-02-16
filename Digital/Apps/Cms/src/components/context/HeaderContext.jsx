// HeaderContext.js
import React, { createContext, useState, useContext } from 'react';
const HeaderContext = createContext();
export const HeaderProvider = ({ children }) => {
  const [title, setTitle] = useState('Project Highlights');
  const [backUrl, setBackUrl] = useState(null); // Additional state for Back URL
  return (
    <HeaderContext.Provider value={{ title, setTitle, backUrl, setBackUrl }}>
      {children}
    </HeaderContext.Provider>
  );
};
export const useHeader = () => useContext(HeaderContext);