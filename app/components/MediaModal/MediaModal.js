"use client";

import { useEffect, useCallback } from "react";
import { useMediaModal } from "./MediaProvider";
import styles from "./MediaModal.module.css";

export default function MediaModal() {
  const { isModalOpen, currentMedia, closeModal, nextMedia, prevMedia, mediaItems } = useMediaModal();

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevMedia();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextMedia();
          break;
      }
    },
    [isModalOpen, closeModal, prevMedia, nextMedia]
  );

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Preload next/previous images when modal is open
  useEffect(() => {
    if (!isModalOpen || !currentMedia) return;

    const currentIndex = mediaItems.findIndex((item) => item.id === currentMedia.id);
    if (currentIndex === -1) return;

    // Preload adjacent images
    const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    const nextIndex = (currentIndex + 1) % mediaItems.length;

    [prevIndex, nextIndex].forEach((index) => {
      const media = mediaItems[index];
      if (media && media.type === "image" && media.src) {
        const img = new Image();
        img.src = media.src; // This will use browser cache if already loaded
      }
    });
  }, [isModalOpen, currentMedia, mediaItems]);

  // Don't render if modal is closed
  if (!isModalOpen || !currentMedia) return null;

  const handleBackdropClick = (e) => {
    // Close modal when clicking on backdrop (not the content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const showNavigation = mediaItems.length > 1;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={prevMedia}
              aria-label="Previous media"
            >
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
                <path d="M20 24L12 16L20 8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextMedia} aria-label="Next media">
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
                <path d="M12 24L20 16L12 8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </>
        )}

        {/* Media Content */}
        <div className={styles.mediaContainer}>
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.src}
              alt={currentMedia.alt}
              className={styles.modalImage}
              style={{
                opacity: 1,
              }}
            />
          ) : (
            <video
              src={currentMedia.src}
              className={styles.modalVideo}
              controls
              autoPlay
              muted
              loop
              preload="metadata"
            />
          )}
        </div>

        {/* Media Alt Text */}
        {currentMedia.alt && <div className={`fs-smm ${styles.mediaAltText}`}>{currentMedia.alt}</div>}
      </div>
    </div>
  );
}
