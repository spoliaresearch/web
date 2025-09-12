"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Component to render diagrammatic dotted lines between images
export default function DiagramElements({ positions, isVisible, animationPhase }) {
  const groupRef = useRef();
  const linesRef = useRef([]);
  const [opacity, setOpacity] = useState(0);

  // Create connections between nearby images
  const createConnections = (positions) => {
    const connections = [];
    const maxDistance = 8; // Maximum distance for connections
    const maxConnections = 15; // Limit total connections to avoid clutter

    // Find nearby pairs and create connections
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const pos1 = positions[i];
        const pos2 = positions[j];

        // Calculate distance between positions
        const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));

        // Only connect nearby images and limit total connections
        if (distance < maxDistance && connections.length < maxConnections) {
          connections.push({ from: pos1, to: pos2, distance });
        }
      }
    }

    // Sort by distance and take only the closest connections
    return connections.sort((a, b) => a.distance - b.distance).slice(0, maxConnections);
  };

  // Create dotted line material
  const createDottedLineMaterial = () => {
    return new THREE.LineDashedMaterial({
      color: 0xffffff,
      linewidth: 1,
      scale: 1,
      dashSize: 0.3,
      gapSize: 0.2,
      transparent: true,
      opacity: opacity * 0.3, // Subtle opacity
    });
  };

  // Create line geometry between two points
  const createLineGeometry = (from, to) => {
    const geometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(from.x, from.y, from.z - 0.1), // Slightly behind images
      new THREE.Vector3(to.x, to.y, to.z - 0.1),
    ];
    geometry.setFromPoints(points);
    geometry.computeBoundingBox();
    return geometry;
  };

  // Update lines when positions change
  useEffect(() => {
    if (!groupRef.current || !positions.length) return;

    // Clear existing lines
    linesRef.current.forEach((line) => {
      groupRef.current.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    });
    linesRef.current = [];

    // Create new connections
    const connections = createConnections(positions);
    const material = createDottedLineMaterial();

    connections.forEach(({ from, to }) => {
      const geometry = createLineGeometry(from, to);
      const line = new THREE.Line(geometry, material.clone());
      line.computeLineDistances(); // Required for dashed lines

      groupRef.current.add(line);
      linesRef.current.push(line);
    });

    // Cleanup function
    return () => {
      material.dispose();
    };
  }, [positions, opacity]);

  // Animate opacity based on visibility
  useEffect(() => {
    if (!isVisible) {
      setOpacity(0);
      return;
    }

    // Fade in animation
    let startTime = Date.now();
    const duration = 1000; // 1 second fade in
    const startOpacity = 0;
    const endOpacity = 1;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in animation
      const easeIn = progress * progress;
      const currentOpacity = startOpacity + (endOpacity - startOpacity) * easeIn;

      setOpacity(currentOpacity);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Delay the start slightly to let images settle
    setTimeout(() => {
      animate();
    }, 500);
  }, [isVisible]);

  // Update material opacity when opacity state changes
  useEffect(() => {
    linesRef.current.forEach((line) => {
      if (line.material) {
        line.material.opacity = opacity * 0.3;
        line.material.needsUpdate = true;
      }
    });
  }, [opacity]);

  return <group ref={groupRef} />;
}
