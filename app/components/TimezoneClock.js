import { useState, useEffect, useRef } from "react";
import styles from "./TimezoneClock.module.css";

export default function TimezoneClock() {
  const [nyTime, setNyTime] = useState("");
  const [berlinTime, setBerlinTime] = useState("");
  const [hoverTarget, setHoverTarget] = useState(null); // 'et' | 'cet' | null
  const [showPopover, setShowPopover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });

  const etRef = useRef(null);
  const cetRef = useRef(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const formatTime = (date, timeZone) => {
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }).format(date);
    };

    const updateClocks = () => {
      const now = new Date();
      setNyTime(formatTime(now, "America/New_York"));
      setBerlinTime(formatTime(now, "Europe/Berlin"));
    };

    updateClocks();
    const now = new Date();
    const msToNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    let intervalId;
    const timeoutId = setTimeout(() => {
      updateClocks();
      intervalId = setInterval(updateClocks, 60000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!showPopover) return;

    const updatePosition = () => {
      const targetEl = hoverTarget === "et" ? etRef.current : cetRef.current;
      const popEl = popoverRef.current;
      if (!targetEl) return;

      const linkRect = targetEl.getBoundingClientRect();
      const viewport = { width: window.innerWidth, height: window.innerHeight };

      let x = linkRect.left;
      let y = linkRect.bottom + 8;

      if (popEl) {
        const previewRect = popEl.getBoundingClientRect();
        if (x + previewRect.width > viewport.width - 16) {
          x = viewport.width - previewRect.width - 16;
        }
        if (x < 16) x = 16;

        if (y + previewRect.height > viewport.height - 16) {
          y = linkRect.top - previewRect.height - 8;
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
  }, [showPopover, hoverTarget]);

  const onEnter = (target) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverTarget(target);
    setShowPopover(true);
    setTimeout(() => setIsHovered(true), 10);
  };

  const onLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      setShowPopover(false);
      setHoverTarget(null);
    }, 300);
  };

  return (
    <div>
      <span
        ref={etRef}
        onMouseEnter={() => onEnter("et")}
        onMouseLeave={onLeave}
        style={{ cursor: "help" }}
      >
        {nyTime} ET
      </span>
      <span>{" / "}</span>
      <span
        ref={cetRef}
        onMouseEnter={() => onEnter("cet")}
        onMouseLeave={onLeave}
        style={{ cursor: "help" }}
      >
        {berlinTime} CET
      </span>

      {showPopover && (
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
          {hoverTarget === "et" ? "Brooklyn, NY" : "Lausanne, Switzerland"}
        </div>
      )}
    </div>
  );
}
