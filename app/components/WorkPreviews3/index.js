"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, GridItem } from "../Grid";
import styles from "./WorkPreviews.module.css";
import Divider from "../Divider";
const workItems = [
  {
    id: 1,
    title: "PIXELFRAME",
    slug: "pixelframe",
    description: "Digital Material Passports ",
    longDescription:
      "A comprehensive digital system for tracking and documenting material lifecycles, enabling transparent supply chains and sustainable resource management through blockchain technology and IoT sensors.",
    year: "2025",
    image: "/three_images/05.jpg",
    client: "MIT Digital Structures",
    category: "Product",
    categoryNumber: 1,
    citation: "2.1.2",
  },
  {
    id: 2,
    title: "BEACONS",
    slug: "beacons",
    description: "Signals from the Deep Sea",
    longDescription:
      "An immersive installation of sculptural beacons that transform deep-sea environmental data into sound and light, creating an embodied connection to Earth's largest and most unexplored ecosystem.",
    year: "2025",
    // Use two specific images for the Beacons preview - using optimized versions
    images: ["/FOR_PRODUCTION/photo/Spolia_Beam_DEMO2025_3.jpg", "/FOR_PRODUCTION/photo/Spolia_Beam_DEMO2025_2.jpg"],
    client: "New Museum",
    category: "Experience",
    categoryNumber: 2,
    citation: "2.2.1",
  },
  {
    id: 3,
    title: "SYMLINK",
    slug: "symlink",
    description: "Ecological Intelligence Systems",
    longDescription:
      "A platform that bridges digital and ecological systems, using machine learning to analyze environmental patterns and provide actionable insights for sustainable urban development and conservation efforts.",
    year: "2023",
    images: ["/FOR_PRODUCTION/symlink_1.jpg", "/FOR_PRODUCTION/symlink_3.jpg"],
    client: "SPACE10",
    category: "Experience",
    categoryNumber: 2,
    citation: "2.1.1",
  },
];

export default function WorkPreviews({ showAll = false }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleItemClick = (index, slug) => {
    // If showAll is true, navigate to the work page
    if (showAll) {
      router.push(`/work/${slug}`);
      return;
    }

    // Prevent clicks during transition
    if (isTransitioning) return;

    if (activeIndex === index) {
      // Close current item
      setActiveIndex(null);
    } else if (activeIndex !== null) {
      // Close current item first, then open new one
      setIsTransitioning(true);
      setActiveIndex(null);

      // Wait for close animation to complete, then open new item
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 800); // Half of the CSS transition duration (1s)
    } else {
      // No item is open, just open the clicked one
      setActiveIndex(index);
    }
  };

  const handleExpandedItemClick = (slug) => {
    router.push(`/work/${slug}`);
  };

  const handleExploreClick = (e, slug) => {
    e.stopPropagation();
    router.push(`/work/${slug}`);
  };

  return (
    <div className={`${styles.container} ${showAll ? styles.containerShowAll : ""}`}>
      {workItems.map((item, index) => (
        <div key={item.id} className={styles.projectContainer}>
          <div className={`${styles.accordionItem} ${index === activeIndex || showAll ? styles.active : ""}`}>
            {/* TOP ROW - Accordion Control */}
            <div className={styles.topRow}>
              {/* Desktop/Tablet accordion behavior */}
              <div className={styles.desktopClick} onClick={() => handleItemClick(index, item.slug)}>
                <Grid>
                  <GridItem start={0} span={1} dropMobile={true}>
                    <span className="fs-sm">{item.citation}</span>
                  </GridItem>
                  <GridItem start={2} span={3} autoMobile={false} spanMobile={3} startMobile={0}>
                    <h3 className={styles.title}>
                      <span className="fs-sm">{item.title}</span>
                    </h3>
                  </GridItem>
                  <GridItem start={5} span={4} dropMobile={true}>
                    <p className={styles.title}>
                      <span className="fs-sm">{item.description}</span>
                    </p>
                  </GridItem>
                  <GridItem start={9} span={2} dropMobile={true}>
                    <span className="fs-sm">{item.client}</span>
                  </GridItem>
                  <GridItem start={11} span={1} dropMobile={true}>
                    <span className="fs-sm"> {item.category}</span>
                  </GridItem>
                  <GridItem start={12} span={1} autoMobile={false} spanMobile={2} startMobile={11}>
                    <span style={{ textAlign: "right" }} className="fs-sm">
                      {item.year}
                    </span>
                  </GridItem>
                </Grid>
              </div>

              {/* Mobile direct navigation */}
              <div className={styles.mobileClick} onClick={() => router.push(`/work/${item.slug}`)}>
                <Grid>
                  <GridItem start={0} span={12}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 className={styles.title}>
                        <span className="fs-sm">{item.title}</span>
                      </h3>
                      <span className="fs-sm">{item.year}</span>
                    </div>
                  </GridItem>
                </Grid>
              </div>
            </div>

            {/* BOTTOM ROW - Revealed Content */}
            <div
              className={`${styles.bottomRow} ${index === activeIndex || showAll ? styles.active : ""}`}
              onClick={() => handleExpandedItemClick(item.slug)}
            >
              <Grid>
                <GridItem start={2} span={3}>
                  <p className={` fs-sm t-r ${styles.longDescription}`}>{item.longDescription}</p>
                  <br />
                  {!showAll && (
                    <button
                      className={`${styles.exploreButton} fs-sm`}
                      onClick={(e) => handleExploreClick(e, item.slug)}
                    >
                      Explore
                    </button>
                  )}
                </GridItem>
                <GridItem start={5} span={5}>
                  {Array.isArray(item.images) ? (
                    <div
                      style={{ display: "flex", gap: "8px", alignItems: "flex-start", justifyContent: "flex-start" }}
                    >
                      {item.images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${item.title} ${i + 1}`}
                          className={styles.image}
                          style={{
                            height: "325px",
                            width: "auto",
                            objectFit: "contain",
                            flex: "0 0 auto",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <img src={item.image} alt={item.title} className={styles.image} />
                  )}
                </GridItem>
              </Grid>
              <Divider size="xs" />
            </div>
          </div>
          <div className={styles.divider} />
        </div>
      ))}
    </div>
  );
}
