"use client";

import { useContent } from "@/lib/useContent";

/** Раздел «Обо мне»: фото в арке по центру, заголовок слева, регалии справа.
 *  По центру секции — тонкая коричневая волнистая линия (форма как у волн сайта).
 *  Блок «Методы» временно скрыт (см. ниже), вернёмся к нему позже. */
export default function About() {
  const c = useContent();
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32"
    >
      {/* Волнистая линия по центру (только контур, фон по обе стороны один) */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-16 w-full -translate-y-1/2 md:block"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64 C240,16 480,16 720,52 C960,88 1200,104 1440,56"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
        {/* Заголовок — слева от фото */}
        <h2 className="font-display text-5xl font-semibold leading-none md:text-right lg:text-6xl">
          Обо мне
        </h2>

        {/* Фото в арке — по центру */}
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.about.image}
            alt="Алина"
            className="aspect-[3/4] w-full object-cover object-[center_15%]"
          />
        </div>

        {/* Регалии — справа от фото */}
        <div>
          <p className="font-display text-2xl leading-snug text-foreground md:text-[1.65rem]">
            {c.about.title}
          </p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
            {c.about.lead}
          </p>
        </div>
      </div>

      {/* ВРЕМЕННО СКРЫТ блок «Методы» — вернёмся к нему позже:
      <div className="relative z-10 mx-auto mt-12 max-w-5xl">
        <div className="rounded-[2rem] bg-terracotta px-10 py-6 text-center shadow-lg md:rounded-full md:px-12">
          <ul className="inline-flex flex-col gap-1.5 text-left">
            {c.about.methods.map((m) => (
              <li key={m} className="flex items-center gap-2.5 whitespace-nowrap text-sm text-background/90">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-background/70" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      */}
    </section>
  );
}
