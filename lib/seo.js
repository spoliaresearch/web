export function formatTitle(pageTitle) {
  const brand = "SPOLIA";
  if (!pageTitle || pageTitle.trim().length === 0) return brand;
  return `${pageTitle} — ${brand}`;
}


