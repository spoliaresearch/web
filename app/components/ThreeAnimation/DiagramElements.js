"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Component to render diagrammatic dotted lines between images
export default function DiagramElements({ positions, imageData, isVisible, animationPhase }) {
  const groupRef = useRef();
  const linesRef = useRef([]);
  const [opacity, setOpacity] = useState(0);

  // Create connections between images that share the same project
  const createConnections = (positions, imageData) => {
    const connections = [];

    if (!imageData || imageData.length === 0) return connections;

    // Group images by project
    const projectGroups = {};
    imageData.forEach((image, index) => {
      const project = image.project || "Uncategorized";
      if (!projectGroups[project]) {
        projectGroups[project] = [];
      }
      projectGroups[project].push(index);
    });

    console.log("📊 Project groups:", projectGroups);

    // For each project group, connect all images within that project
    Object.entries(projectGroups).forEach(([project, indices]) => {
      // Only create connections if there are 2 or more images in the project
      if (indices.length >= 2) {
        // Connect each image to every other image in the same project
        for (let i = 0; i < indices.length; i++) {
          for (let j = i + 1; j < indices.length; j++) {
            const idx1 = indices[i];
            const idx2 = indices[j];
            
            if (positions[idx1] && positions[idx2]) {
              connections.push({
                from: positions[idx1],
                to: positions[idx2],
                project: project,
              });
            }
          }
        }
      }
    });

    console.log(`🔗 Created ${connections.length} project-based connections`);
    return connections;
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
      depthWrite: false, // Do not write to depth buffer (allow transparency)
      depthTest: true, // Respect depth testing for proper 3D rendering
    });
  };

  // Create solid axis line material (aiming for ~1px look)
  const createAxisLineMaterial = () => {
    return new THREE.LineBasicMaterial({
      color: 0x737169,
      linewidth: 1, // Note: most WebGL backends ignore line width > 1
      transparent: true,
      opacity: Math.min(1, Math.max(0, opacity)),
      depthWrite: false,
    });
  };

  // Create line geometry between two points in true 3D space
  const createLineGeometry = (from, to) => {
    const geometry = new THREE.BufferGeometry();
    // Use actual 3D positions of images (including their z-coordinates)
    const points = [
      new THREE.Vector3(from.x, from.y, from.z),
      new THREE.Vector3(to.x, to.y, to.z),
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

    // Skip project connection lines - only render axis lines below
    // const connections = createConnections(positions, imageData);
    // const material = createDottedLineMaterial();

    // connections.forEach(({ from, to, project }) => {
    //   const geometry = createLineGeometry(from, to);
    //   const line = new THREE.Line(geometry, material.clone());
    //   line.computeLineDistances(); // Required for dashed lines
    //   line.userData.project = project; // Store project name for debugging

    //   groupRef.current.add(line);
    //   linesRef.current.push(line);
    // });

    // Add central axes (horizontal and vertical through origin)
    const axisMaterial = createAxisLineMaterial();

    // Choose generous extents to cover the scene
    const extent = 40; // doubled length
    const zAxisDepth = -20; // Far behind all images

    // Horizontal axis (y = 0)
    const hGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-extent, 0, zAxisDepth),
      new THREE.Vector3(extent, 0, zAxisDepth),
    ]);
    const hLine = new THREE.Line(hGeom, axisMaterial.clone());
    hLine.renderOrder = -9999;
    groupRef.current.add(hLine);
    linesRef.current.push(hLine);

    // Vertical axis (x = 0)
    const vGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -extent, zAxisDepth),
      new THREE.Vector3(0, extent, zAxisDepth),
    ]);
    const vLine = new THREE.Line(vGeom, axisMaterial.clone());
    vLine.renderOrder = -9999;
    groupRef.current.add(vLine);
    linesRef.current.push(vLine);

    // Cleanup function
    return () => {
      axisMaterial.dispose();
    };
  }, [positions, imageData, opacity]);

  // Animate opacity based on visibility
  useEffect(() => {
    if (!isVisible) {
      setOpacity(0);
      return;
    }

    // Fade in animation - start immediately when scatter begins
    let startTime = Date.now();
    const duration = 800; // Slightly faster fade in
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

    // Start immediately when scatter occurs
    animate();
  }, [isVisible]);

  // Update material opacity when opacity state changes (for axis lines)
  useEffect(() => {
    linesRef.current.forEach((line) => {
      if (line.material) {
        // Axis lines use full opacity, not 0.3
        line.material.opacity = Math.min(1, Math.max(0, opacity));
        line.material.needsUpdate = true;
      }
    });
  }, [opacity]);

  return <group ref={groupRef} />;
}
