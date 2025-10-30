"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  useCursorOffset,
  CAMERA_CONFIG,
  SCENE_CONFIG,
  ANIMATION_CONFIG,
  animateCameraToTarget,
  animateCameraToStart,
} from "./index";
import DynamicImageGrid from "./DynamicImageGrid";

// Modal component
function ImageModal({ isVisible, imageData, onClose, isFadingIn }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Handle fade-in animation
  useEffect(() => {
    if (isVisible && isFadingIn) {
      // Start with opacity 0, then fade in after a brief delay
      setShouldShow(false);
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 100); // Small delay to ensure smooth transition
      return () => clearTimeout(timer);
    } else if (isVisible && !isFadingIn) {
      // Show immediately if not fading in
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, [isVisible, isFadingIn]);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!isAnimatingOut) {
        setIsAnimatingOut(true);
        // Auto-close after animation completes
        setTimeout(() => {
          onClose();
          setIsAnimatingOut(false);
        }, 300); // Match the CSS transition duration
      }
    };

    // Add scroll listener to window
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, isAnimatingOut, onClose]);

  if (!isVisible || !imageData) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${isAnimatingOut ? 0.9 : 1}) translateY(${isAnimatingOut ? 20 : 0}px)`,
        width: "300px",
        backgroundColor: "transparent",
        borderRadius: "16px",
        padding: "20px",
        zIndex: 1000,
        fontFamily: "inherit",
        // Animation styles
        opacity: isAnimatingOut ? 0 : shouldShow ? 1 : 0,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        transformOrigin: "center",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "none",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "#666",
          padding: "4px",
          lineHeight: 1,
        }}
      >
        ×
      </button>

      {/* Content */}
      <div style={{ paddingRight: "30px" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
          }}
        >
          {imageData.title}
        </h3>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "white",
          }}
        >
          {imageData.description}
        </p>
      </div>
    </div>
  );
}

// Camera controller component to handle camera panning
function CameraController({
  onImageClick,
  onImageClickRef,
  onHideModal,
  onStartModalFadeIn,
  originalCameraPosition,
  onResetCameraRef,
}) {
  const { camera } = useThree();
  const [isPanning, setIsPanning] = useState(false);

  // Handle image click with camera panning
  const handleImageClickWithPan = (imageData) => {
    if (isPanning) return; // Prevent multiple panning operations

    // Hide modal immediately when new selection happens
    if (onHideModal) {
      onHideModal();
    }

    // Start modal fade-in immediately when camera panning starts
    if (onStartModalFadeIn) {
      onStartModalFadeIn(imageData);
    }

    setIsPanning(true);

    // Keep the original camera distance (20) - just pan to center, don't zoom
    const targetDistance = 20; // Same as original camera position z

    console.log("🎯 Panning camera to image:", imageData);

    // Animate camera to the clicked image
    animateCameraToTarget(
      camera,
      imageData.position,
      targetDistance,
      1000, // 1 second duration
      () => {
        console.log("✅ Camera panning complete");
        setIsPanning(false);

        // Modal is already showing and fading in, no need to call onImageClick
      }
    );
  };

  // Reset camera to original position
  const resetCamera = () => {
    if (isPanning) return; // Don't reset while panning

    console.log("🔄 Resetting camera to original position");

    animateCameraToStart(
      camera,
      originalCameraPosition,
      1000, // 1 second duration
      () => {
        console.log("✅ Camera reset complete");
      }
    );
  };

  // Expose the click handler and reset function to parent via refs
  useEffect(() => {
    if (onImageClickRef) {
      onImageClickRef.current = handleImageClickWithPan;
    }
    if (onResetCameraRef) {
      onResetCameraRef.current = resetCamera;
    }
  }, [onImageClick, onImageClickRef, onResetCameraRef, originalCameraPosition]);

  return null; // This component doesn't render anything
}

// Text overlay component with rotating variable
function TextOverlay({ isVisible }) {
  const [currentVariableIndex, setCurrentVariableIndex] = useState(0);

  const variables = [
    "Built Environment",
    "Climate",
    "Manufacturing",
    "Material Science",
    "Behavioral Science",
    "Education",
    "Social Networks",
  ];

  // Rotate through variables every 2 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentVariableIndex((prev) => (prev + 1) % variables.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible, variables.length]);

  if (!isVisible) return null;

  return (
    <></>
    // <div
    //   style={{
    //     position: "absolute",
    //     top: "35%",
    //     left: "50%",
    //     transform: "translate(-50%, -50%)",
    //     textAlign: "center",
    //     color: "#000",
    //     fontSize: "48px",
    //     letterSpacing: "-0.05em",
    //     fontVariationSettings: '"wght" 350, "ital" 0, "SRFF" 0.35',
    //     lineHeight: "1.3",
    //     zIndex: 10,
    //     pointerEvents: "none",
    //   }}
    // >
    //   <div>SPOLIA</div>
    //   <div
    //     style={{ letterSpacing: "0.0em", fontVariationSettings: '"wght" 400, "ital" 0, "SRFF" 0.15', fontSize: "13px" }}
    //   >
    //     R&D Studio for Design and Technology.
    //   </div>

    // </div>
  );
}

// Main component with cursor offset functionality
export default function ThreeAnimation() {
  // State to control when parallax is enabled
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(false);
  // State for modal
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalFadingIn, setIsModalFadingIn] = useState(false);
  // State to track which image is selected
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  // Ref to store the camera controller's click handler
  const imageClickHandlerRef = useRef(null);
  // Ref to store the camera controller's reset function
  const resetCameraRef = useRef(null);
  // Store original camera position
  const originalCameraPosition = useRef(
    new THREE.Vector3(CAMERA_CONFIG.position[0], CAMERA_CONFIG.position[1], CAMERA_CONFIG.position[2])
  );

  const { handleMouseMove, handleCanvasResize, registerMesh, unregisterMesh } = useCursorOffset(
    ANIMATION_CONFIG.cursorOffset,
    isParallaxEnabled,
    selectedImageIndex
  );

  // Handle image click - this will be called by the camera controller
  const handleImageClick = (imageData) => {
    setSelectedImageIndex(imageData.index);
    setModalData(imageData);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalData(null);
    setSelectedImageIndex(null);
    setIsModalFadingIn(false);

    // Reset camera to original position when modal is closed
    if (resetCameraRef.current) {
      resetCameraRef.current();
    }
  };

  // Handle hiding modal immediately (for new selections)
  const handleHideModal = () => {
    setIsModalVisible(false);
    setModalData(null);
    setIsModalFadingIn(false);
  };

  // Handle starting modal fade-in (called when camera panning starts)
  const handleStartModalFadeIn = (imageData) => {
    // First hide the current modal completely to force dismount
    setIsModalVisible(false);
    setModalData(null);
    setIsModalFadingIn(false);

    // Then immediately set up the new modal data and show it
    // Use setTimeout to ensure the dismount happens first
    setTimeout(() => {
      setSelectedImageIndex(imageData.index);
      setModalData(imageData);
      setIsModalVisible(true);
      setIsModalFadingIn(true);
    }, 50); // Small delay to ensure clean dismount
  };

  // No need for the global window approach anymore

  // Debug: Log parallax state changes
  console.log("🎯 Parallax system state:", isParallaxEnabled ? "ENABLED" : "DISABLED");

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{ position: CAMERA_CONFIG.position, fov: CAMERA_CONFIG.fov }}
        style={{ background: SCENE_CONFIG.backgroundColor, borderRadius: "8px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleCanvasResize}
        onMouseLeave={handleCanvasResize}
        gl={{
          outputColorSpace: "srgb",
          toneMapping: THREE.NoToneMapping, // Preserve original image colors
        }}
      >
        {/* Camera controller for panning */}
        <CameraController
          onImageClick={handleImageClick}
          onImageClickRef={imageClickHandlerRef}
          onHideModal={handleHideModal}
          onStartModalFadeIn={handleStartModalFadeIn}
          originalCameraPosition={originalCameraPosition.current}
          onResetCameraRef={resetCameraRef}
        />

        {/* Dynamic image grid */}
        <DynamicImageGrid
          registerMesh={registerMesh}
          unregisterMesh={unregisterMesh}
          onParallaxEnabled={setIsParallaxEnabled}
          onImageClick={imageClickHandlerRef.current}
          selectedImageIndex={selectedImageIndex}
        />
      </Canvas>

      {/* Axis labels positioned at midpoints of each side */}
      <div
        style={{
          position: "absolute",
          left: "0%",
          top: "50%",
          transform: "translate(20px, -50%)",
          fontSize: "12px",
          color: "#fff",
          pointerEvents: "none",
          zIndex: 10,
          opacity: isParallaxEnabled ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        DIGITAL
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "0%",
          transform: "translate(-50%, 20px)",
          fontSize: "12px",
          color: "#fff",
          pointerEvents: "none",
          zIndex: 10,
          opacity: isParallaxEnabled ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        EXPERIENCE
      </div>
      <div
        style={{
          position: "absolute",
          right: "0%",
          top: "50%",
          transform: "translate(-20px, -50%)",
          fontSize: "12px",
          color: "#fff",
          pointerEvents: "none",
          zIndex: 10,
          opacity: isParallaxEnabled ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        PHYSICAL
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "0%",
          transform: "translate(-50%, -20px)",
          fontSize: "12px",
          color: "#fff",
          pointerEvents: "none",
          zIndex: 10,
          opacity: isParallaxEnabled ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        PRODUCT
      </div>

      {/* Text overlay - shows when parallax is enabled (scattered animation complete) */}
      <TextOverlay isVisible={isParallaxEnabled} />

      {/* Image modal */}
      <ImageModal
        key={selectedImageIndex} // Force remount when selection changes
        isVisible={isModalVisible}
        imageData={modalData}
        onClose={handleModalClose}
        isFadingIn={isModalFadingIn}
      />
    </div>
  );
}
