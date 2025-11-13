export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://spolia.org";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
