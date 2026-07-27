"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function FunFacts() {
  const c = useContent();
  if (!c.funFacts.text && !c.funFacts.image) return null;

  return (
    <section id="fun-facts" className="fun-facts-section">
      <div className="wrap">
        <div className="kicker">Факты</div>
        <div className="fun-facts-panel">
          {c.funFacts.image && (
            <div className="fun-facts-circle-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.funFacts.image} alt="" />
            </div>
          )}
          <div className="fun-facts-circle-text">
            <div className="fun-facts-content">
              <h2 className="fun-facts-title">{c.funFacts.title}</h2>
              <RichText html={c.funFacts.text} className="fun-facts-text" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
