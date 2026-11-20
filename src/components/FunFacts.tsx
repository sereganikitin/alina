"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/useContent";

const AUTOPLAY_MS = 6000;
const FADE_MS = 1500;

// Тонкий двойной шеврон — обводкой, в тон рамке блока, а не жирным
// символом шрифта.
function Chevrons({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M20 6 8 24l12 18" />
      <path d="M29 6 17 24l12 18" />
    </svg>
  );
}

function Photo({ image, stock }: { image: string; stock?: boolean }) {
  return image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" className={stock ? "fun-facts-stock" : undefined} />
  ) : (
    <div className="fun-facts-photo-empty" />
  );
}

export default function FunFacts() {
  const c = useContent();
  const items = c.funFacts.items;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
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
    if (items.length < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo(idx + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, idx, paused]);

  if (!items.length) return null;

  const current = items[idx];

  return (
    <section id="fun-facts" className="fun-facts-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="wrap">
        <h2 className="kicker">{c.funFacts.title}</h2>
        <div className="fun-facts-panel">
          <div className="fun-facts-circle-photo">
            <div className="fun-facts-stack">
              {outIdx !== null && (
                <div key={`p${outIdx}`} className="fun-facts-fade-layer is-out">
                  <Photo image={items[outIdx].image} stock={items[outIdx].stock} />
                </div>
              )}
              <div key={`c${idx}`} className="fun-facts-fade-layer is-in">
                <Photo image={current.image} stock={current.stock} />
              </div>
            </div>
          </div>
          <div className="fun-facts-circle-text">
            <div className="fun-facts-content">
              <div className="fun-facts-text-stack">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`fun-fact-copy ${i === idx ? "is-in" : i === outIdx ? "is-out" : ""}`}
                    aria-hidden={i !== idx}
                  >
                    {item.title && <h3 className="fun-facts-title">{item.title}</h3>}
                    <div className="fun-facts-body">
                      {item.text.split(/\r?\n+/).map((line) => line.trim()).filter(Boolean).map((line, index) => (
                        <p key={index} className="fun-facts-text">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {items.length > 1 && (
                <div className="gallery-dots" style={{ marginTop: "22px" }}>
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={items[i].title || `Факт ${i + 1}`}
                      aria-current={i === idx ? "true" : undefined}
                      onClick={() => goTo(i)}
                      className={`gallery-dot${i === idx ? " active" : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {items.length > 1 && (
          <div className="fun-facts-nav-row">
            <button type="button" onClick={() => goTo(idx - 1)} aria-label="Предыдущий факт" className="fun-facts-nav">
              <Chevrons />
            </button>
            <button type="button" onClick={() => goTo(idx + 1)} aria-label="Следующий факт" className="fun-facts-nav">
              <Chevrons flip />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
