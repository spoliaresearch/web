"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useLazyImageLoader, useScaleAnimation } from "./utils";
import { ANIMATION_CONFIG } from "./constants";

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
  selectedImageIndex,
  isCameraPanning,
}) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [baseScale, setBaseScale] = useState(1.0); // Start with initial scale, will be updated to 3.0 after scattered animation
  const [currentZ, setCurrentZ] = useState(position.z); // Track current z-position for smooth animation
  const [isAnimatingToFront, setIsAnimatingToFront] = useState(false); // Track if animating to front
  const isSelected = selectedImageIndex === index;

  // Update currentZ when position changes (e.g., during scattered animation)
  useEffect(() => {
    setCurrentZ(position.z);
  }, [position.z]);

  // Reset animation state when selection changes
  useEffect(() => {
    if (!isSelected) {
      setIsAnimatingToFront(false);
    }
  }, [isSelected]);

  // Load image with lazy loading
  const { currentTexture, isHighResLoaded, isTransitioning, isFullyLoaded } = useLazyImageLoader(imagePath, meshRef);

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

  // Apply non-transparent tint to non-selected images when a selection is active
  useEffect(() => {
    if (meshRef.current && meshRef.current.material && currentTexture) {
      const material = meshRef.current.material;

      const isFocusActive = selectedImageIndex !== null && selectedImageIndex !== undefined;

      // Desired overlay color and blend amount (0..1)
      const overlayColor = new THREE.Color("#817E72");
      const white = new THREE.Color("#FFFFFF");
      const fillAmount = 0.85; // ~45% towards overlay color

      if (isFocusActive && !isSelected) {
        // Multiply texture by a tinted color (no transparency bleed)
        const tinted = white.clone().lerp(overlayColor, fillAmount);
        material.color.copy(tinted);
        material.transparent = false;
        material.opacity = 1.0;
      } else {
        // Reset to neutral color when not dimmed
        material.color.copy(white);
        material.transparent = false;
        material.opacity = 1.0;
      }

      material.needsUpdate = true;
    }
  }, [finalZPosition, currentTexture, selectedImageIndex, isSelected]);

  // Handle hover scale changes - only when base scale is 3.0 (after animations complete)
  useEffect(() => {
    if (!meshRef.current || baseScale < 3.0) return; // Don't interfere with initial animations
    if (isCameraPanning) return; // Don't apply hover effects during camera panning

    // If selected, maintain hovered scale; otherwise use normal hover logic
    const targetScale = isSelected ? baseScale * 1.25 : isHovered ? baseScale * 1.25 : baseScale;
    const currentScale = meshRef.current.scale.x;

    if (Math.abs(currentScale - targetScale) > 0.01) {
      // Smooth interpolation with guaranteed completion
      const startScale = currentScale;
      const startTime = Date.now();
      const duration = 200; // 200ms duration for smooth but quick animation

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
  }, [isHovered, baseScale, isSelected, isCameraPanning]);

  // Handle z-position changes when animating to front or when selection changes
  useEffect(() => {
    if (!meshRef.current || baseScale < 3.0) return; // Don't interfere with initial animations

    // Bring selected image to a consistent focus depth regardless of original z
    const FOCUS_Z = 8; // Close to camera (camera z is 20)
    const targetZ = (isAnimatingToFront || isSelected) ? FOCUS_Z : position.z;
    const startZ = currentZ;
    const startTime = Date.now();
    const duration = 700; // 0.7 seconds

    if (Math.abs(currentZ - targetZ) > 0.01) {
      // Time-based animation for z-position (0.7 seconds)
      const animate = () => {
        if (!meshRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);

        const newZ = startZ + (targetZ - startZ) * easedProgress;

        setCurrentZ(newZ);
        meshRef.current.position.z = newZ;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isAnimatingToFront, isSelected, position.z, baseScale, currentZ]);

  // Handle hover events and cursor changes
  const handlePointerEnter = () => {
    if (!isSelected && !isCameraPanning) {
      // Only update hover state if not selected and not panning
      setIsHovered(true);
    }
    // Change cursor to pointer when hovering over images that can zoom (after animations complete)
    if (baseScale >= 3.0 && !isCameraPanning) {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerLeave = () => {
    if (!isSelected && !isCameraPanning) {
      // Only update hover state if not selected and not panning
      setIsHovered(false);
    }
    // Reset cursor
    if (!isCameraPanning) {
      document.body.style.cursor = "default";
    }
  };

  // Handle click events
  const handleClick = () => {
    // Only handle clicks after animations complete and when image can zoom
    if (baseScale >= 3.0 && onImageClick) {
      // Start z-position animation immediately on click
      setIsAnimatingToFront(true);

      // Calculate the current scale (base scale + hover effect)
      const currentScale = isHovered ? baseScale * 1.25 : baseScale;

      onImageClick({
        imagePath,
        index,
        title: `Image ${index + 1}`,
        description: `This is a description for image ${
          index + 1
        }. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        position: {
          x: position.x,
          y: position.y,
          z: position.z,
        },
        scale: currentScale,
        baseScale: baseScale,
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
