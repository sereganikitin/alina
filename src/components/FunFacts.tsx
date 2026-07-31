"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/lib/useContent";

const AUTOPLAY_MS = 5000;

export default function FunFacts() {
  const c = useContent();
  const items = c.funFacts.items;
  const [idx, setIdx] = useState(0);

  // Автолистание, пока пользователь не листает сам — сбрасывается на любой ручной переход.
  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % items.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [items.length, idx]);

  if (!items.length) return null;

  const current = items[idx];
  const go = (next: number) => setIdx((next + items.length) % items.length);

  // Переносим последние два слова заголовка ("обо мне") на вторую строку.
  const titleWords = c.funFacts.title.split(" ");
  const titleLine1 = titleWords.slice(0, -2).join(" ");
  const titleLine2 = titleWords.slice(-2).join(" ");

  return (
    <section id="fun-facts" className="fun-facts-section">
      <div className="wrap">
        <div className="kicker">Факты</div>
        <div className="fun-facts-panel">
          <div className="fun-facts-circle-photo">
            {current.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current.image} alt="" />
            ) : (
              <div className="fun-facts-photo-empty" />
            )}
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(idx - 1)} aria-label="Предыдущий факт" className="gallery-nav gallery-nav-prev">
                  ‹
                </button>
                <button type="button" onClick={() => go(idx + 1)} aria-label="Следующий факт" className="gallery-nav gallery-nav-next">
                  ›
                </button>
              </>
            )}
          </div>
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
              <p className="fun-facts-text">{current.text}</p>
              {items.length > 1 && (
                <div className="gallery-dots" style={{ marginTop: "22px" }}>
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Факт ${i + 1}`}
                      onClick={() => go(i)}
                      className={`gallery-dot${i === idx ? " active" : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
