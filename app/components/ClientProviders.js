"use client";

import { ThemeProvider } from "./contexts/ThemeContext";
import { FontSettingsProvider } from "./contexts/FontSettingsContext";
import { InteractiveProvider } from "./contexts/DisableInteractive";
import { PageTitleProvider } from "./contexts/PageTitleContext";
import { GlossaryProvider } from "./GlossaryProvider";
import Analytics from "./Analytics";
import { useEffect, useState } from "react";

export default function ClientProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Analytics />
      <ThemeProvider>
        <FontSettingsProvider>
          <InteractiveProvider>
            <PageTitleProvider>
              <GlossaryProvider>
                <div
                  style={{
                    minHeight: "100vh",
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-text)",
                  }}
                >
                  {mounted && children}
                </div>
              </GlossaryProvider>
            </PageTitleProvider>
          </InteractiveProvider>
        </FontSettingsProvider>
      </ThemeProvider>
    </>
  );
}

