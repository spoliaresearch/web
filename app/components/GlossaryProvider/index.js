"use client";

import React, { createContext, useContext, useMemo, useState, useRef, useEffect } from "react";
import { getAllGlossaryTerms, getGlossaryTerm } from "../../../lib/glossary-data";
import CustomImage from "../Image";

const GlossaryContext = createContext({});

export function GlossaryProvider({ children }) {
  const terms = useMemo(() => getAllGlossaryTerms(), []);

  // Create a map for fast lookups
  const termMap = useMemo(() => {
    const map = new Map();
    terms.forEach((term) => {
      map.set(term.term.toLowerCase(), term.slug);
      // Also map alternative forms if needed
      map.set(term.slug, term.slug);
    });
    return map;
  }, [terms]);

  const value = {
    terms,
    termMap,
    getTermSlug: (text) => termMap.get(text.toLowerCase()),
  };

  return <GlossaryContext.Provider value={value}>{children}</GlossaryContext.Provider>;
}

export function useGlossary() {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error("useGlossary must be used within a GlossaryProvider");
  }
  return context;
}

// Text processor component that automatically links glossary terms
export function GlossaryText({
  children,
  className,
  style,
  autoLink = true,
  excludeTerms = [], // Terms to exclude from auto-linking
  ...props
}) {
  const { getTermSlug, openTerm } = useGlossary();

  if (!autoLink || typeof children !== "string") {
    return (
      <span className={className} style={style} {...props}>
        {children}
      </span>
    );
  }

  const processText = (text) => {
    // Create a regex pattern for all glossary terms
    // This is a simplified version - in production you'd want more sophisticated matching
    const words = text.split(/(\s+|[.,!?;:])/);

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]/g, "").trim();
      const slug = getTermSlug(cleanWord);

      if (slug && !excludeTerms.includes(slug)) {
        return (
          <GlossaryLink
            key={`${slug}-${index}`}
            slug={slug}
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              cursor: "pointer",
            }}
            onClick={(e) => {
              window.location.href = `/glossary/${slug}`;
            }}
          >
            {word}
          </GlossaryLink>
        );
      }

      return word;
    });
  };

  return (
    <span className={className} style={style} {...props}>
      {processText(children)}
    </span>
  );
}

// Hook for manual term linking
export function useGlossaryLink(slug) {
  const { terms } = useGlossary();
  return terms.find((term) => term.slug === slug);
}

// Simple component that preserves ALL styling and shows hover preview
export function GlossaryLink({ slug, children, className, style, onClick, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef(null);
  const previewRef = useRef(null);
  const timeoutRef = useRef(null);

  const {} = useGlossary();
  const term = getGlossaryTerm(slug);

  if (!term) {
    return (
      <span className={className} style={style} {...props}>
        {children}
      </span>
    );
  }

  useEffect(() => {
    if (!showPopover) return;

    const updatePosition = () => {
      if (!linkRef.current || !previewRef.current) return;

      const linkRect = linkRef.current.getBoundingClientRect();
      const previewRect = previewRef.current.getBoundingClientRect();
      const viewport = { width: window.innerWidth, height: window.innerHeight };

      let x = linkRect.left;
      let y = linkRect.bottom + 8;

      // Keep preview in viewport
      if (x + previewRect.width > viewport.width - 16) {
        x = viewport.width - previewRect.width - 16;
      }
      if (x < 16) x = 16;

      if (y + previewRect.height > viewport.height - 16) {
        y = linkRect.top - previewRect.height - 8;
      }

      setPreviewPosition({ x, y });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showPopover]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowPopover(true);
    // Small delay to ensure the element is mounted before triggering animation
    setTimeout(() => setIsHovered(true), 10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Wait for animation to complete before removing element
    timeoutRef.current = setTimeout(() => {
      setShowPopover(false);
    }, 300);
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      // Navigate to glossary page
      window.location.href = `/glossary/${slug}`;
    }
  };

  return (
    <>
      <span
        ref={linkRef}
        className={className}
        style={{ ...style, cursor: "help" }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Learn about ${term.term}`}
        {...props}
      >
        {children}
      </span>

      {showPopover && (() => {
        // Check if term has images (placeholder logic for now)
        const hasImage = term.content?.images && term.content.images.length > 0;

        return (
          <div
            ref={previewRef}
            style={{
              position: "fixed",
              left: previewPosition.x,
              top: previewPosition.y,
              zIndex: 1000,
              background: "white",
              border: ".5px solid rgb(211, 210, 208)",
              borderRadius: "4px",
              padding: "6px 0rem",
              width: hasImage ? "400px" : "250px",
              height: "120px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)",
              fontSize: "14px",
              letterSpacing: "0",
              lineHeight: "1.4",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0px)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              display: "flex",
              alignItems: "center",
            }}
            role="tooltip"
          >
            {(() => {

            // Process description to bold term name where it appears in the text
            const processDescription = (description) => {
              if (!description) return description;

              // Split by term name and bold all instances
              const termRegex = new RegExp(`(${term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
              const parts = description.split(termRegex);

              return parts.map((part, index) => {
                // Check if this part matches the term name (case-insensitive)
                if (part && term.term && part.toLowerCase() === term.term.toLowerCase()) {
                  return (
                    <span style={{ fontVariationSettings: '"wght" 700, "ital" 0, "SRFF" 0.25' }} key={index}>
                      {part}
                    </span>
                  );
                }
                // Return the part as-is (including empty strings to preserve spacing)
                return <span key={index}>{part}</span>;
              });
            };

            if (hasImage) {
              // 2-column layout with image
              return (
                <div style={{ display: "flex", gap: "0", alignItems: "stretch", height: "100%" }}>
                  <div style={{ flex: 1, padding: "0rem .75rem", width: "50%", display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        fontVariationSettings: '"wght" 400, "ital" 0, "SRFF" 0.15',
                        letterSpacing: "-0.01em",
                        color: "#111",
                        fontSize: "14px",
                        lineHeight: "1.2",
                        textAlign: "left",
                      }}
                    >
                      {processDescription(term.shortDefinition)}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      width: "50%",
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: "0 4px 4px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CustomImage
                      src={term.content.images[0].src}
                      alt={term.content.images[0].alt}
                      className=""
                      priority={true}
                    />
                  </div>
                </div>
              );
            } else {
              // Single column layout without image
              return (
                <span
                  style={{
                    fontVariationSettings: '"wght" 400, "ital" 0, "SRFF" 0.15',
                    letterSpacing: "-0.01em",
                    color: "#111",
                    fontSize: "14px",
                    lineHeight: "1.2",
                    padding: "0rem .75rem",
                    textAlign: "left",
                  }}
                >
                  {processDescription(term.shortDefinition)}
                </span>
              );
            }
            })()}
          </div>
        );
      })()}
    </>
  );
}
