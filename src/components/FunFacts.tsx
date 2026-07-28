"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function FunFacts() {
  const c = useContent();
  if (!c.funFacts.text && !c.funFacts.image) return null;

  // Переносим последние два слова заголовка ("обо мне") на вторую строку.
  const titleWords = c.funFacts.title.split(" ");
  const titleLine1 = titleWords.slice(0, -2).join(" ");
  const titleLine2 = titleWords.slice(-2).join(" ");

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
              <h2 className="fun-facts-title">
                {titleLine1 && (
                  <>
                    {titleLine1}
                    <br />
                  </>
                )}
                {titleLine2}
              </h2>
              <RichText html={c.funFacts.text} className="fun-facts-text" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
