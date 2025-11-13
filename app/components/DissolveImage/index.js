import React, { useState, useEffect, useRef } from "react";
import SvgLoader from "../Icon";

export const DissolveImage = ({ name, fill, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const currentScale = useRef(0);
  const filterRef = useRef();
  const isInteractive = true;

  // Handle SSR and Safari detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      setIsSafari(isSafariBrowser);
    }
  }, []);

  // Handle animation
  useEffect(() => {
    if (!isMounted || isSafari || !isInteractive || !filterRef.current) return;

    const displacementMap = filterRef.current.querySelector("feDisplacementMap");
    const maxScale = 500;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = (timestamp - startTimeRef.current) / 500;

      if (isHovered) {
        currentScale.current = Math.min(progress * maxScale, maxScale);
      } else {
        const reverseProgress = 1 - Math.min(progress, 1);
        currentScale.current = maxScale * reverseProgress;
      }

      displacementMap.setAttribute("scale", currentScale.current.toString());

      if ((isHovered && currentScale.current < maxScale) || (!isHovered && currentScale.current > 0)) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (isHovered || currentScale.current > 0) {
      startTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovered, isInteractive, isMounted, isSafari]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!isSafari && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter
              id={`dissolve-filter-${name}`}
              ref={filterRef}
              x="-200%"
              y="-200%"
              width="400%"
              height="400%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.02"
                numOctaves="1"
                result="bigNoise"
                seed={Math.floor(50)}
              />
              <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
                <feFuncR type="linear" slope="3" intercept="-1" />
                <feFuncG type="linear" slope="3" intercept="-1" />
              </feComponentTransfer>
              <feTurbulence type="fractalNoise" baseFrequency="3" numOctaves=".1" result="fineNoise" />
              <feMerge result="mergedNoise">
                <feMergeNode in="bigNoiseAdjusted" />
                <feMergeNode in="fineNoise" />
              </feMerge>
              <feDisplacementMap
                in="SourceGraphic"
                in2="mergedNoise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <div
        onMouseEnter={() => !isSafari && isInteractive && setIsHovered(true)}
        onMouseLeave={() => !isSafari && isInteractive && setIsHovered(false)}
        style={{ display: "inline-block" }}
      >
        <SvgLoader
          name={name}
          fill={fill}
          width={width}
          height={height}
          style={{ filter: isSafari ? "none" : `url(#dissolve-filter-${name})` }}
        />
      </div>
    </>
  );
};

// Add a default export as well for flexibility
export default DissolveImage;
