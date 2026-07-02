"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/lib/useContent";

/** Раздел «Образование». На карточке — заглушка (placeholder); по клику
 *  открывается попап с полным сканом и кнопкой «Скачать». Обе картинки — из админки. */
export default function Education() {
  const c = useContent();
  const [open, setOpen] = useState<{ scan: string; title: string } | null>(null);

  // Закрытие по Escape + блокировка прокрутки фона, пока открыт попап
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      id="education"
      data-nav-theme="light"
      className="bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl">Образование</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">
          {c.education.lead}
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.education.diplomas.map((d) => {
            const cover = d.placeholder || d.scan; // на карточке — заглушка (или сам скан)
            const clickable = Boolean(d.scan);
            return (
              <li
                key={d.title}
                className="overflow-hidden rounded-2xl border border-line bg-cream"
              >
                <button
                  type="button"
                  onClick={() => clickable && setOpen({ scan: d.scan, title: d.title })}
                  aria-label={clickable ? `Открыть скан: ${d.title}` : d.title}
                  className={`group relative block w-full ${
                    clickable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt={d.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-line/60">
                      <span className="text-sm text-muted">скан появится</span>
                    </div>
                  )}
                  {clickable && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition duration-200 group-hover:bg-foreground/35 group-hover:opacity-100">
                      <span className="rounded-full bg-cream/95 px-4 py-2 text-sm text-foreground shadow">
                        посмотреть скан
                      </span>
                    </span>
                  )}
                </button>
                <p className="px-5 py-4 text-foreground/85">{d.title}</p>
              </li>
            );
          })}
        </ul>

        <ul className="mt-10 flex flex-col gap-2.5">
          {c.education.extra.map((e) => (
            <li key={e} className="flex items-start gap-3 text-foreground/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{e}</span>
            </li>
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
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-cream p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground transition hover:bg-background"
            >
              ✕
            </button>
            <div className="overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={open.scan}
                alt={open.title}
                className="mx-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">{open.title}</p>
              <a
                href={open.scan}
                download
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 font-sans text-sm text-cream shadow transition-opacity hover:opacity-90"
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
