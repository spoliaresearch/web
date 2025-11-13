"use client";

import React from "react";
import Header from "../components/Header";
import Close from "../components/Close";
import Line from "../components/Line";
import { GridContainer, Grid, GridItem } from "../components/Grid";
import dynamic from "next/dynamic";
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import styles from "./page.module.css";
// Properly handle SSR for Canvas404
const Canvas404 = dynamic(() => import("../components/Canvas404"), {
  ssr: false,
  loading: () => null,
});

export default function Surprise() {
  return (
    <div>
      <Header />
      <Divider size="s" />
      <GridContainer>
        <Divider size="s" />
        <div className={styles.projectMeta}>
          <Grid>
            <GridItem span={1} start={0} spanMobile={1}>
              <Close />
            </GridItem>
            <GridItem span={2} start={3} spanMobile={2} startMobile={0}>
              <span className="fs-xxs t-text lh-0 meta"> INDEX </span>
              <span className="fs-xs h-text meta">0.0.0</span>
            </GridItem>

            <GridItem span={2} start={5} dropMobile={true}>
              <span className="fs-xxs t-text lh-0 meta"> TYPE </span>
              <span className="fs-xs h-text meta">Pattern 0.0.0</span>
            </GridItem>
            <GridItem span={2} start={8} spanMobile={4} startMobile={4}>
              <span className="fs-xxs t-text lh-0 meta"> NAME</span>
              <span className="fs-xs h-text meta"> GAME OF LIFE</span>
            </GridItem>
            <GridItem span={1} start={10} spanMobile={3} startMobile={9}>
              <span className="fs-xxs t-text lh-0 meta"> YEAR</span>
              <span className="fs-xs h-text meta"> 1588</span>
            </GridItem>
            <GridItem span={1} start={12} spanMobile={1} startMobile={12}>
              <div
                onClick={async () => {
                  const { reloadCanvas404Pattern } = await import("../components/Canvas404");
                  reloadCanvas404Pattern();
                }}
                style={{ cursor: "pointer" }}
              >
                <span className="fs-xxs t-text lh-0 meta"> REGENERATE </span>
                <span className="fs-xs h-text meta">→</span>
              </div>
            </GridItem>
          </Grid>
        </div>
        <Grid>
          <GridItem start={0} span={12}>
            <Canvas404 />
          </GridItem>
        </Grid>
        <Divider size="xxs" />
        <Grid>
          <GridItem span={12} start={0}></GridItem>
        </Grid>
        <Divider size="xs" />
        <Line />
        <Divider size="xxs" />
        <Grid>
          <GridItem span={2} start={1} spanMobile={6}>
            <p className="fs-xs b-h-text lh-0 meta ">Source</p>
            <p className="fs-xs h-text meta">Les Singuliers et Nouveaux Portraicts</p>
          </GridItem>
          <GridItem span={2} start={3} startMobile={7} spanMobile={6}>
            <p className="fs-xs b-h-text lh-0 meta ">Author</p>
            <p className="fs-xs h-text meta">Federic de Vinciolo</p>
          </GridItem>
          <GridItem span={5} start={8} spanMobile={12}>
            <p className="fs-sm h-text  p t-r bl">
              This work transforms historical lace patterns from Federic de Vinciolo's 1588 book "Les Singuliers et Nouveaux Portraicts" into living,
              evolving systems that respond to their initial conditions, creating emergent behaviors from simple rules
              based on Conway's Game of Life.
            </p>
          </GridItem>
        </Grid>
      </GridContainer>
      <Divider size="l" />
      <Footer />
    </div>
  );
}

