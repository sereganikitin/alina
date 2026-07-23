"use client";

import { useState } from "react";
import { useContent } from "@/lib/useContent";

export default function Education() {
  const c = useContent();
  const [open, setOpen] = useState<{ scan: string; title: string } | null>(null);

  return (
    <section id="education" className="section">
      <div className="wrap">
        <div className="kicker">Образование</div>
        <h2 className="section-h">Дипломы и квалификация</h2>
        <p className="lead">{c.education.lead}</p>

        <div className="edu-list">
          {c.education.diplomas.map((d, i) => (
            <div
              key={d.title}
              className="edu-row"
              onClick={() => d.scan && setOpen({ scan: d.scan, title: d.title })}
            >
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{d.title}</span>
              <span className="go">{d.scan ? "скан →" : ""}</span>
            </div>
          ))}
        </div>

        <ul className="extra">
          {c.education.extra.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

      {/* Попап со сканом */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(null)}
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
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)]/85 text-[var(--ink)] transition hover:bg-[var(--bg)]"
            >
              ✕
            </button>
            <div className="overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open.scan} alt={open.title} className="mx-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[var(--muted)]">{open.title}</p>
              <a
                href={open.scan}
                download
                className="inline-flex items-center gap-2 rounded-full bg-[var(--terra)] px-5 py-2.5 font-sans text-sm text-[var(--card)] shadow transition-opacity hover:opacity-90"
              >
                Скачать скан
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}