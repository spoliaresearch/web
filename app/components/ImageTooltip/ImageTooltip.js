"use client";

import styles from "./ImageTooltip.module.css";

export default function ImageTooltip({ dimensions, isVisible, mousePosition }) {
  if (!isVisible || !dimensions) return null;

  return (
    <div
      className={styles.tooltip}
      style={{
        left: mousePosition.x + 20,
        top: mousePosition.y - 15,
      }}
    >
      {dimensions}
    </div>
  );
}
