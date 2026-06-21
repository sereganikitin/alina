"use client";

import { useContent } from "@/lib/useContent";

/** Раздел «Обо мне»: фото в арке по центру; слева над волнистой линией —
 *  заголовок, справа под линией — регалии. Линия во всю ширину экрана,
 *  на заднем плане (за фото и текстом), повторяет форму волн сайта.
 *  Блок «Методы» временно скрыт (см. ниже), вернёмся к нему позже. */
export default function About() {
  const c = useContent();
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Волнистая линия — во всю ширину экрана, на заднем плане, форма как у волн */}
        <svg
          className="pointer-events-none absolute left-1/2 top-[25%] hidden h-16 w-screen -translate-x-1/2 -translate-y-1/2 md:block md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,64 C240,16 480,16 720,52 C960,88 1200,104 1440,56"
            fill="none"
            stroke="var(--terracotta)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 grid items-start gap-10 md:grid-cols-[0.8fr_auto_1.6fr] md:gap-12">
          {/* Заголовок — слева, над линией, в одну строку */}
          <h2 className="relative z-20 font-display text-5xl leading-none md:translate-x-48 md:whitespace-nowrap md:text-right">
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

          {/* Регалии — справа, под линией, во всю ширину колонки */}
          <div className="md:self-end md:pb-6">
            <p className="font-display text-2xl leading-snug text-foreground md:text-[1.7rem]">
              {c.about.title}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {c.about.lead}
            </p>
          </div>
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
