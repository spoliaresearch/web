"use client";

import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { FontSettingsProvider } from "./components/contexts/FontSettingsContext";
import { InteractiveProvider } from "./components/contexts/DisableInteractive";
import { PageTitleProvider } from "./components/contexts/PageTitleContext";
import { GlossaryProvider } from "./components/GlossaryProvider";
import Analytics from "./components/Analytics";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
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
        </body>
      </html>
    </ViewTransitions>
  );
}
