"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function About() {
  const c = useContent();
  return (
    <section id="about" className="about">
      <div className="wrap about-grid">
        <div className="arch">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.about.image} alt="Алина Дубовская" />
        </div>
        <div>
          <div className="kicker">Обо мне</div>
          {c.about.title && <div className="role">{c.about.title}</div>}
          <RichText
            html={c.about.lead}
            className="muted"
            style={{ marginTop: "18px", fontSize: "1.1rem" }}
          />
          <a href="#approach" className="section-text-link">Подробнее про принципы работы</a>
          <RichText html={c.about.afterPrinciples} className="muted about-bio" />
          <div className="chips about-links">
            {c.about.links.map((link, i) =>
              link.url ? (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="btn chip-btn">
                  {link.label}
                </a>
              ) : (
                <span key={i} className="btn chip-btn">
                  {link.label}
                </span>
              )
            )}
          </div>
          <a href="#fun-facts" className="section-text-link">
            Узнать больше в разделе «Интересное обо мне»
          </a>
        </div>
      </div>
    </section>
  );
}