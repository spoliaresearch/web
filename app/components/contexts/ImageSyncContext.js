"use client";

import { createContext, useContext, useRef } from "react";

const ImageSyncContext = createContext(null);

export function ImageSyncProvider({ children }) {
  // Shared animation start time for all images on the page
  // Initialize as null - will be set when first image is ready to animate
  const sharedStartTimeRef = useRef(null);

  return (
    <ImageSyncContext.Provider value={sharedStartTimeRef}>
      {children}
    </ImageSyncContext.Provider>
  );
}

export function useImageSync() {
  return useContext(ImageSyncContext);
}

