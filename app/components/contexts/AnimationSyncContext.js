"use client";

import { createContext, useContext, useState, useRef, useCallback } from "react";

const AnimationSyncContext = createContext(null);

export function AnimationSyncProvider({ children }) {
  const sharedStartTimeRef = useRef(null);
  
  // Get or initialize the shared start time
  const getSharedStartTime = useCallback(() => {
    if (!sharedStartTimeRef.current) {
      sharedStartTimeRef.current = Date.now();
    }
    return sharedStartTimeRef.current;
  }, []);

  // Reset the shared start time (useful for page navigation)
  const resetSharedStartTime = useCallback(() => {
    sharedStartTimeRef.current = null;
  }, []);

  return (
    <AnimationSyncContext.Provider value={{ getSharedStartTime, resetSharedStartTime }}>
      {children}
    </AnimationSyncContext.Provider>
  );
}

export function useAnimationSync() {
  const context = useContext(AnimationSyncContext);
  return context; // Can be null if not wrapped in provider
}

