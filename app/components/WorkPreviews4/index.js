"use client";

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
  return (
    <div className={styles.container}>
      {workItems.map((item, index) => (
        <Grid key={item.id} className={styles.projectRow}>
          <GridItem start={0} span={6}></GridItem>
          <GridItem start={7} span={6}>
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <h3 className={styles.title}>{item.title}</h3>
            </div>
          </GridItem>
        </Grid>
      ))}
    </div>
  );
}
