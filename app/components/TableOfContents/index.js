"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./TableOfContents.module.css";

// Custom hook for scroll-based section detection
function useScrollBasedActiveSection(tableOfContents) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return;

    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.3; // 30% from top of viewport
      let currentActive = null;

      // Check each section to see which one should be active
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const element = document.getElementById(item.id);

        if (element) {
          const rect = element.getBoundingClientRect();

          // Section is active if its top is above the trigger point
          if (rect.top <= triggerPoint) {
            currentActive = item.id;
            break;
          }
        }
      }

      // If no section is active, default to "top"
      if (!currentActive) {
        currentActive = "top";
      }

      setActiveSection(currentActive);
    };

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tableOfContents]);

  return activeSection;
}

// Helper function to find the parent section ID for a subsection
function getParentSectionId(item, tableOfContents) {
  if (item.level <= 2) return null; // Level 2 items are main sections

  // Find the most recent level 2 section that comes before this subsection
  const itemIndex = tableOfContents.findIndex((tocItem) => tocItem.id === item.id);

  for (let i = itemIndex - 1; i >= 0; i--) {
    if (tableOfContents[i].level === 2) {
      return tableOfContents[i].id;
    }
  }

  return null;
}

// Helper function to check if we're currently in a section (including its subsections)
function isInSectionOrSubsection(sectionId, activeSection, tableOfContents) {
  if (activeSection === sectionId) return true;

  // Check if the active section is a subsection of this section
  const activeSectionItem = tableOfContents.find((item) => item.id === activeSection);
  if (!activeSectionItem || activeSectionItem.level <= 2) return false;

  const activeParentId = getParentSectionId(activeSectionItem, tableOfContents);
  return activeParentId === sectionId;
}

// Table of Contents Component
export default function TableOfContents({ tableOfContents, readingTime }) {
  const activeSection = useScrollBasedActiveSection(tableOfContents);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [animatingOut, setAnimatingOut] = useState(new Set());
  const prevActiveSection = useRef(null);

  // Auto-collapse sections when navigating to a different main section
  useEffect(() => {
    if (prevActiveSection.current && activeSection && prevActiveSection.current !== activeSection) {
      // Check if we're moving to a different main section
      const prevMainSection = getMainSectionId(prevActiveSection.current, tableOfContents);
      const currentMainSection = getMainSectionId(activeSection, tableOfContents);

      if (prevMainSection && currentMainSection && prevMainSection !== currentMainSection) {
        // We're in a different main section, collapse the previous one
        const newExpanded = new Set(expandedSections);
        newExpanded.delete(prevMainSection);
        setExpandedSections(newExpanded);
      }
    }

    prevActiveSection.current = activeSection;
  }, [activeSection, tableOfContents, expandedSections]);

  // Helper function to get the main section ID for any item
  const getMainSectionId = (itemId, tableOfContents) => {
    const itemIndex = tableOfContents.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return null;

    // Look backwards to find the main section (level 2)
    for (let i = itemIndex; i >= 0; i--) {
      if (tableOfContents[i].level === 2) {
        return tableOfContents[i].id;
      }
    }
    return null;
  };

  // Get subsections for a given main section
  const getSubsections = (mainSectionId) => {
    const mainSectionIndex = tableOfContents.findIndex((item) => item.id === mainSectionId);
    if (mainSectionIndex === -1) return [];

    const subsections = [];
    for (let i = mainSectionIndex + 1; i < tableOfContents.length; i++) {
      const item = tableOfContents[i];
      if (item.level === 2) break; // Stop at next main section
      if (item.level >= 3) {
        subsections.push(item);
      }
    }
    return subsections;
  };

  // Check if a main section should show as active (either it's active or any of its subsections are)
  const isMainSectionActive = (sectionId) => {
    if (activeSection === sectionId) return true;

    const subsections = getSubsections(sectionId);
    return subsections.some((sub) => sub.id === activeSection);
  };

  // Toggle expansion of a main section
  const toggleSection = (sectionId) => {
    const subsections = getSubsections(sectionId);
    if (subsections.length === 0) return; // No subsections to toggle

    const newExpanded = new Set(expandedSections);

    if (expandedSections.has(sectionId)) {
      // Collapsing - start exit animation
      setAnimatingOut(new Set(subsections.map((sub) => sub.id)));

      setTimeout(() => {
        newExpanded.delete(sectionId);
        setExpandedSections(newExpanded);
        setAnimatingOut(new Set());
      }, 300);
    } else {
      // Expanding
      newExpanded.add(sectionId);
      setExpandedSections(newExpanded);
    }
  };

  if (!tableOfContents || tableOfContents.length === 0) return null;

  return (
    <nav className={styles.tableOfContents}>
      <ol>
        {/* Top navigation item */}
        <li className={styles.topItem}>
          <a
            href="#top"
            className={activeSection === "top" ? "toc-a-text" : "toc-i-text"}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Overview
          </a>
        </li>

        {tableOfContents.map((item) => {
          // Check if this is a subsection (level 3+)
          const isSubsection = item.level >= 3;

          if (isSubsection) {
            // Find parent section
            const parentSectionId = getParentSectionId(item, tableOfContents);

            // Show subsection only if parent is expanded or currently animating out
            const shouldShow = expandedSections.has(parentSectionId) || animatingOut.has(item.id);

            if (!shouldShow) {
              return null;
            }

            // Render subsection
            const isActive = activeSection === item.id;
            const linkClassName = isActive ? "toc-a-text" : "toc-i-text";

            const handleClick = (e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                const elementTop = element.offsetTop;
                const offset = 20;
                window.scrollTo({
                  top: elementTop - offset,
                  behavior: "smooth",
                });
              }
            };

            const itemClasses = [styles[`toc-level-${item.level}`], styles.subsectionContainer];
            if (animatingOut.has(item.id)) {
              itemClasses.push(styles.exiting);
            } else {
              itemClasses.push(styles.entering);
            }

            return (
              <li key={item.id} className={itemClasses.join(" ")}>
                <a href={`#${item.id}`} className={linkClassName} onClick={handleClick}>
                  {item.title}
                </a>
              </li>
            );
          } else {
            // Main section (level 2)
            const subsections = getSubsections(item.id);
            const hasSubsections = subsections.length > 0;
            const isExpanded = expandedSections.has(item.id);
            const isActive = isMainSectionActive(item.id);
            const linkClassName = isActive ? "toc-a-text" : "toc-i-text";

            const handleLinkClick = (e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                const elementTop = element.offsetTop;
                const offset = 20;
                window.scrollTo({
                  top: elementTop - offset,
                  behavior: "smooth",
                });

                // Auto-expand subsections if this section has them
                if (hasSubsections && !expandedSections.has(item.id)) {
                  toggleSection(item.id);
                }
              }
            };

            const handleCaretClick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSection(item.id);
            };

            return (
              <li key={item.id} className={styles[`toc-level-${item.level}`]}>
                <div className={styles.mainSectionRow}>
                  <a href={`#${item.id}`} className={linkClassName} onClick={handleLinkClick}>
                    {item.title}
                  </a>
                  {hasSubsections && isActive && (
                    <button
                      className={`${styles.caretButton} ${isExpanded ? styles.expanded : ""}`}
                      onClick={handleCaretClick}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.title} subsections`}
                    >
                      ↓
                    </button>
                  )}
                </div>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}
