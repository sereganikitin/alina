"use client";

import Wave from "./Wave";
import { useContent } from "@/lib/useContent";

/** Раздел «Принципы работы»: заголовок → фото с дугой сверху → тексты. */
export default function Principles() {
  const c = useContent();
  return (
    <section
      id="principles"
      data-nav-theme="light"
      className="relative bg-cream px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40"
    >
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--background)"
      />

      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-4xl md:text-5xl">
          Принципы работы
        </h2>

        {/* Фото под заголовком: по ширине текста, сверху идеально круглая дуга.
            aspect-[4/3] => высота 0.75·ширины >= ширина/2, поэтому rounded-t-full
            даёт ровный полукруг (радиус = половина ширины блока). */}
        <div className="mt-10 aspect-[4/3] overflow-hidden rounded-t-full md:mt-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.principles.image}
            alt="Алина"
            className="h-full w-full object-cover object-[center_25%]"
          />
        </div>

        <h3 className="mt-14 font-display text-2xl text-terracotta">
          С чем я работаю
        </h3>
        <ul className="mt-6 flex flex-wrap gap-3">
          {c.principles.requests.map((r) => (
            <li
              key={r}
              className="rounded-full border border-line bg-background/60 px-4 py-2 text-sm text-foreground/85"
            >
              {r}
            </li>
          ))}
        </ul>

        <h3 className="mt-14 font-display text-2xl text-terracotta">
          С кем я работаю
        </h3>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">
          {c.principles.withWhom}
        </p>

        <a
          href="#approach"
          className="mt-12 inline-flex items-center gap-2 font-sans text-lg text-foreground underline decoration-gold decoration-1 underline-offset-8 transition-colors hover:text-terracotta"
        >
          Подробнее о методе
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
