"use client";

import React, { useContext } from "react";
import "./Newsletter.css";
import { ThemeContext } from "../../components/contexts/ThemeContext";
import { Grid, GridItem } from "../../components/Grid";
const Newsletter = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="newsletter-container">
      <Grid>
        <GridItem start={3} span={8}>
          {" "}
          <div className="fs-smm h-text c">
            {" "}
            Subscribe to receive early access to our projects and research exploring emerging futures.
          </div>
        </GridItem>
        <GridItem start={3} span={8}>
          {" "}
          <div className="subscribe-form">
            <div
              style={{
                textAlign: "center",
                marginBottom: "0rem",
                padding: "0.5rem 0",

                letterSpacing: "0.01em",
                width: "100.25%",
                borderBottom: "1px solid #000",
                margin: "0 -1px",
              }}
              className="fs-xs h-text c"
            >
              NEWSLETTER
            </div>
            <iframe
              src="https://embeds.beehiiv.com/808a39be-a60f-4ead-b371-8710ff969dcc?slim=true"
              data-test-id="beehiiv-embed"
              height="45"
              frameBorder="0"
              scrolling="no"
              style={{
                margin: 0,
                borderRadius: "0px !important",
                backgroundColor: "transparent",
                width: "100%",
              }}
            />
          </div>
        </GridItem>
      </Grid>
      <div className="row">
        <div className="col-padding-left"></div>
        <div className="col-margin-left"></div>
        <div className="col-spacing-1"></div>

        <div className="col-main" style={{ textAlign: "center" }}>
          <div style={{ flex: "3", textAlign: "left" }}></div>
          <div style={{ display: "flex", gap: "3.5rem" }}>
            <div style={{ flex: "3" }}>
              <div>
                {/* <div
                  style={{
                    textAlign: "center",
                    marginBottom: "0rem",
                    padding: "0.5rem 0",
                    fontSize: ".65em",
                    letterSpacing: "0.01em",
                    width: "100.25%",
                    borderBottom: "1px solid #000",
                    margin: "0 -1px",
                  }}
                >
                  NEWSLETTER
                </div> */}
                {/* <iframe
                  src="https://embeds.beehiiv.com/808a39be-a60f-4ead-b371-8710ff969dcc?slim=true"
                  data-test-id="beehiiv-embed"
                  height="45"
                  frameBorder="0"
                  scrolling="no"
                  style={{
                    margin: 0,
                    borderRadius: "0px !important",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-spacing-2"></div>
        {/* <div className="col-margin-right">
          <p className="small-text" style={{ marginTop: "3rem" }}>
            If you would like to support our research efforts further, consider{" "}
            <a href="https://www.patreon.com/c/Spolia" target="_blank" rel="noopener noreferrer">
              {" "}
              becoming a patron on Patreon.
            </a>
          </p>
        </div> */}
        <div className="col-padding-right"></div>
      </div>
    </div>
  );
};

export default Newsletter;
