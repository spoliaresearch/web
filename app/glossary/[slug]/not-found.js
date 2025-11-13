import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Glossary Term Not Found</h1>
      <p>The glossary term you're looking for doesn't exist.</p>
      <Link href="/glossary">← Return to Glossary</Link>
    </div>
  );
}
