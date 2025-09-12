"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { MediaContext } from "../MediaModal/MediaProvider";
import fileSizes from "../../../lib/file-sizes.json";
import styles from "./Video.module.css";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// COMMENTED OUT: Original file source logic for local FOR_PRODUCTION folder
// Simple utility to get the best available video format
// function getBestVideoFormat(baseName) {
//   // Remove extension if provided
//   const nameWithoutExt = baseName.replace(/\.(mov|mp4|webm|avi)$/i, "");

//   // Check if MP4 version exists (most compatible format)
//   const mp4Path = `/FOR_PRODUCTION/video/${nameWithoutExt}.mp4`;

//   if (fileSizes[mp4Path]) return `${nameWithoutExt}.mp4`;

//   // Fallback: assume MP4
//   return `${nameWithoutExt}.mp4`;
// }

// NEW: CDN storage solution for videos
function getCDNVideoPath(baseName) {
  // Remove extension if provided and clean up the filename
  const nameWithoutExt = baseName.replace(/\.(mov|mp4|webm|avi)$/i, "");
  // Use MP4 format for CDN (assuming all videos are available as MP4)
  return `https://s-vid.b-cdn.net/${nameWithoutExt}.mp4`;
}

export default function Video({ src, ...props }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [mediaId] = useState(() => `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Conditionally use media modal context
  const mediaContext = useContext(MediaContext);
  const hasMediaProvider = !!mediaContext;
  const { registerMedia, unregisterMedia, openModal } = hasMediaProvider ? mediaContext : {};

  // COMMENTED OUT: Original local file logic
  // Get the best format for this video and construct URL
  // const videoSrc = (() => {
  //   if (!src || src.startsWith("http")) {
  //     return src; // Already a full URL
  //   }

  //   // Get the best format and construct optimized path
  //   const bestFormat = getBestVideoFormat(src);
  //   const optimizedSrc = `/FOR_PRODUCTION/video/${src.replace(/\.(mov|mp4|webm|avi)$/i, "")}.${bestFormat
  //     .split(".")
  //     .pop()}`;

  //   return optimizedSrc; // Local optimized video
  // })();

  // NEW: Use CDN storage solution
  const videoSrc = (() => {
    if (!src || src.startsWith("http")) {
      return src; // Already a full URL
    }

    // Use CDN path for videos
    return getCDNVideoPath(src);
  })();

  // Register this video with the modal system (only if MediaProvider is available)
  useEffect(() => {
    if (hasMediaProvider && registerMedia) {
      registerMedia({
        id: mediaId,
        type: "video",
        src: videoSrc,
        alt: props.alt || "Video",
        isLoaded: true, // Videos are always considered loaded
      });

      return () => unregisterMedia(mediaId);
    }
  }, [hasMediaProvider, mediaId, videoSrc, props.alt, registerMedia, unregisterMedia]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedPlaying) {
          // Start playing when video comes into view for the first time
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setHasStartedPlaying(true);
            })
            .catch((error) => {
              // Autoplay might be blocked by browser policy
              console.log("Autoplay was prevented:", error);
            });
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
        rootMargin: "0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [hasStartedPlaying]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoClick = (e) => {
    // Check if we clicked on the play/pause button or its children
    const isButtonClick = e.target.closest(`.${styles.playPauseButton}`);

    if (isButtonClick) {
      // Prevent event bubbling to avoid double toggle
      e.stopPropagation();
      togglePlayPause();
    } else {
      // Toggle play/pause when clicking on video area
      togglePlayPause();
    }
  };

  return (
    <div ref={containerRef} className={styles.videoContainer} data-media-id={mediaId} onClick={handleVideoClick}>
      <video
        ref={videoRef}
        className={styles.video}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster={props.poster}
        muted
        loop
        crossOrigin="anonymous"
        preload="metadata"
        {...props}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        className={styles.playPauseButton}
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <div className={styles.icon}>
          {isPlaying ? (
            // Pause icon (two vertical bars)
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="3" height="12" fill="currentColor" />
              <rect x="10" y="2" width="3" height="12" fill="currentColor" />
            </svg>
          ) : (
            // Play icon (triangle)
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2L13 8L4 14V2Z" fill="currentColor" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
