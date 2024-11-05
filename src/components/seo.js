import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

export function SEO({ title, description, image, pathname }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          twitter
        }
      }
    }
  `);

  const seo = {
    title: "SPOLIA",
    description: "A design and technology studio building tools for a more creative and sustainable future.",
    image:
      "https://opengraph.b-cdn.net/production/images/a7999fbd-3fe9-4111-848c-8c1ea6624740.png?token=uczRetSSmDbF_vmZOocDPFBynm-L4AIhwYomY_TNfNA&height=630&width=1200&expires=33266842478",
    url: "https://www.spolialab.com",
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={seo.title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="spolialab.com" />
      <meta property="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />

      {/* Additional tags */}
      <link rel="canonical" href={seo.url} />
      <meta name="robots" content="index,follow" />
      <meta property="og:locale" content="en_US" />
    </Helmet>
  );
}
