import React, { createContext, useContext, useState } from "react";

const PageMetadataContext = createContext();

export const PageMetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({ title: "", backPath: null });

  return (
    <PageMetadataContext.Provider value={{ metadata, setMetadata }}>
      {children}
    </PageMetadataContext.Provider>
  );
};

export const usePageMetadata = () => useContext(PageMetadataContext);