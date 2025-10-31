"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorOffset, CAMERA_CONFIG, SCENE_CONFIG, ANIMATION_CONFIG } from "./index";
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

  // Close on scroll beyond threshold with soft downward animation
  useEffect(() => {
    if (!isVisible) return;

    const startY = window.scrollY || window.pageYOffset || 0;
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(currentY - startY) > 20 && !isAnimatingOut) {
        setIsAnimatingOut(true);
        setTimeout(() => {
          onClose();
          setIsAnimatingOut(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, isAnimatingOut, onClose]);

  if (!isVisible || !imageData) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "320px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "6px",
        padding: "16px 20px",
        zIndex: 1000,
        fontFamily: "inherit",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        // Animation styles
        opacity: isAnimatingOut ? 0 : shouldShow ? 1 : 0,
        transform: `translateY(${isAnimatingOut ? 20 : 0}px)`,
        transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
  
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
          color: "inherit",
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
            color: "inherit",
          }}
        >
          {imageData.title}
        </h3>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "inherit",
          }}
        >
          {imageData.description}
        </p>
      </div>
    </div>
  );
}

// CameraController removed - using floating images instead

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
  // State for bottom-right card
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { handleMouseMove, handleCanvasResize, registerMesh, unregisterMesh, cursorPosition } = useCursorOffset(
    ANIMATION_CONFIG.cursorOffset,
    isParallaxEnabled,
    null
  );

  // Handle image click - opens the bottom-right card, replacing if open
  const handleImageClick = (imageData) => {
    if (isModalVisible) {
      // Hide current then show new after a short delay
      setIsModalVisible(false);
      setModalData(null);
      setTimeout(() => {
        setModalData(imageData);
        setIsModalVisible(true);
      }, 60);
    } else {
      setModalData(imageData);
      setIsModalVisible(true);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalData(null);
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
        {/* Dynamic image grid */}
        <DynamicImageGrid
          registerMesh={registerMesh}
          unregisterMesh={unregisterMesh}
          onParallaxEnabled={setIsParallaxEnabled}
          onImageClick={handleImageClick}
          isParallaxEnabled={isParallaxEnabled}
          cursorPosition={cursorPosition}
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

      {/* Bottom-right card */}
      <ImageModal
        isVisible={isModalVisible}
        imageData={modalData}
        onClose={handleModalClose}
        isFadingIn={true}
      />
    </div>
  );
}
