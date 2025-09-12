import styles from "./Grid.module.css";

export function GridContainer({ children, inner = false }) {
  return <div className={inner ? styles.containerInner : styles.container}>{children}</div>;
}

export function Grid({ children, style, ...props }) {
  return (
    <div className={styles.grid} style={style} {...props}>
      {children}
    </div>
  );
}

export function GridItem({
  start,
  span = 1,
  startTablet,
  spanTablet,
  startMobile,
  spanMobile,
  autoMobile = true,
  dropMobile = false,
  children,
  style,
  ...props
}) {
  // Helper function to create grid-column value
  const createGridColumn = (startVal, spanVal) => {
    return startVal ? `${startVal} / span ${spanVal}` : `span ${spanVal}`;
  };

  // Desktop (default)
  const desktopGridColumn = createGridColumn(start, span);

  // Tablet - only use if explicitly provided, otherwise use desktop
  const tabletGridColumn =
    spanTablet !== undefined || startTablet !== undefined
      ? createGridColumn(startTablet, spanTablet || span)
      : desktopGridColumn;

  // Mobile - use explicit values if provided, otherwise auto-calculate if autoMobile is true
  let mobileGridColumn;
  if (spanMobile !== undefined || startMobile !== undefined) {
    // Explicit mobile values provided
    mobileGridColumn = createGridColumn(startMobile, spanMobile || span);
  } else if (autoMobile) {
    // Auto-calculate mobile: double the span, cap at 12, remove start position
    const autoMobileSpan = Math.min(span * 2, 12);
    mobileGridColumn = createGridColumn(null, autoMobileSpan);
  } else {
    // No auto-mobile, use tablet values
    mobileGridColumn = tabletGridColumn;
  }

  return (
    <div
      className={`${styles.gridItem} ${dropMobile ? styles.dropMobile : ""}`}
      style={{
        // CSS custom properties for responsive grid columns
        "--grid-column-desktop": desktopGridColumn,
        "--grid-column-tablet": tabletGridColumn,
        "--grid-column-mobile": mobileGridColumn,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
