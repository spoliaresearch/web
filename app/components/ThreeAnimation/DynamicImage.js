"use client";

import { useRef, useEffect, useState } from "react";
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
}) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [baseScale, setBaseScale] = useState(1.0); // Start with initial scale, will be updated to 3.0 after scattered animation

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
      registerMesh(meshRef, position);

      // Notify parent component that this mesh is ready for animation
      if (onMeshReady) {
        onMeshReady(meshRef);
      }

      // Cleanup function
      return () => unregisterMesh(meshRef);
    }
  }, [registerMesh, unregisterMesh, onMeshReady]); // ✅ Removed position dependency

  // Set material opacity based on final z-position (depth) for layering effect - applied immediately when texture loads
  useEffect(() => {
    if (meshRef.current && meshRef.current.material && currentTexture) {
      const material = meshRef.current.material;

      // Set opacity based on final z-position to create depth layering from the start
      // Background layer (z = -2): 85% opacity
      // Middle layer (z = 0): 95% opacity
      // Foreground layer (z = 2): 100% opacity
      let opacity;
      if (finalZPosition <= -2) {
        opacity = 0.85; // Background - slight transparency
      } else if (finalZPosition <= 0) {
        opacity = 0.95; // Middle - minimal transparency
      } else {
        opacity = 1.0; // Foreground - fully opaque
      }

      material.transparent = opacity < 1.0;
      material.opacity = opacity;
      material.needsUpdate = true;
    }
  }, [finalZPosition, currentTexture]); // Apply as soon as texture is available using final z-position

  // Handle hover scale changes - only when base scale is 3.0 (after animations complete)
  useEffect(() => {
    if (!meshRef.current || baseScale < 3.0) return; // Don't interfere with initial animations

    const targetScale = isHovered ? baseScale * 1.25 : baseScale;
    const currentScale = meshRef.current.scale.x;

    if (Math.abs(currentScale - targetScale) > 0.01) {
      // Simple spring animation
      const animate = () => {
        if (!meshRef.current) return;

        const current = meshRef.current.scale.x;
        const diff = targetScale - current;
        const newScale = current + diff * 0.15; // Smooth interpolation

        meshRef.current.scale.setScalar(newScale);

        if (Math.abs(diff) > 0.01) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isHovered, baseScale]);

  // Handle hover events and cursor changes
  const handlePointerEnter = () => {
    setIsHovered(true);
    // Change cursor to pointer when hovering over images that can zoom (after animations complete)
    if (baseScale >= 3.0) {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Reset cursor
    document.body.style.cursor = "default";
  };

  // Handle click events
  const handleClick = () => {
    // Only handle clicks after animations complete and when image can zoom
    if (baseScale >= 3.0 && onImageClick) {
      onImageClick({
        imagePath,
        index,
        title: `Image ${index + 1}`,
        description: `This is a description for image ${
          index + 1
        }. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
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
