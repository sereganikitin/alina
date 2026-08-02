"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/useContent";

const AUTOPLAY_MS = 5000;
const FADE_MS = 1000;

function Photo({ image }: { image: string }) {
  return image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" />
  ) : (
    <div className="fun-facts-photo-empty" />
  );
}

export default function FunFacts() {
  const c = useContent();
  const items = c.funFacts.items;
  const [idx, setIdx] = useState(0);
  // Индекс факта, с которого только что ушли — держим его на экране ещё
  // FADE_MS, пока он гаснет, одновременно с проявлением нового (кроссфейд:
  // оба слоя наложены друг на друга, без пустого кадра между ними).
  const [outIdx, setOutIdx] = useState<number | null>(null);
  const outTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    const n = (next + items.length) % items.length;
    if (n === idx) return;
    if (outTimerRef.current) clearTimeout(outTimerRef.current);
    setOutIdx(idx);
    setIdx(n);
    outTimerRef.current = setTimeout(() => setOutIdx(null), FADE_MS);
  };

  // Прогреваем кэш браузера сразу всеми фото факта — иначе то, что грузится
  // именно в момент своего появления (не только следующее по очереди),
  // проступает поверх кроссфейда вместо того, чтобы быть готовым заранее.
  useEffect(() => {
    const imgs = items.map((it) => {
      if (!it.image) return null;
      const img = new Image();
      img.src = it.image;
      return img;
    });
    return () => {
      imgs.forEach((img) => { if (img) img.src = ""; });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((it) => it.image).join("|")]);

  useEffect(() => () => {
    if (outTimerRef.current) clearTimeout(outTimerRef.current);
  }, []);

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
            <div className="fun-facts-stack">
              {outIdx !== null && (
                <div key={`p${outIdx}`} className="fun-facts-fade-layer is-out">
                  <Photo image={items[outIdx].image} />
                </div>
              )}
              <div key={`c${idx}`} className="fun-facts-fade-layer is-in">
                <Photo image={current.image} />
              </div>
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
              <div className="fun-facts-stack fun-facts-text-stack">
                {outIdx !== null && (
                  <div key={`pt${outIdx}`} className="fun-facts-fade-layer is-out">
                    <p className="fun-facts-text">{items[outIdx].text}</p>
                  </div>
                )}
                <div key={`ct${idx}`} className="fun-facts-fade-layer is-in">
                  <p className="fun-facts-text">{current.text}</p>
                </div>
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
