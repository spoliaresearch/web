import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

// Cursor-based offset function for all images
export const useCursorOffset = (maxOffset = 0.16, isEnabled = true, selectedImageIndex = null) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0.5, y: 0.5 }); // Normalized 0-1
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const meshRefs = useRef(new Set());

  // Global mouse move handler - tracks cursor position anywhere on the page
  const handleGlobalMouseMove = useCallback(
    (event) => {
      // If parallax is disabled, don't process mouse movement
      if (!isEnabled) {
        return;
      }

      // Calculate normalized cursor position relative to viewport
      const x = event.clientX / window.innerWidth;
      const y = 1 - event.clientY / window.innerHeight; // Flip Y coordinate

      setCursorPosition({ x, y });
    },
    [isEnabled]
  );

  const handleCanvasResize = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCanvasSize({ width: rect.width, height: rect.height });
  }, []);

  // Register a mesh for cursor offset updates
  const registerMesh = useCallback((meshRef, basePosition, imageIndex = null) => {
    meshRefs.current.add({ ref: meshRef, basePosition, imageIndex });
  }, []);

  // Unregister a mesh
  const unregisterMesh = useCallback((meshRef) => {
    // Find and remove the mesh from the set
    meshRefs.current.forEach((item) => {
      if (item.ref === meshRef) {
        meshRefs.current.delete(item);
      }
    });
  }, []);

  // Calculate offset for a given image position
  const calculateOffset = useCallback(
    (imagePosition) => {
      // If parallax is disabled, return the original position
      if (!isEnabled) {
        return imagePosition;
      }

      // Convert cursor position to offset (-1 to 1 range)
      const cursorX = (cursorPosition.x - 0.5) * 2; // -1 to 1
      const cursorY = (cursorPosition.y - 0.5) * 2; // -1 to 1

      // Calculate parallax strength based on Z position
      // Background images (z = -2): move less (0.3x strength)
      // Middle images (z = 0): move normal (0.6x strength)
      // Foreground images (z = 2): move more (1.0x strength)
      let parallaxStrength;
      if (imagePosition.z <= -2) {
        parallaxStrength = 0.3; // Background - subtle movement
      } else if (imagePosition.z <= 0) {
        parallaxStrength = 0.6; // Middle - moderate movement
      } else {
        parallaxStrength = 1.0; // Foreground - full movement
      }

      // Calculate offset based on cursor distance from center
      // Images move away from cursor (opposite direction)
      const offsetX = -cursorX * maxOffset * parallaxStrength;
      const offsetY = -cursorY * maxOffset * parallaxStrength;

      return {
        x: imagePosition.x + offsetX,
        y: imagePosition.y + offsetY,
        z: imagePosition.z,
      };
    },
    [cursorPosition, maxOffset, isEnabled]
  );

  // Apply cursor offset to all registered meshes
  const updateAllMeshPositions = useCallback(() => {
    // If parallax is disabled, don't update any positions
    if (!isEnabled) {
      return;
    }

    meshRefs.current.forEach(({ ref, basePosition, imageIndex }) => {
      if (ref.current) {
        const offsetPosition = calculateOffset(basePosition);

        // For selected images, don't apply any parallax movement - keep original position
        if (selectedImageIndex !== null && imageIndex === selectedImageIndex) {
          // Keep the original base position - no parallax effect
          ref.current.position.set(basePosition.x, basePosition.y, ref.current.position.z);
        } else {
          // For non-selected images, update all positions including z
          ref.current.position.set(offsetPosition.x, offsetPosition.y, offsetPosition.z);
        }
      }
    });
  }, [calculateOffset, isEnabled, selectedImageIndex]);

  // Set up global mouse move listener
  useEffect(() => {
    if (isEnabled) {
      window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
      };
    }
  }, [isEnabled, handleGlobalMouseMove]);

  // Update positions when cursor moves or when isEnabled changes
  useEffect(() => {
    // Only update positions if parallax is enabled
    if (isEnabled) {
      updateAllMeshPositions();
    }
  }, [cursorPosition, isEnabled, updateAllMeshPositions]);

  return {
    calculateOffset,
    handleMouseMove: handleGlobalMouseMove, // Keep the same name for compatibility
    handleCanvasResize,
    registerMesh,
    unregisterMesh,
    isEnabled, // Expose the current enabled state
    cursorPosition, // Expose cursor position for text positioning
  };
};

// Animation function for scaling images from 0 to 1
export const useScaleAnimation = (meshRef, isLoaded, duration = 800) => {
  const [scale, setScale] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !meshRef.current) return;

    // Start scale animation
    const startTime = Date.now();
    const startScale = 0;
    const endScale = 1;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentScale = startScale + (endScale - startScale) * easeOut;

      setScale(currentScale);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, meshRef, duration]);

  // Apply scale to mesh
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale);
    }
  }, [scale, meshRef]);

  return scale;
};

// Reusable function for lazy loading images
export const useLazyImageLoader = (imagePath, meshRef) => {
  const [currentTexture, setCurrentTexture] = useState(null);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const loadImage = useCallback(() => {
    console.log(`Starting to load image: ${imagePath}`);

    // Load low resolution image first (128px wide, similar to Image component)
    const lowResTexture = new THREE.TextureLoader().load(
      `/_next/image?url=${encodeURIComponent(imagePath)}&w=16&q=100`,
      (loadedTexture) => {
        console.log(`✅ Low-res image loaded for ${imagePath}`);

        // Enable proper texture filtering for smooth, high-quality images
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTexture.generateMipmaps = true;
        loadedTexture.colorSpace = THREE.SRGBColorSpace; // Proper color space

        // Get the actual image dimensions
        const image = loadedTexture.image;
        const aspectRatio = image.width / image.height;

        // Update the plane geometry to match image aspect ratio with max 100px constraint
        let width = 3.6; // Base width
        let height = width / aspectRatio;

        // Scale down if either dimension exceeds 100px equivalent
        const maxDimension = (100 / 100) * 1.75; // 100px in world units (assuming 100px = 1.75 units)
        if (width > maxDimension || height > maxDimension) {
          const scale = maxDimension / Math.max(width, height);
          width *= scale;
          height *= scale;
        }

        if (meshRef.current) {
          meshRef.current.geometry.dispose();
          meshRef.current.geometry = new THREE.PlaneGeometry(width, height);
          meshRef.current.material.map = loadedTexture;
          meshRef.current.material.needsUpdate = true;
        }

        setCurrentTexture(loadedTexture);
        console.log(`🔄 Starting high-res load for ${imagePath}...`);

        // Load high resolution image in background (640px wide - standard Next.js size)
        const highResTexture = new THREE.TextureLoader().load(
          `/_next/image?url=${encodeURIComponent(imagePath)}&w=640&q=75`,
          (highResLoadedTexture) => {
            console.log(`✅ High-res image loaded for ${imagePath}, transitioning...`);
            setIsTransitioning(true);

            // Enable proper texture filtering for smooth, high-quality images
            highResLoadedTexture.magFilter = THREE.LinearFilter;
            highResLoadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
            highResLoadedTexture.generateMipmaps = true;
            highResLoadedTexture.colorSpace = THREE.SRGBColorSpace; // Proper color space

            // Get the actual image dimensions
            const highResImage = highResLoadedTexture.image;
            const highResAspectRatio = highResImage.width / highResImage.height;

            // Update the plane geometry to match image aspect ratio with max 100px constraint
            let highResWidth = 3.6; // Base width
            let highResHeight = highResWidth / highResAspectRatio;

            // Scale down if either dimension exceeds 100px equivalent
            const maxDimension = (100 / 100) * 1.75; // 100px in world units (assuming 100px = 1.75 units)
            if (highResWidth > maxDimension || highResHeight > maxDimension) {
              const scale = maxDimension / Math.max(highResWidth, highResHeight);
              highResWidth *= scale;
              highResHeight *= scale;
            }

            if (meshRef.current) {
              meshRef.current.geometry.dispose();
              meshRef.current.geometry = new THREE.PlaneGeometry(highResWidth, highResHeight);
              meshRef.current.material.map = highResLoadedTexture;
              meshRef.current.material.needsUpdate = true;
            }

            // Dispose of low-res texture
            if (lowResTexture) {
              lowResTexture.dispose();
            }

            setCurrentTexture(highResLoadedTexture);
            setIsHighResLoaded(true);
            setIsTransitioning(false);
            setIsFullyLoaded(true); // Mark as fully loaded for animation
            console.log(`🎉 Transition complete for ${imagePath}!`);
          },
          (progress) => {
            console.log(`📊 High-res loading progress for ${imagePath}:`, progress);
          },
          (error) => {
            console.error(`❌ Error loading high-res image for ${imagePath}:`, error);
          }
        );

        // Cleanup function for high-res texture
        return () => {
          if (highResTexture) {
            highResTexture.dispose();
          }
        };
      },
      (progress) => {
        console.log(`📊 Low-res loading progress for ${imagePath}:`, progress);
      },
      (error) => {
        console.error(`❌ Error loading low-res image for ${imagePath}:`, error);
      }
    );

    // Cleanup function for low-res texture
    return () => {
      if (lowResTexture) {
        lowResTexture.dispose();
      }
    };
  }, [imagePath, meshRef]);

  useEffect(() => {
    const cleanup = loadImage();
    return cleanup;
  }, [loadImage]);

  // Debug: Log state changes
  useEffect(() => {
    console.log(`🔄 State update for ${imagePath}:`, {
      hasTexture: currentTexture !== null,
      isHighResLoaded,
      isTransitioning,
      isFullyLoaded,
    });
  }, [currentTexture, isHighResLoaded, isTransitioning, isFullyLoaded, imagePath]);

  return { currentTexture, isHighResLoaded, isTransitioning, isFullyLoaded };
};

// Calculate S-shaped layout positions for images
export const calculateCircularLayout = (totalImages, radius = 4, spacing = 2.5) => {
  return Array.from({ length: totalImages }, (_, index) => {
    // Create a proper S-curve
    const t = index / (totalImages - 1); // Normalize to 0-1

    // Horizontal position (left to right)
    const x = (t - 0.5) * 8; // Spread from -4 to 4

    // S-curve for Y position using cubic function
    // This creates a true S: starts high, curves down through middle, ends high
    const normalizedT = (t - 0.5) * 2; // Scale to -1 to 1
    const y = normalizedT * 3 - normalizedT * normalizedT * normalizedT * 2; // Cubic S-curve

    return { x, y, z: 0 };
  });
};

// Calculate scattered layout positions for images (second animation phase)
export const calculateScatteredLayout = (totalImages, bounds = { x: [-10, 10], y: [-10, 10] }) => {
  return Array.from({ length: totalImages }, (_, index) => {
    // Create a more organic, scattered pattern
    // Use index to create some predictability while maintaining randomness
    const seed = index * 113.456; // Simple seed for pseudo-random but consistent positioning

    // Generate pseudo-random positions within bounds (2x more spaced apart)
    const x = bounds.x[0] - 10 + (Math.sin(seed) * 0.5 + 0.5) * (bounds.x[1] - bounds.x[0] * 2);
    const y = bounds.y[0] - 3 + (Math.cos(seed * 0.7) * 0.5 + 0.5) * (bounds.y[1] - bounds.y[0] * 2);

    // Add Z-depth variation for parallax layering
    // Create 3 depth layers: background (-2), middle (0), foreground (2)
    const zSeed = index * 321.456;
    const zRandom = Math.sin(zSeed) * 0.5 + 0.5; // 0 to 1
    let z;
    if (zRandom < 0.3) {
      z = -2; // Background layer (30% of images)
    } else if (zRandom < 0.7) {
      z = 0; // Middle layer (40% of images)
    } else {
      z = 2; // Foreground layer (30% of images)
    }

    return { x, y, z };
  });
};

// Camera reset utility function
export const animateCameraToStart = (camera, startPosition, duration = 1000, onComplete) => {
  const startTime = Date.now();
  const currentPosition = camera.position.clone();

  // Easing function for smooth animation (ease-out cubic)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    // Interpolate camera position back to start
    const currentX = currentPosition.x + (startPosition.x - currentPosition.x) * easedProgress;
    const currentY = currentPosition.y + (startPosition.y - currentPosition.y) * easedProgress;
    const currentZ = currentPosition.z + (startPosition.z - currentPosition.z) * easedProgress;

    camera.position.set(currentX, currentY, currentZ);

    // Continue animation or complete
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final position is exact
      camera.position.copy(startPosition);

      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start the animation
  animate();
};

// Camera panning utility function
export const animateCameraToTarget = (camera, targetPosition, targetDistance, duration = 1000, onComplete) => {
  const startTime = Date.now();
  const startPosition = camera.position.clone();
  const startDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));

  // Calculate target camera position - only move X and Y, keep Z at original distance
  const targetCameraPosition = new THREE.Vector3(targetPosition.x, targetPosition.y, startPosition.z);

  // Easing function for smooth animation (ease-out cubic)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    // Interpolate camera position - only X and Y
    const currentX = startPosition.x + (targetCameraPosition.x - startPosition.x) * easedProgress;
    const currentY = startPosition.y + (targetCameraPosition.y - startPosition.y) * easedProgress;

    camera.position.set(currentX, currentY, startPosition.z); // Keep Z constant
    // Don't use lookAt - keep camera looking straight ahead

    // Continue animation or complete
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final position is exact
      camera.position.set(targetCameraPosition.x, targetCameraPosition.y, startPosition.z);

      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start the animation
  animate();
};

// Smooth animation function using Three.js built-in animation
export const animateToPositions = (meshRefs, startPositions, endPositions, duration = 1500, onComplete) => {
  const startTime = Date.now();
  const totalMeshes = meshRefs.length;
  let completedMeshes = 0;

  // Easing function for smooth animation (ease-out cubic)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    // Animate each mesh
    meshRefs.forEach((meshRef, index) => {
      if (meshRef.current) {
        const startPos = startPositions[index];
        const endPos = endPositions[index];

        // Interpolate between start and end positions
        const currentX = startPos.x + (endPos.x - startPos.x) * easedProgress;
        const currentY = startPos.y + (endPos.y - startPos.y) * easedProgress;
        const currentZ = startPos.z + (endPos.z - startPos.z) * easedProgress;

        // Interpolate scale from 1.0 to 1.33
        const startScale = 1.0;
        const endScale = 3;
        const currentScale = startScale + (endScale - startScale) * easedProgress;

        // Update mesh position and scale
        meshRef.current.position.set(currentX, currentY, currentZ);
        meshRef.current.scale.setScalar(currentScale);
      }
    });

    // Continue animation or complete
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final positions and scales are exact
      meshRefs.forEach((meshRef, index) => {
        if (meshRef.current) {
          const endPos = endPositions[index];
          meshRef.current.position.set(endPos.x, endPos.y, endPos.z);
          meshRef.current.scale.setScalar(3.0); // Final scale
        }
      });

      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start the animation
  animate();
};
