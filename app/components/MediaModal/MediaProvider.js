"use client";

import { createContext, useContext, useState, useCallback } from "react";

export const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Register a media item (called by Image/Video components)
  const registerMedia = useCallback((mediaData) => {
    setMediaItems((prev) => {
      // Check if already registered to avoid duplicates
      const existingIndex = prev.findIndex((item) => item.id === mediaData.id);
      if (existingIndex !== -1) {
        // Update existing item with new data
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...mediaData };
        return updated;
      }

      const newItems = [...prev, mediaData];

      // Sort by DOM position
      return newItems.sort((a, b) => {
        const elementA = document.querySelector(`[data-media-id="${a.id}"]`);
        const elementB = document.querySelector(`[data-media-id="${b.id}"]`);

        if (!elementA || !elementB) return 0;

        const position = elementA.compareDocumentPosition(elementB);
        return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      });
    });
  }, []);

  // Unregister a media item (cleanup)
  const unregisterMedia = useCallback((id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Open modal at specific media item
  const openModal = useCallback(
    (mediaId) => {
      const index = mediaItems.findIndex((item) => item.id === mediaId);
      if (index !== -1) {
        setCurrentIndex(index);
        setIsModalOpen(true);
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
      }
    },
    [mediaItems]
  );

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = "unset";
  }, []);

  // Navigate to next media item
  const nextMedia = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  }, [mediaItems.length]);

  // Navigate to previous media item
  const prevMedia = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  }, [mediaItems.length]);

  // Get current media item
  const currentMedia = mediaItems[currentIndex] || null;

  const value = {
    mediaItems,
    isModalOpen,
    currentMedia,
    currentIndex,
    registerMedia,
    unregisterMedia,
    openModal,
    closeModal,
    nextMedia,
    prevMedia,
  };

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMediaModal() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaModal must be used within a MediaProvider");
  }
  return context;
}
