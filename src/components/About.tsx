"use client";

import { useContent } from "@/lib/useContent";

/** Раздел «Обо мне»: фото в арке; заголовок и блок «Методы» наползают
 *  на правый край фото и выровнены по одному левому краю. */
export default function About() {
  const c = useContent();
  // Левый край заголовка и блока «Методы» (доля ширины фото)
  const overlapLeft = "75%";
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        {/* Фото в арке + наползающие заголовок и блок «Методы» */}
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          {/* Заголовок — наползает на верх-право фото */}
          <h2
            className="mb-6 font-display text-5xl font-semibold leading-none md:absolute md:top-2 md:z-10 md:mb-0 md:whitespace-nowrap lg:text-6xl"
            style={{ left: overlapLeft }}
          >
            Обо мне
          </h2>

          <div className="overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.about.image}
              alt="Алина"
              className="aspect-[3/4] w-full object-cover object-[center_15%]"
            />
          </div>

          {/* Методы — компактная капсула, наползает на низ-право фото */}
          <div
            className="relative z-10 mt-8 md:absolute md:top-[66%] md:mt-0 md:w-[26rem]"
            style={{ left: overlapLeft }}
          >
            <div className="rounded-[2rem] bg-terracotta px-10 py-6 text-center shadow-lg md:rounded-full md:px-12">
              <ul className="inline-flex flex-col gap-1.5 text-left">
                {c.about.methods.map((m) => (
                  <li
                    key={m}
                    className="flex items-center gap-2.5 whitespace-nowrap text-sm text-background/90"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-background/70" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Регалии (правая колонка), сдвинуты ниже заголовка-оверлея */}
        <div className="md:pt-24">
          <p className="font-display text-2xl leading-snug text-foreground md:text-[1.75rem]">
            {c.about.title}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {c.about.lead}
          </p>
        </div>
      </div>
    </section>
  );
}
