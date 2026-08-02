"use client";

import { useContent, useContentReady } from "@/lib/useContent";
import { RichText } from "@/lib/richText";
import DiplomaList from "@/components/DiplomaList";

export default function EducationPage() {
  const c = useContent();
  const ready = useContentReady();

  if (!ready) return null;

  return (
    <main className="flex-1">
      <section className="blog-hero">
        <div className="wrap article">
          <a href="/#education" className="lnk article-back">
            ← На главную
          </a>
          <div className="kicker">Образование</div>
          <h1 className="section-h">Дипломы и квалификация</h1>
          <RichText html={c.education.lead} className="lead" />

          <DiplomaList diplomas={c.education.diplomas} />
        </div>
      </section>
    </main>
  );
}
