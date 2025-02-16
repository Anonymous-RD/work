import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Create a context
const HistoryContext = createContext();

// Custom hook to access the history context
export const useHistoryContext = () => {
  return useContext(HistoryContext);
};

// HistoryProvider component to wrap your application
export const HistoryProvider = ({ children }) => {
  const [previousUrl, setPreviousUrl] = useState(null);
  const location = useLocation(); // This will work because it's inside a function component

  useEffect(() => {
    if (location.pathname !== previousUrl) {
      setPreviousUrl(location.pathname);
    }
  }, [location, previousUrl]);

  return (
    <HistoryContext.Provider value={{ previousUrl }}>
      {children}
    </HistoryContext.Provider>
  );
};
