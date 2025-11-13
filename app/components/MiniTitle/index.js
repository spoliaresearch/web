"use client";

import { usePageTitle } from "../contexts/PageTitleContext";
import { GridContainer, Grid, GridItem } from "../Grid";
import styles from "./MiniTitle.module.css";

export default function MiniTitle() {
  const { miniTitle, miniVisible } = usePageTitle();

  if (!miniVisible || !miniTitle) return null;

  return (
    <div className={`${styles.miniTitle} ${styles.visible}`}>
      <GridContainer>
        <Grid>
          <GridItem start={1} span={3} startTablet={1} spanTablet={4} startMobile={1} spanMobile={6}>
            <span className={styles.miniTitleText}>{miniTitle}</span>
          </GridItem>
        </Grid>
      </GridContainer>
    </div>
  );
}
