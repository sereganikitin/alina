"use client";

import { useState } from "react";
import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function Education() {
  const c = useContent();
  const [open, setOpen] = useState<{ images: string[]; title: string } | null>(null);
  const [idx, setIdx] = useState(0);

  const close = () => setOpen(null);
  const openDiploma = (images: string[], title: string) => {
    if (!images.length) return;
    setIdx(0);
    setOpen({ images, title });
  };

  return (
    <section id="education">
      <div className="wrap">
        <div className="kicker">Образование</div>
        <h2 className="section-h">Дипломы и квалификация</h2>
        <RichText html={c.education.lead} className="lead" />

        <div className="edu-list">
          {c.education.diplomas.map((d, i) => (
            <div
              key={d.title}
              className="edu-row"
              onClick={() => openDiploma(d.images, d.title)}
            >
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{d.title}</span>
              <span className="go">{d.images.length ? "скан →" : ""}</span>
            </div>
          ))}
        </div>

        <ul className="extra">
          {c.education.extra.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

      {/* Попап-галерея со сканом */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-[var(--card)] p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)]/85 text-[var(--ink)] transition hover:bg-[var(--bg)]"
            >
              ✕
            </button>
            <div className="relative overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={open.images[idx]}
                alt={`${open.title} — стр. ${idx + 1}`}
                className="mx-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
              />
              {open.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setIdx((v) => (v - 1 + open.images.length) % open.images.length)}
                    aria-label="Предыдущая страница"
                    className="gallery-nav gallery-nav-prev"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdx((v) => (v + 1) % open.images.length)}
                    aria-label="Следующая страница"
                    className="gallery-nav gallery-nav-next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
              <p className="text-sm text-[var(--muted)]">{open.title}</p>
              {open.images.length > 1 && (
                <div className="gallery-dots">
                  {open.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Страница ${i + 1}`}
                      onClick={() => setIdx(i)}
                      className={`gallery-dot${i === idx ? " active" : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
