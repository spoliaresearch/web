"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ComputeMetric.module.css";

export default function ComputeMetric() {
  const [powerKW, setPowerKW] = useState(0);
  const [tooltipText, setTooltipText] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);
  const frameTimeSamplesRef = useRef([]);
  const lastFrameTimeRef = useRef(performance.now());

  useEffect(() => {
    // Collect frame time samples continuously
    let rafId;
    const measureFrame = () => {
      const now = performance.now();
      const frameTime = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;
      
      // Keep last 60 samples (roughly 1 second at 60fps)
      frameTimeSamplesRef.current.push(frameTime);
      if (frameTimeSamplesRef.current.length > 60) {
        frameTimeSamplesRef.current.shift();
      }
      
      rafId = requestAnimationFrame(measureFrame);
    };
    
    rafId = requestAnimationFrame(measureFrame);

    // Calculate and update power every second
    const calculatePower = () => {
      try {
        // Calculate average frame time from samples
        let avgFrameTime = 16.67; // Default to 60fps
        if (frameTimeSamplesRef.current.length > 0) {
          const sum = frameTimeSamplesRef.current.reduce((a, b) => a + b, 0);
          avgFrameTime = sum / frameTimeSamplesRef.current.length;
        }
        
        // Target 60fps = 16.67ms per frame
        // If taking longer, more power is being used
        const targetFrameTime = 16.67;
        const rawFrameLoad = avgFrameTime / targetFrameTime;
        // Normalize to 0-1 scale (cap at 2x target = 30fps minimum)
        const frameLoad = Math.min(1, rawFrameLoad / 2);
        
        // Get memory usage if available (Chrome/Edge)
        let memoryLoad = 0;
        if (performance.memory) {
          const usedMB = performance.memory.usedJSHeapSize / 1048576;
          const totalMB = performance.memory.totalJSHeapSize / 1048576;
          memoryLoad = totalMB > 0 ? Math.min(1, usedMB / totalMB) : 0;
        }
        
        // Get DOM complexity as proxy for processing
        const domNodes = document.getElementsByTagName("*").length;
        const domLoad = Math.min(1, domNodes / 1000); // Normalize to 0-1
        
        // Combine factors: frame rendering (GPU/CPU), memory usage, DOM complexity
        // Weight: 60% frame load, 25% memory, 15% DOM
        const processingLoad = (frameLoad * 0.6) + (memoryLoad * 0.25) + (domLoad * 0.15);
        
        // Base power consumption for a laptop/desktop running a web page
        // Idle: ~10-20W, Active browsing: ~30-50W, Heavy processing: ~60-100W
        // We'll use a range of 20W (idle) to 80W (heavy load)
        const basePowerW = 20; // Minimum power (idle)
        const maxPowerW = 80; // Maximum power (heavy processing)
        const currentPowerW = basePowerW + (processingLoad * (maxPowerW - basePowerW));
        
        // Convert to kW
        const powerKWValue = currentPowerW / 1000;
        setPowerKW(powerKWValue);
        
        // Calculate espresso equivalent for tooltip
        // Average espresso machine: ~1000W = 1kW
        // If page uses X kW, that's equivalent to X fraction of an espresso machine
        // For display: show as "Equivalent to X.X espressos"
        const espressoEquivalent = powerKWValue; // Direct: 0.05 kW = 0.05 espressos
        
        // Format: show 1 decimal place, or 2 if less than 1
        const espressoText = espressoEquivalent < 1
          ? `${Math.round(espressoEquivalent * 100) / 100}`
          : `${Math.round(espressoEquivalent * 10) / 10}`;
        
        setTooltipText(`Equivalent to ${espressoText} espressos`);
      } catch (e) {
        setPowerKW(0);
        setTooltipText("");
      }
    };

    // Update every second
    const interval = setInterval(calculatePower, 1000);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearInterval(interval);
    };
  }, []);

  // Position tooltip similar to TimezoneClock
  useEffect(() => {
    if (!showPopover) return;

    const updatePosition = () => {
      const containerEl = containerRef.current;
      const popEl = popoverRef.current;
      if (!containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const viewport = { width: window.innerWidth, height: window.innerHeight };

      let x = containerRect.right;
      let y = containerRect.bottom + 8;

      if (popEl) {
        const popoverRect = popEl.getBoundingClientRect();
        if (x + popoverRect.width > viewport.width - 16) {
          x = viewport.width - popoverRect.width - 16;
        }
        if (x < 16) x = 16;

        if (y + popoverRect.height > viewport.height - 16) {
          y = containerRect.top - popoverRect.height - 8;
        }
      } else {
        x = Math.min(Math.max(x, 16), viewport.width - 16);
      }

      setPopoverPos({ x, y });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showPopover]);

  const onEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPopover(true);
    setTimeout(() => setIsHovered(true), 10);
  };

  const onLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      setShowPopover(false);
    }, 300);
  };

  return (
    <div 
      ref={containerRef}
      style={{ textAlign: "right", position: "relative", cursor: "help" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div>
        {powerKW.toFixed(3)} kW
      </div>
      {showPopover && tooltipText && (
        <div
          ref={popoverRef}
          className={styles.popover}
          style={{
            position: "fixed",
            left: popoverPos.x,
            top: popoverPos.y,
            zIndex: 1000,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0px)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
          role="tooltip"
          aria-live="polite"
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
}

