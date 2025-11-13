"use client";

import { useState, useEffect, useRef } from "react";
import { IMAGE_PATHS, IMAGE_DATA, LAYOUT_CONFIG, ANIMATION_PHASES, PHASE_TIMING } from "./constants";
import DynamicImage from "./DynamicImage";
import DiagramElements from "./DiagramElements";
import { calculateCircularLayout, calculateScatteredLayout, animateToPositions } from "./utils";

// Dynamic image grid component
export default function DynamicImageGrid({
  registerMesh,
  unregisterMesh,
  onParallaxEnabled,
  onImageClick,
  isParallaxEnabled,
  cursorPosition,
  onScatterStarted,
  onAllImagesLoaded,
}) {
  // State to track current animation phase
  const [animationPhase, setAnimationPhase] = useState(ANIMATION_PHASES.CIRCULAR);
  // State to track when scatter animation has started (for showing lines/text immediately)
  const [isScattering, setIsScattering] = useState(false);
  // State to track which images have loaded
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Ref to track all mesh references for animation
  const meshRefs = useRef([]);

  // Create layouts for both phases
  const totalImages = IMAGE_PATHS.length;
  const { radius, spacing } = LAYOUT_CONFIG;

  // Generate positions for each phase
  const circularPositions = calculateCircularLayout(totalImages, radius, spacing);
  const scatteredPositions = calculateScatteredLayout(totalImages, { x: [-7, 7], y: [-7, 7] }, IMAGE_DATA);

  // Pre-calculate final z-positions for opacity layering (use scattered positions)
  const finalZPositions = scatteredPositions.map((pos) => pos.z);

  // Get current positions based on phase
  const currentPositions = animationPhase === ANIMATION_PHASES.CIRCULAR ? circularPositions : scatteredPositions;

  // Function to register a mesh for animation
  const registerMeshForAnimation = (meshRef, index) => {
    meshRefs.current[index] = meshRef;
  };

  // Function to handle when an image is fully loaded
  const handleImageLoaded = (index) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  // Check if all images are loaded and notify parent
  useEffect(() => {
    if (loadedImages.size === totalImages && loadedImages.size > 0) {
      console.log('🎉 All images fully loaded!');
      if (onAllImagesLoaded) {
        onAllImagesLoaded();
      }
    }
  }, [loadedImages, totalImages, onAllImagesLoaded]);

  // Function to trigger the second animation phase with smooth movement
  const triggerScatteredAnimation = () => {
    console.log("🎬 Triggering scattered animation phase with smooth movement");
    
    // Mark that scatter animation has started - this will show lines/text immediately
    setIsScattering(true);
    
    // Notify parent that scatter has started
    if (onScatterStarted) {
      onScatterStarted(true);
    }

    // Filter out any undefined mesh refs
    const validMeshRefs = meshRefs.current.filter((ref) => ref && ref.current);
    console.log(`🎯 Animating ${validMeshRefs.length} meshes to scattered positions`);

    // Start smooth animation from circular to scattered positions
    animateToPositions(
      validMeshRefs,
      circularPositions,
      scatteredPositions,
      1500, // 1.5 second duration
      () => {
        console.log("✅ Animation to scattered positions complete!");
        setAnimationPhase(ANIMATION_PHASES.SCATTERED);

        // Enable parallax effect now that animation is complete
        if (onParallaxEnabled) {
          console.log("🎯 Enabling parallax effect");
          onParallaxEnabled(true);
        }
      }
    );
  };

  // Effect to handle scroll-triggered animation
  useEffect(() => {
    console.log(`🔄 Animation phase changed to: ${animationPhase}`);

    if (animationPhase === ANIMATION_PHASES.CIRCULAR) {
      // Wait for user scroll to trigger scattered animation
      console.log("⏳ Waiting for user scroll to trigger scattered animation...");

      const handleScroll = () => {
        console.log("📜 User scrolled! Triggering scattered animation...");
        triggerScatteredAnimation();
        // Remove scroll listener after triggering
        window.removeEventListener("scroll", handleScroll);
      };

      // Add scroll listener
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Cleanup function to remove listener
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [animationPhase]);

  // Debug: Log the current state
  console.log("🎭 Current animation state:", {
    phase: animationPhase,
    totalImages,
    circleRadius: radius,
    spacing,
    positions: currentPositions.length,
    registeredMeshes: meshRefs.current.filter((ref) => ref && ref.current).length,
  });

  return (
    <>
      {IMAGE_PATHS.map((imagePath, index) => (
        <DynamicImage
          key={imagePath}
          imagePath={imagePath}
          position={currentPositions[index]}
          finalZPosition={finalZPositions[index]}
          index={index}
          registerMesh={registerMesh}
          unregisterMesh={unregisterMesh}
          onMeshReady={(meshRef) => registerMeshForAnimation(meshRef, index)}
          onImageClick={onImageClick}
          onImageLoaded={handleImageLoaded}
          isParallaxEnabled={isParallaxEnabled}
          cursorPosition={cursorPosition}
        />
      ))}

      {/* Diagram elements - axis lines only */}
      <DiagramElements
        positions={scatteredPositions}
        imageData={IMAGE_DATA}
        isVisible={isScattering || animationPhase === ANIMATION_PHASES.SCATTERED}
        animationPhase={animationPhase}
      />
    </>
  );
}
