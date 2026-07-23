"use client";

import { useContent } from "@/lib/useContent";

export default function Approach() {
  const c = useContent();
  return (
    <section id="approach" className="about" style={{ borderBottom: "none" }}>
      <div className="wrap">
        <div className="kicker">О подходе</div>
        <h2 className="section-h">Как проходит работа</h2>

        <div className="article">
          {c.approach.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}