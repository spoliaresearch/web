import React from "react";
import Link from "gatsby-link";
import "./TopNavigation.css";
const TopNavigation = React.forwardRef((props, ref) => {
  return (
    <nav ref={ref} style={props.style}>
      <hr />
      <div className="nav">
        <Link to="/" className="logo">
          <span>SPOLIA</span>
        </Link>
        <div className="nav-middle">
          <span>DESIGN & TECHNOLOGY</span>
        </div>
        <div>
          {/* need more work first */}
          {/* <Link to="/work" className="nav-link"><span>INDEX</span></Link> */}
          {/* <Link to="/information" className="nav-link"><span>OFFICE</span></Link> */}

          <span className="contact-container">
            <a className="nav-link" href="mailto:hello@spolialab.com">
              CONTACT
            </a>
            <a
              href="https://www.instagram.com/spolialab"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link instagram-link"
              aria-label="Spolia Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
});

export default TopNavigation;
