"use client";

import { useContentReady } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function LegalPage({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  const ready = useContentReady();
  if (!ready) return null;

  return (
    <section className="blog-hero">
      <div className="wrap article">
        <a href="/#contacts" className="lnk article-back">
          ← На главную
        </a>
        <div className="kicker">{kicker}</div>
        <h1 className="section-h">{title}</h1>
        <RichText html={body} className="article-body" />
      </div>
    </section>
  );
}
