"use client";

import React from "react";

export const InteractiveContext = React.createContext({
  isInteractive: true,
  setIsInteractive: () => {},
});
