export default function Head() {
  const title = "SPOLIA";
  const description =
    "Spolia is an R&D studio for design and technology. We build products and experiences, from concept to release.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://spolia.org";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="application-name" content="SPOLIA" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SPOLIA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={baseUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Icons */}
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-icon.svg" />
    </>
  );
}


