"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % workItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleItemHover = (index) => {
    setActiveIndex(index);
  };

  return (
    <Grid>
      <GridItem start={0} span={5}>
        <div className={styles.listContainer}>
          {workItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.listItem} ${index === activeIndex ? styles.active : ""}`}
              onMouseEnter={() => handleItemHover(index)}
            >
              <h3 className={styles.title}>{item.title}</h3>
              {/* <p className={styles.description}>{item.description}</p> */}
            </div>
          ))}
        </div>
      </GridItem>

      <GridItem start={10} span={3}>
        <div className={styles.imageContainer}>
          <img src={workItems[activeIndex].image} alt={workItems[activeIndex].title} className={styles.image} />
        </div>
      </GridItem>
    </Grid>
  );
}
