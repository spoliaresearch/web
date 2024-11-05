import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

export function SEO({ title, description, image, pathname }) {
  // 1. First, get the data
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          twitter
        }
      }
    }
  `);

  // 2. Then create the SEO object
  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    image: image || `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
    url: `${site.siteMetadata.siteUrl}${pathname || ""}`,
  };

  // Try using defer={false} to ensure meta tags are added immediately
  return (
    <Helmet defer={false}>
      {/* Force a base title */}
      <title>{seo.title}</title>

      {/* Force these meta tags to be strings */}
      <meta name="description" content={String(seo.description)} />
      <meta name="image" content={String(seo.image)} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={String(seo.title)} />
      <meta property="og:description" content={String(seo.description)} />
      <meta property="og:image" content={String(seo.image)} />
      <meta property="og:url" content={String(seo.url)} />
      <meta property="og:type" content="website" />

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
