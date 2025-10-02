"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { MediaContext } from "../MediaModal/MediaProvider";
import { ImageTooltip } from "../ImageTooltip";
import fileSizes from "../../../lib/file-sizes.json";
import styles from "./Image.module.css";
import tooltipStyles from "../ImageTooltip/ImageTooltip.module.css";

// COMMENTED OUT: Original file source logic for local FOR_PRODUCTION folder
// Simple utility to get the best available image format
// function getBestImageFormat(baseName) {
//   // Remove extension if provided
//   const nameWithoutExt = baseName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

//   // Check if WebP version exists, otherwise use JPEG
//   const webpPath = `/FOR_PRODUCTION/${nameWithoutExt}.webp`;
//   const jpegPath = `/FOR_PRODUCTION/${nameWithoutExt}.jpg`;

//   if (fileSizes[webpPath]) return `${nameWithoutExt}.webp`;
//   if (fileSizes[jpegPath]) return `${nameWithoutExt}.jpg`;

//   // Fallback: if no optimized versions found, assume JPEG
//   return `${nameWithoutExt}.jpg`;
// }

// Get file size for the selected format
// function getImageFileSize(baseName) {
//   const nameWithoutExt = baseName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
//   const selectedFormat = getBestImageFormat(baseName);
//   const selectedPath = selectedFormat.includes("/FOR_PRODUCTION/")
//     ? selectedFormat
//     : `/FOR_PRODUCTION/${selectedFormat}`;

//   return fileSizes[selectedPath] || fileSizes[baseName] || "Unknown";
// }

// NEW: CDN storage solution
function getCDNImagePath(baseName, size = "full") {
  // Remove extension if provided and clean up the filename
  const nameWithoutExt = baseName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  // If you have different sizes on your CDN, you could use:
  // const sizeMap = {
  //   thumb: '_thumb',
  //   small: '_small',
  //   full: ''
  // };
  // return `https://s-img.b-cdn.net/${nameWithoutExt}${sizeMap[size]}.webp`;

  // For now, use the same image for all sizes
  return `https://s-img.b-cdn.net/${nameWithoutExt}.webp`;
}

// Get file size for images from file-sizes.json
function getImageFileSize(baseName) {
  // Remove extension if provided and clean up the filename
  let nameWithoutExt = baseName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  // Remove leading slash if present
  nameWithoutExt = nameWithoutExt.replace(/^\//, "");

  // Debug logging
  console.log("🔍 getImageFileSize debug:");
  console.log("  Input baseName:", baseName);
  console.log("  nameWithoutExt (after cleanup):", nameWithoutExt);
  console.log("  Available keys in fileSizes:", Object.keys(fileSizes).length, "total");
  console.log("  Looking for:", nameWithoutExt);
  console.log("  Found:", fileSizes[nameWithoutExt]);

  // Look up file size using just the basename (no path, no extension)
  // The file-sizes.json now contains entries like "Beacons_Screen": "524KB"
  if (fileSizes[nameWithoutExt]) {
    return fileSizes[nameWithoutExt];
  }

  // Fallback if no file size found
  return "Unknown";
}

export default function CustomImage({ src, alt, className, priority = false, rootMargin = "50px" }) {
  const wrapperRef = useRef(null);
  const observerRef = useRef(null);
  const canvasRef = useRef(null);
  const fullImageRef = useRef(null);
  const smallImageRef = useRef(null);
  const animationRef = useRef(null);

  const [showFullImage, setShowFullImage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [shouldLoadFullImage, setShouldLoadFullImage] = useState(priority);
  const [isInView, setIsInView] = useState(priority);
  const [aspectRatio, setAspectRatio] = useState(66.67);
  const [mediaId] = useState(() => `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageFileSize, setImageFileSize] = useState(null);

  // Conditionally use media modal context
  const mediaContext = useContext(MediaContext);
  const hasMediaProvider = !!mediaContext;
  const { registerMedia, unregisterMedia, openModal } = hasMediaProvider ? mediaContext : {};

  // COMMENTED OUT: Original local file logic
  // Get the best format for this image
  // const bestFormat = getBestImageFormat(src);
  // const optimizedSrc = `/FOR_PRODUCTION/photo${src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "")}.${bestFormat
  //   .split(".")
  //   .pop()}`;

  // NEW: Use CDN storage solution
  const cdnSrc = getCDNImagePath(src);

  // Generate image URLs using CDN
  // Option 1: Direct CDN (fastest, no Next.js processing)
  const smallImageSrc = cdnSrc; // Use CDN directly for small image
  const fullImageSrc = cdnSrc; // Use CDN directly for full image

  // Option 2: Next.js optimization (slower but more control)
  // const smallImageSrc = `/_next/image?url=${encodeURIComponent(cdnSrc)}&w=64&q=20`;
  // const fullImageSrc = `/_next/image?url=${encodeURIComponent(cdnSrc)}&w=1920&q=75`;

  // Register this image with the modal system (only if MediaProvider is available)
  useEffect(() => {
    if (hasMediaProvider && registerMedia) {
      registerMedia({
        id: mediaId,
        type: "image",
        src: fullImageSrc,
        alt: alt || "",
        isLoaded: showFullImage,
      });

      return () => unregisterMedia(mediaId);
    }
  }, [hasMediaProvider, mediaId, fullImageSrc, alt, showFullImage, registerMedia, unregisterMedia]);

  // Handle click to open modal (only if MediaProvider is available)
  const handleImageClick = () => {
    if (hasMediaProvider && openModal) {
      openModal(mediaId);
    }
  };

  // Handle mouse events for tooltip
  const handleMouseEnter = (e) => {
    setShowTooltip(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Single intersection observer - KISS approach
  useEffect(() => {
    if (priority) {
      setShouldLoadFullImage(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;

          // Load image when approaching (early loading)
          if (ratio > 0.01 && !shouldLoadFullImage) {
            setShouldLoadFullImage(true);
          }

          // Trigger animation when 30% visible
          if (ratio >= 0.3 && !isInView) {
            setIsInView(true);
          }
        });
      },
      {
        rootMargin: "100px", // Balanced approach
        threshold: [0.01, 0.3], // Multiple thresholds for different actions
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [priority, shouldLoadFullImage, isInView]);

  // Handle full image load - only animate if in view
  const handleFullImageLoad = () => {
    const startTime = Date.now();

    // Get file size from pre-generated lookup using the selected format
    const fileSize = getImageFileSize(src);
    setImageFileSize(fileSize);

    // Check load time to determine if cached
    requestAnimationFrame(() => {
      const loadTime = Date.now() - startTime;

      if (loadTime < 5) {
        // Likely cached, skip animation
        setShowFullImage(true);
      } else if (isInView) {
        // Only animate if in view
        startAnimation();
      }
      // If not in view, wait for intersection observer to trigger
    });
  };

  // Trigger animation when image becomes visible (if loaded)
  useEffect(() => {
    if (
      isInView &&
      shouldLoadFullImage &&
      fullImageRef.current &&
      fullImageRef.current.complete &&
      !showFullImage &&
      !isAnimating
    ) {
      startAnimation();
    }
  }, [isInView, shouldLoadFullImage, showFullImage, isAnimating]);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationProgress(0);

    const duration = 800; // 0.8 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);

      // Apply ease-in function (quadratic) - spends more time in first half
      const easedProgress = linearProgress * linearProgress;

      setAnimationProgress(easedProgress);

      if (linearProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setShowFullImage(true);
      }
    };

    animate();
  };

  // Canvas animation effect
  useEffect(() => {
    if (!isAnimating || !canvasRef.current || !fullImageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = fullImageRef.current;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pixelation effect
      const pixelSize = Math.max(1, Math.floor((1 - animationProgress) * 15));

      ctx.imageSmoothingEnabled = false;

      // Draw at small size then scale up for pixelation
      const smallWidth = Math.max(pixelSize, canvas.width * animationProgress);
      const smallHeight = Math.max(pixelSize, canvas.height * animationProgress);

      ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
      ctx.drawImage(canvas, 0, 0, smallWidth, smallHeight, 0, 0, canvas.width, canvas.height);
    };

    draw();
  }, [isAnimating, animationProgress]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${hasMediaProvider ? tooltipStyles.tooltipContainer : ""} ${
        priority ? tooltipStyles.priority : ""
      } ${className || ""}`}
      style={{ paddingBottom: `${aspectRatio}%` }}
      data-custom-image="true"
      data-media-id={mediaId}
      onClick={priority || !hasMediaProvider ? undefined : handleImageClick}
      onMouseEnter={priority || !hasMediaProvider ? undefined : handleMouseEnter}
      onMouseMove={priority || !hasMediaProvider ? undefined : handleMouseMove}
      onMouseLeave={priority || !hasMediaProvider ? undefined : handleMouseLeave}
      role={priority || !hasMediaProvider ? undefined : "button"}
      tabIndex={priority || !hasMediaProvider ? undefined : 0}
      onKeyDown={
        priority || !hasMediaProvider
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleImageClick();
              }
            }
      }
    >
      {/* Low-res image - always visible initially */}
      <img
        ref={smallImageRef}
        src={smallImageSrc}
        alt={alt}
        className={`${styles.smallImage} ${isAnimating || showFullImage ? styles.fadeOut : styles.visible}`}
        loading="eager" // Load immediately
        onLoad={(e) => {
          // Set aspect ratio from small image
          const img = e.target;
          if (img.naturalWidth && img.naturalHeight) {
            setAspectRatio((img.naturalHeight / img.naturalWidth) * 100);
          }
        }}
      />

      {/* Canvas for animation */}
      {isAnimating && <canvas ref={canvasRef} className={`${styles.canvas} ${styles.visible}`} />}

      {/* Full resolution image */}
      {shouldLoadFullImage && (
        <img
          ref={fullImageRef}
          src={fullImageSrc}
          alt={alt}
          onLoad={handleFullImageLoad}
          className={styles.hiddenImage}
          loading={priority ? "eager" : "lazy"}
        />
      )}

      {/* Final full image */}
      {showFullImage && (
        <img src={fullImageSrc} alt={alt} className={`${styles.finalImage} ${styles.visible}`} loading="eager" />
      )}

      {/* Tooltip */}
      {!priority && hasMediaProvider && (
        <ImageTooltip dimensions={imageFileSize} isVisible={showTooltip} mousePosition={mousePosition} />
      )}
    </div>
  );
}
