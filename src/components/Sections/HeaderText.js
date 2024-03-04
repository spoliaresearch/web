import React from "react";
import "./HeaderText.css";
import FontSettingsToggle from "../FontSettingsToggle";
import ThemeToggle from "../ThemeToggle";
import { graphql } from "gatsby";
const HeaderText = React.forwardRef((props, ref) => {
  return (
    <div className="HeaderText" ref={ref} style={props.style}>
      <div className="HeaderGrid">
        <div className="SidebarHeader">
          {/* <div className='items'><span>Sort</span></div>  */}
          <FontSettingsToggle />
          <ThemeToggle />
        </div>
        <div className="ProjectHeader">
          {" "}
          <div>
            <span id="my-anchor">{props.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeaderText;

export const pageQuery = graphql`
  query Page($path: String!) {
    page: googleDocs(slug: { eq: $path }) {
      name
    }
  }
`;
