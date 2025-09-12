"use client";

import { useState, useEffect, useRef } from "react";
import { Grid, GridItem } from "../Grid";
import styles from "./WorkPreviews.module.css";

const workItems = [
  {
    id: 1,
    title:
      "A Digital Material Passport to enable  Circular Construction through material tracking and emissions system. ",
    description: "Exploring computational approaches to material behavior",
    image: "/three_images/05.jpg",
  },
  {
    id: 2,
    title: "An interactive installation pulling data from deep-sea habitats at risk",
    description: "Developing new paradigms for human-computer interaction",
    image: "/three_images/DSC02213-2.jpg",
  },
  {
    id: 3,
    title: "Ecological Intelligence Systems",
    description: "Building technology that learns from natural systems",
    image: "/three_images/DSCF1215.jpg",
  },
  {
    id: 4,
    title: "Regenerative Computing",
    description: "Creating computational systems that give back to their environment",
    image: "/three_images/IMG_7810.jpeg",
  },
];

export default function WorkPreviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % workItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleItemHover = (index, event) => {
    setActiveIndex(index);
    setIsHovering(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (event) => {
    if (containerRef.current && isHovering) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Grid>
      <GridItem start={0} span={12}>
        <div
          ref={containerRef}
          className={styles.listContainer}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {workItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.listItem} ${index === activeIndex ? styles.active : ""}`}
              onMouseEnter={(e) => handleItemHover(index, e)}
            >
              <h3 className={styles.title}>{item.title}</h3>
              {/* <p className={styles.description}>{item.description}</p> */}
            </div>
          ))}

          {isHovering && (
            <div
              className={styles.cursorImage}
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            >
              <img src={workItems[activeIndex].image} alt={workItems[activeIndex].title} className={styles.image} />
            </div>
          )}
        </div>
      </GridItem>
    </Grid>
  );
}
