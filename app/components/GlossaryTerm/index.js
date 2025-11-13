"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getGlossaryTerm } from "../../../lib/glossary-data";
import styles from "./GlossaryTerm.module.css";

export default function GlossaryTerm({
  slug,
  children,
  variant = "inline", // 'inline' | 'standalone'
  showPreview = true,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const termRef = useRef(null);
  const previewRef = useRef(null);

  const term = getGlossaryTerm(slug);

  if (!term) {
    console.warn(`Glossary term "${slug}" not found`);
    return <span>{children}</span>;
  }

  useEffect(() => {
    if (!isHovered || !showPreview) return;

    const updatePosition = () => {
      if (!termRef.current || !previewRef.current) return;

      const termRect = termRef.current.getBoundingClientRect();
      const previewRect = previewRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let x = termRect.left;
      let y = termRect.bottom + 8;

      // Adjust horizontal position if preview would overflow
      if (x + previewRect.width > viewport.width - 16) {
        x = viewport.width - previewRect.width - 16;
      }
      if (x < 16) x = 16;

      // Adjust vertical position if preview would overflow
      if (y + previewRect.height > viewport.height - 16) {
        y = termRect.top - previewRect.height - 8;
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
  }, [isHovered, showPreview]);

  const handleMouseEnter = () => {
    if (showPreview) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Navigate to glossary page
      window.location.href = `/glossary/${slug}`;
    }
  };

  if (variant === "standalone") {
    return (
      <div className={styles.standalone}>
        <Link href={`/glossary/${slug}`} className={styles.standaloneLink}>
          <h3>{term.term}</h3>
          <p>{term.shortDefinition}</p>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link
        ref={termRef}
        href={`/glossary/${slug}`}
        className={styles.inlineTerm}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        aria-describedby={`glossary-preview-${slug}`}
        role="button"
        tabIndex={0}
      >
        {children || term.term}
      </Link>

      {showPreview && isHovered && (
        <div
          ref={previewRef}
          className={styles.preview}
          style={{
            position: "fixed",
            left: previewPosition.x,
            top: previewPosition.y,
            zIndex: 1000,
          }}
          id={`glossary-preview-${slug}`}
          role="tooltip"
          aria-live="polite"
        >
          <div className={styles.previewHeader}>
            <h4>{term.term}</h4>
            {term.etymology && <span className={styles.etymology}>{term.etymology}</span>}
          </div>

          <p className={styles.definition}>{term.shortDefinition}</p>

          {term.examples && term.examples.length > 0 && (
            <div className={styles.examples}>
              <strong>Examples:</strong>
              <ul>
                {term.examples.slice(0, 2).map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}

          {term.tags && term.tags.length > 0 && (
            <div className={styles.tags}>
              {term.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={styles.previewFooter}>
            <span>Click to learn more →</span>
          </div>
        </div>
      )}
    </>
  );
}
