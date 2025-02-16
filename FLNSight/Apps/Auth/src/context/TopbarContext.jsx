// TopBarContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TopBarContext = createContext();

export const TopBarProvider = ({ children }) => {
  const [title, setTitle] = useState("Welcome");
  const [backUrl, setBackUrl] = useState(null);

  const location = useLocation(); // Listen to route changes

  useEffect(() => {
    // Reset backUrl if necessary, or update dynamically
    // You can adjust this logic to handle specific routes if needed
    setBackUrl((prev) => (location.pathname !== prev ? null : prev));
  }, [location]);

  return (
    <TopBarContext.Provider value={{ title, setTitle, backUrl, setBackUrl }}>
      {children}
    </TopBarContext.Provider>
  );
};

export const useTopBar = () => useContext(TopBarContext);
