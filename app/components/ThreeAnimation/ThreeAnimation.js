"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorOffset, CAMERA_CONFIG, SCENE_CONFIG, ANIMATION_CONFIG } from "./index";
import DynamicImageGrid from "./DynamicImageGrid";

// Modal component
function ImageModal({ isVisible, imageData, onClose }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

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
        bottom: "20px",
        right: "20px",
        width: "300px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        padding: "20px",
        zIndex: 1000,
        fontFamily: "inherit",
        // Animation styles
        opacity: isAnimatingOut ? 0 : 1,
        transform: `scale(${isAnimatingOut ? 0.9 : 1}) translateY(${isAnimatingOut ? 20 : 0}px)`,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        transformOrigin: "bottom right",
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
            color: "#333",
          }}
        >
          {imageData.title}
        </h3>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            lineHeight: "1.4",
            color: "#666",
          }}
        >
          {imageData.description}
        </p>
      </div>
    </div>
  );
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

  const { handleMouseMove, handleCanvasResize, registerMesh, unregisterMesh } = useCursorOffset(
    ANIMATION_CONFIG.cursorOffset,
    isParallaxEnabled
  );

  // Handle image click
  const handleImageClick = (imageData) => {
    setModalData(imageData);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalData(null);
  };

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
        />
      </Canvas>

      {/* Text overlay - shows when parallax is enabled (scattered animation complete) */}
      <TextOverlay isVisible={isParallaxEnabled} />

      {/* Image modal */}
      <ImageModal isVisible={isModalVisible} imageData={modalData} onClose={handleModalClose} />
    </div>
  );
}
