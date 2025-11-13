"use client";

import React from "react";
import Header from "./components/Header";
import { GridContainer, Grid, GridItem } from "./components/Grid";
import dynamic from "next/dynamic";
import Link from "next/link";
import Divider from "./components/Divider";
// Properly handle SSR for Canvas404
const Canvas404 = dynamic(() => import("./components/Canvas404"), {
  ssr: false,
  loading: () => null,
});

// We'll import the reload function dynamically since it's client-side only

export default function NotFound() {
  return (
    <div>
      <Header />
      <Divider size="s" mobileSize="l" />
      <GridContainer>
        <Grid>
          <GridItem span={3}>
            <div>
              <h1 style={{ fontSize: "70px", lineHeight: "1" }}>Oops!</h1>
            </div>
          </GridItem>

          <GridItem start={7} span={6}>
            <div>
              <h2 style={{ fontSize: "24px", lineHeight: "1.2" }}>
                Tried as we might, all we found was a pattern from the 1588 book Les Singuliers et Nouveaux Portraicts
                by Federic de Vinciolo that we rendered into a Game of Life.
              </h2>

              <br />
            </div>
          </GridItem>
        </Grid>
        <Divider size="s" />
        <Grid>
          <GridItem start={0} span={2}>
            {" "}
            <Link href="/">← Return Home</Link>
          </GridItem>
          <GridItem start={11} span={2}>
            <div
              onClick={async () => {
                const { reloadCanvas404Pattern } = await import("./components/Canvas404");
                reloadCanvas404Pattern();
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "inherit",
                textAlign: "right",
                marginRight: "0",
                color: "inherit",
                fontSize: "16px",
              }}
            >
              I need a new pattern →
            </div>
          </GridItem>
          <GridItem start={0} span={12}>
            <Canvas404 />
          </GridItem>
        </Grid>
      </GridContainer>
    </div>
  );
}
