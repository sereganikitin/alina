"use client";

import { useContent } from "@/lib/useContent";

/** Раздел «Образование». Сканы дипломов — из админки (плейсхолдер, если не загружены). */
export default function Education() {
  const c = useContent();
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
          {c.education.diplomas.map((d) => (
            <li
              key={d.title}
              className="overflow-hidden rounded-2xl border border-line bg-cream"
            >
              {d.scan ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={d.scan} alt={d.title} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-line/60">
                  <span className="text-sm text-muted">скан появится</span>
                </div>
              )}
              <p className="px-5 py-4 text-foreground/85">{d.title}</p>
            </li>
          ))}
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
    </section>
  );
}
