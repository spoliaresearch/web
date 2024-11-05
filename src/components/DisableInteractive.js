import React, { createContext, useContext, useState } from "react";
import "./DisableInteractive.css";

// Create a context for the interactive state
export const InteractiveContext = createContext();

// Create a provider component
export function InteractiveProvider({ children }) {
  const [isInteractive, setIsInteractive] = useState(true);

  return (
    <InteractiveContext.Provider value={{ isInteractive, setIsInteractive }}>{children}</InteractiveContext.Provider>
  );
}

// Create the toggle component
export function DisableInteractive() {
  const { isInteractive, setIsInteractive } = useContext(InteractiveContext);

  return (
    <div className="grid-item">
      <label className="pixelated-checkbox-label">
        <input
          type="checkbox"
          className="pixelated-checkbox"
          checked={!isInteractive}
          onChange={(e) => setIsInteractive(!e.target.checked)}
        />
        <span className="pixelated-checkbox-custom"></span>
        Reduce Animation
      </label>
    </div>
  );
}
