"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";
import DiplomaList from "./DiplomaList";

const VISIBLE_COUNT = 5;

export default function Education() {
  const c = useContent();
  const diplomas = c.education.diplomas;
  const shown = diplomas.slice(0, VISIBLE_COUNT);
  const hasMore = diplomas.length > VISIBLE_COUNT;

  return (
    <section id="education">
      <div className="wrap">
        <div className="kicker">Образование</div>
        <h2 className="section-h">Дипломы и квалификация</h2>
        <RichText html={c.education.lead} className="lead" />

        <DiplomaList diplomas={shown} />

        {hasMore && (
          <a href="/education" className="edu-more">
            Смотреть ещё →
          </a>
        )}

        <ul className="extra">
          {c.education.extra.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
