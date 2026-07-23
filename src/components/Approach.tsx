"use client";

import { useContent } from "@/lib/useContent";

export default function Approach() {
  const c = useContent();
  return (
    <section id="approach" className="approach-section">
      <div className="wrap approach-wrap">
        <div className="kicker">О подходе</div>
        <h2 className="section-h">Как проходит работа</h2>

        <div className="approach-cards">
          {c.approach.paragraphs.map((p, i) => (
            <div key={i} className="approach-card">
              <div className="approach-card-num">{String(i + 1).padStart(2, "0")}</div>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}