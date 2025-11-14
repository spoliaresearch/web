"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { MediaContext } from "../MediaModal/MediaProvider";
import { ImageTooltip } from "../ImageTooltip";
import fileSizes from "../../../lib/file-sizes.json";
import styles from "./Video.module.css";
import tooltipStyles from "../ImageTooltip/ImageTooltip.module.css";

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

// Generate poster image from CDN (BunnyCDN supports thumbnail generation via URL parameters)
function getCDNPosterPath(baseName) {
  // Remove extension if provided and clean up the filename
  const nameWithoutExt = baseName.replace(/\.(mov|mp4|webm|avi)$/i, "");
  // BunnyCDN thumbnail format: add ?thumbnail=1 or use a dedicated thumbnail service
  // If you have thumbnail images in your CDN, use pattern like: https://s-img.b-cdn.net/${nameWithoutExt}-thumb.jpg
  // For now, we'll use a URL parameter approach (if BunnyCDN supports it) or return null
  // You can also manually create thumbnails and store them as: ${nameWithoutExt}-poster.jpg
  return `https://s-img.b-cdn.net/${nameWithoutExt}-poster.jpg`;
}

// Get file size for videos from file-sizes.json
function getVideoFileSize(baseName) {
  // Remove extension if provided and clean up the filename
  let nameWithoutExt = baseName.replace(/\.(mov|mp4|webm|avi)$/i, "");

  // Remove leading slash if present
  nameWithoutExt = nameWithoutExt.replace(/^\//, "");

  // Look up file size using just the basename (no path, no extension)
  if (fileSizes[nameWithoutExt]) {
    return fileSizes[nameWithoutExt];
  }

  // Fallback if no file size found
  return "Unknown";
}

export default function Video({ src, verticalCrop = 0, rotate = 0, scale = 1, hideUi = false, appendix = false, priority = false, ...props }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [mediaId] = useState(() => `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoFileSize, setVideoFileSize] = useState(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!appendix); // Appendix videos don't load until clicked
  const [shouldLoadPoster, setShouldLoadPoster] = useState(!appendix); // Appendix posters lazy-load when scrolled into view

  // Detect mobile devices to disable autoplay
  const [isMobile, setIsMobile] = useState(false);

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

  // Generate poster path for all videos (or use provided poster)
  // All videos can benefit from posters showing while video loads
  const posterSrc = props.poster || getCDNPosterPath(src);

  // Detect mobile devices on mount
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;

      // Consider it mobile if it's a mobile device, has touch, or has a small screen
      setIsMobile(isMobileDevice || (isTouchDevice && isSmallScreen));
    };

    checkMobile();

    // Re-check on resize in case of orientation change
    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Get file size for appendix videos
  useEffect(() => {
    if (appendix && src) {
      const fileSize = getVideoFileSize(src);
      setVideoFileSize(fileSize);
    }
  }, [appendix, src]);

  // Ensure video stays paused in appendix mode
  useEffect(() => {
    if (appendix && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setHasStartedPlaying(false);
    }
  }, [appendix]);

  // Lazy-load posters for appendix videos (only when scrolled into view)
  useEffect(() => {
    if (!appendix) return; // Regular videos load posters immediately

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoadPoster) {
          // Load poster when appendix video scrolls into view
          setShouldLoadPoster(true);
        }
      },
      {
        threshold: 0.1, // Load poster when 10% visible (early loading)
        rootMargin: "100px", // Start loading 100px before entering viewport
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [appendix, shouldLoadPoster]);

  // IntersectionObserver for autoplay AND auto-pause
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // If appendix mode, don't autoplay (but still observe for pause)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (appendix) {
          // Appendix videos: just ensure they stay paused
          if (!entry.isIntersecting && isPlaying) {
            video.pause();
            setIsPlaying(false);
          }
          return;
        }

        // Regular videos: autoplay when in view, pause when out of view
        if (entry.isIntersecting && !isPlaying && (!isMobile || hideUi)) {
          // Start/resume playing when video comes into view
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
        } else if (!entry.isIntersecting && isPlaying) {
          // Auto-pause when video exits viewport
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the video is visible
        rootMargin: "0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [hasStartedPlaying, isMobile, appendix, hideUi, isPlaying]);

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

  // Handle click to open modal for appendix videos
  const handleAppendixClick = () => {
    // Load video src when appendix video is clicked (lazy load)
    if (!shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
    if (hasMediaProvider && openModal) {
      openModal(mediaId);
    }
  };

  // Handle mouse events for tooltip
  const handleMouseEnter = (e) => {
    if (appendix) {
      setShowTooltip(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (appendix) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    if (appendix) {
      setShowTooltip(false);
    }
  };

  const handleVideoClick = (e) => {
    // If appendix mode, open modal instead
    if (appendix) {
      handleAppendixClick();
      return;
    }

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
    <div 
      ref={containerRef} 
      className={`${styles.videoContainer} ${appendix && hasMediaProvider ? tooltipStyles.tooltipContainer : ""}`}
      data-media-id={mediaId} 
      onClick={appendix ? handleVideoClick : (hideUi ? undefined : handleVideoClick)}
      onMouseEnter={appendix ? handleMouseEnter : undefined}
      onMouseMove={appendix ? handleMouseMove : undefined}
      onMouseLeave={appendix ? handleMouseLeave : undefined}
      role={appendix ? "button" : undefined}
      tabIndex={appendix ? 0 : undefined}
      onKeyDown={appendix ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleAppendixClick();
        }
      } : undefined}
      style={verticalCrop > 0 ? { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      } : undefined}
    >
      <video
        ref={videoRef}
        className={styles.video}
        style={verticalCrop > 0 || rotate || scale !== 1 ? {
          ...(verticalCrop > 0 ? {
            objectFit: 'cover',
            height: 'auto',
            marginTop: `${-verticalCrop * 100}%`,
            marginBottom: `${-verticalCrop * 100}%`
          } : {}),
          ...((rotate || scale !== 1) ? {
            transform: [
              rotate ? `rotate(${rotate}deg)` : null,
              scale !== 1 ? `scale(${scale})` : null,
            ].filter(Boolean).join(' '),
            transformOrigin: 'center center'
          } : {})
        } : undefined}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          // Log CDN errors for debugging
          console.error(`Video load error for ${videoSrc}:`, e.target.error);
        }}
        poster={shouldLoadPoster ? posterSrc : undefined}
        muted
        loop
        playsInline
        webkit-playsinline="true"
        crossOrigin="anonymous"
        preload={priority ? "auto" : "none"}
        {...props}
      >
        {/* Only load video src when needed (not appendix, or appendix that was clicked) */}
        {shouldLoadVideo && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      {!hideUi && !appendix && (
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
      )}

      {/* Tooltip for appendix videos */}
      {appendix && hasMediaProvider && (
        <ImageTooltip dimensions={videoFileSize} isVisible={showTooltip} mousePosition={mousePosition} />
      )}
    </div>
  );
}
