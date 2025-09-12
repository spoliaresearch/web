"use client";

import { createContext, useContext, useState } from "react";

const PageTitleContext = createContext();

export const PageTitleProvider = ({ children }) => {
  const [miniTitle, setMiniTitle] = useState("");
  const [miniVisible, setMiniVisible] = useState(false);

  return (
    <PageTitleContext.Provider
      value={{
        miniTitle,
        setMiniTitle,
        miniVisible,
        setMiniVisible,
      }}
    >
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return context;
};
