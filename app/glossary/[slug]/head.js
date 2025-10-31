import { formatTitle } from "../../../lib/seo";
import { getGlossaryTermBySlug } from "../../../lib/glossary";

export default async function Head({ params }) {
  const { slug } = params || {};
  let titleText = "Glossary";
  try {
    const term = await getGlossaryTermBySlug(slug);
    titleText = term?.seoTitle || term?.term || titleText;
  } catch (_) {}

  return (
    <>
      <title>{formatTitle(titleText)}</title>
    </>
  );
}


