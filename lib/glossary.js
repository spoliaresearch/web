import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const glossaryDirectory = path.join(process.cwd(), "reference/src/content/glossary");

export async function getAllGlossaryTerms() {
  const filenames = fs.readdirSync(glossaryDirectory);

  const terms = filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(glossaryDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: data.slug,
        term: data.term,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        schema: data.schema,
      };
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return terms;
}

export async function getGlossaryTermBySlug(slug) {
  const filenames = fs.readdirSync(glossaryDirectory);

  for (const filename of filenames) {
    if (filename.endsWith(".md")) {
      const filePath = path.join(glossaryDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      if (data.slug === slug) {
        // Process markdown content
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return {
          slug: data.slug,
          term: data.term,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          datePublished: data.datePublished,
          dateModified: data.dateModified,
          schema: data.schema,
          contentHtml,
        };
      }
    }
  }

  return null;
}

export function getAllGlossarySlugs() {
  const filenames = fs.readdirSync(glossaryDirectory);

  return filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(glossaryDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: data.slug,
      };
    });
}
