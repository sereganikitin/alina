"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/useContent";

const AUTOPLAY_MS = 5000;
const FADE_MS = 350;

export default function FunFacts() {
  const c = useContent();
  const items = c.funFacts.items;
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const pendingRef = useRef<number | null>(null);

  // Переход на новый факт: сперва гасим текущий (текст+фото вместе), меняем
  // контент, пока он невидим, затем проявляем — фото и текст всегда меняются
  // одним кадром, никогда не рассинхронизированы.
  const goTo = (next: number) => {
    const n = (next + items.length) % items.length;
    if (n === idx || pendingRef.current !== null) return;
    // прогреваем кэш браузера, чтобы новое фото уже было готово к моменту проявления
    if (items[n]?.image) {
      const img = new Image();
      img.src = items[n].image;
    }
    pendingRef.current = n;
    setFading(true);
    setTimeout(() => {
      setIdx(n);
      pendingRef.current = null;
      setFading(false);
    }, FADE_MS);
  };

  // Автолистание, пока пользователь не листает сам — сбрасывается на любой ручной переход.
  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => goTo(idx + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, idx]);

  if (!items.length) return null;

  const current = items[idx];

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
            <div className={`fun-facts-fade${fading ? " is-hidden" : ""}`}>
              {current.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.image} alt="" />
              ) : (
                <div className="fun-facts-photo-empty" />
              )}
            </div>
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => goTo(idx - 1)} aria-label="Предыдущий факт" className="gallery-nav gallery-nav-prev">
                  ‹
                </button>
                <button type="button" onClick={() => goTo(idx + 1)} aria-label="Следующий факт" className="gallery-nav gallery-nav-next">
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
              <div className={`fun-facts-fade${fading ? " is-hidden" : ""}`}>
                <p className="fun-facts-text">{current.text}</p>
              </div>
              {items.length > 1 && (
                <div className="gallery-dots" style={{ marginTop: "22px" }}>
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Факт ${i + 1}`}
                      onClick={() => goTo(i)}
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
