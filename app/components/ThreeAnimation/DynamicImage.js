"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLazyImageLoader, useScaleAnimation } from "./utils";
import { ANIMATION_CONFIG, IMAGE_DATA } from "./constants";

// Individual image component
export default function DynamicImage({
  imagePath,
  position,
  finalZPosition,
  index,
  registerMesh,
  unregisterMesh,
  onMeshReady,
  onImageClick,
  onImageLoaded,
  isParallaxEnabled,
  cursorPosition,
}) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [baseScale, setBaseScale] = useState(1.0); // Start with initial scale, will be updated to 3.0 after scattered animation
  const [currentZ, setCurrentZ] = useState(position.z); // Track current z-position for smooth animation

  // Update currentZ when position changes (e.g., during scattered animation)
  useEffect(() => {
    setCurrentZ(position.z);
  }, [position.z]);

  // No selection/focus state

  // Load image with lazy loading, applying optional per-image scale from metadata
  const metadata = IMAGE_DATA && IMAGE_DATA[index] ? IMAGE_DATA[index] : null;
  const scaleFactor = metadata?.scale ?? metadata?.size ?? 1;
  const { currentTexture, isHighResLoaded, isTransitioning, isFullyLoaded } = useLazyImageLoader(imagePath, meshRef, scaleFactor);

  // Notify parent when image is fully loaded
  useEffect(() => {
    if (isFullyLoaded && onImageLoaded) {
      onImageLoaded(index);
    }
  }, [isFullyLoaded, index, onImageLoaded]);

  // Determine hide-by-default behavior from metadata
  const shouldHideByDefault = !!(metadata && metadata.hide);
  const fadeAnimRef = useRef(null);
  const isFadingRef = useRef(false);

  // Apply scale animation when low-res image loads (much faster)
  useScaleAnimation(
    meshRef,
    currentTexture !== null,
    ANIMATION_CONFIG.imageScaleDuration + index * ANIMATION_CONFIG.imageScaleDelay
  );

  // Update base scale when scattered animation completes (scale reaches 3.0)
  useEffect(() => {
    if (meshRef.current && meshRef.current.scale.x >= 2.9) {
      setBaseScale(3.0); // Set base scale after scattered animation completes
    }
  }, [meshRef.current?.scale?.x]);

  // Register mesh for cursor offset updates and notify parent when ready
  useEffect(() => {
    if (meshRef.current) {
      registerMesh(meshRef, position, index);

      // Notify parent component that this mesh is ready for animation
      if (onMeshReady) {
        onMeshReady(meshRef);
      }

      // Cleanup function
      return () => unregisterMesh(meshRef);
    }
  }, [registerMesh, unregisterMesh, onMeshReady, index]); // Added index dependency

  // Floating animation - subtle drifting movement
  const timeOffset = useRef(index * 0.5); // Unique offset for each image
  const floatAmplitude = useRef({
    x: 0.08 + (Math.sin(index * 1.234) * 0.04), // 0.04 to 0.12
    y: 0.08 + (Math.cos(index * 2.345) * 0.04), // 0.04 to 0.12
    z: 0.15 + (Math.sin(index * 3.456) * 0.08), // 0.07 to 0.23
  });
  const floatSpeed = useRef({
    x: 0.3 + (Math.sin(index * 4.567) * 0.15), // 0.15 to 0.45
    y: 0.25 + (Math.cos(index * 5.678) * 0.1), // 0.15 to 0.35
    z: 0.2 + (Math.sin(index * 6.789) * 0.1), // 0.1 to 0.3
  });
  const basePosition = useRef(null); // Store the base scattered position

  // Store base position when parallax is first enabled
  useEffect(() => {
    if (isParallaxEnabled && !basePosition.current) {
      basePosition.current = { ...position };
    }
  }, [isParallaxEnabled, position]);

  useFrame(({ clock }) => {
    if (!meshRef.current || !isParallaxEnabled || !basePosition.current) return; // Only after parallax is enabled

    const time = clock.getElapsedTime() + timeOffset.current;

    // Calculate floating offsets using sine waves with different frequencies
    const floatX = Math.sin(time * floatSpeed.current.x) * floatAmplitude.current.x;
    const floatY = Math.cos(time * floatSpeed.current.y) * floatAmplitude.current.y;
    const floatZ = Math.sin(time * floatSpeed.current.z) * floatAmplitude.current.z;

    // Calculate parallax offset based on cursor position
    const cursorX = (cursorPosition.x - 0.5) * 2; // -1 to 1
    const cursorY = (cursorPosition.y - 0.5) * 2; // -1 to 1

    // Calculate parallax strength based on Z position
    let parallaxStrength;
    if (basePosition.current.z <= -2) {
      parallaxStrength = 0.3; // Background - subtle movement
    } else if (basePosition.current.z <= 0) {
      parallaxStrength = 0.6; // Middle - moderate movement
    } else {
      parallaxStrength = 1.0; // Foreground - full movement
    }

    const maxOffset = ANIMATION_CONFIG.cursorOffset;
    const parallaxX = -cursorX * maxOffset * parallaxStrength;
    const parallaxY = -cursorY * maxOffset * parallaxStrength;

    // Combine base position + parallax offset + floating offset
    meshRef.current.position.set(
      basePosition.current.x + parallaxX + floatX,
      basePosition.current.y + parallaxY + floatY,
      basePosition.current.z + floatZ
    );
  });

  // Material visibility based on metadata.hide and hover state
  useEffect(() => {
    if (!meshRef.current || !meshRef.current.material) return;
    const material = meshRef.current.material;

    if (shouldHideByDefault) {
      // If a fade animation is in progress, don't override material until it completes
      if (fadeAnimRef.current || isFadingRef.current) {
        return;
      }
      // Hidden by default: show solid fill when not hovered; show image on hover
      if (isHovered && currentTexture) {
        material.map = currentTexture;
        material.color.copy(new THREE.Color("#FFFFFF"));
      } else {
        material.map = null;
        material.color.copy(new THREE.Color("#373325"));
      }
      material.transparent = false;
      material.opacity = 1.0;
      material.needsUpdate = true;
      return;
    }

    // Default behavior: ensure neutral color with texture when available
    if (currentTexture) {
      material.map = currentTexture;
      material.color.copy(new THREE.Color("#FFFFFF"));
      material.transparent = false;
      material.opacity = 1.0;
      material.needsUpdate = true;
    }
  }, [shouldHideByDefault, isHovered, currentTexture, finalZPosition]);

  // Smooth fade-in/out for hidden images on hover (avoid abrupt reveal)
  useEffect(() => {
    if (!shouldHideByDefault) return;
    if (!meshRef.current || !meshRef.current.material) return;

    const material = meshRef.current.material;
    const duration = 800; // ms

    // Cancel any in-flight animation
    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    if (isHovered && currentTexture) {
      // Prepare for fade-in
      isFadingRef.current = true;
      material.map = currentTexture;
      material.color.copy(new THREE.Color("#FFFFFF"));
      material.transparent = true;
      const startOpacity = 0;
      const endOpacity = 1;
      const startTime = Date.now();

      const animate = () => {
        if (!meshRef.current || !meshRef.current.material) return;
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
        const eased = easeOutCubic(t);
        material.opacity = startOpacity + (endOpacity - startOpacity) * eased;
        material.needsUpdate = true;
        if (t < 1) {
          fadeAnimRef.current = requestAnimationFrame(animate);
        } else {
          material.opacity = 1;
          material.transparent = false;
          material.needsUpdate = true;
          fadeAnimRef.current = null;
          isFadingRef.current = false;
        }
      };
      // Start from fully transparent for image
      material.opacity = 0;
      animate();
    } else if (!isHovered) {
      // Fade out to solid fill when hover ends
      isFadingRef.current = true;
      const startOpacity = material.opacity ?? 1;
      const endOpacity = 0;
      material.transparent = true;
      const startTime = Date.now();

      const animateOut = () => {
        if (!meshRef.current || !meshRef.current.material) return;
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
        const eased = easeOutCubic(t);
        material.opacity = startOpacity + (endOpacity - startOpacity) * eased;
        material.needsUpdate = true;
        if (t < 1) {
          fadeAnimRef.current = requestAnimationFrame(animateOut);
        } else {
          material.map = null;
          material.color.copy(new THREE.Color("#373325"));
          material.opacity = 1;
          material.transparent = false;
          material.needsUpdate = true;
          fadeAnimRef.current = null;
          isFadingRef.current = false;
        }
      };
      animateOut();
    }
  }, [isHovered, shouldHideByDefault, currentTexture]);

  // Handle hover scale changes - only when base scale is 3.0 (after animations complete)
  useEffect(() => {
    if (!meshRef.current || baseScale < 3.0) return; // Don't interfere with initial animations

    const targetScale = isHovered ? baseScale * 1.125 : baseScale;
    const currentScale = meshRef.current.scale.x;

    if (Math.abs(currentScale - targetScale) > 0.01) {
      // Smooth interpolation with guaranteed completion
      const startScale = currentScale;
      const startTime = Date.now();
      const duration = 700; // Slower hover animation (2x)

      const animate = () => {
        if (!meshRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);

        const newScale = startScale + (targetScale - startScale) * easedProgress;
        meshRef.current.scale.setScalar(newScale);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isHovered, baseScale]);

  // No z-position focus animation

  // Handle hover events and cursor changes
  const handlePointerEnter = () => {
    setIsHovered(true);
    if (baseScale >= 3.0) {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    document.body.style.cursor = "default";
  };

  // Handle click events
  const handleClick = () => {
    if (baseScale >= 3.0 && onImageClick) {
      const meta = IMAGE_DATA && IMAGE_DATA[index] ? IMAGE_DATA[index] : null;
      onImageClick({
        imagePath,
        index,
        title: meta?.name || meta?.project || `Image ${index + 1}`,
        description: meta?.description || "",
        project: meta?.project || null,
        position: {
          x: position.x,
          y: position.y,
          z: position.z,
        },
      });
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <planeGeometry args={[2.25, 2.25]} /> {/* Initial size - will be updated by texture loader */}
      <meshBasicMaterial toneMapped={false} />
    </mesh>
  );
}
