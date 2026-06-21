"use client";

import { useContent } from "@/lib/useContent";

/** Раздел «Обо мне»: фото в арке + крупный заголовок и регалии,
 *  блок «Методы» — терракотовый прямоугольник со скруглением, перекрывает низ. */
export default function About() {
  const c = useContent();
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          {/* Фото в арке */}
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-sm md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.about.image}
              alt="Алина"
              className="aspect-[3/4] w-full object-cover object-[center_15%]"
            />
          </div>

          {/* Заголовок + регалии */}
          <div className="md:pt-8">
            <h2 className="font-display text-5xl font-semibold leading-none md:text-6xl">
              Обо мне
            </h2>
            <p className="mt-6 font-display text-2xl leading-snug text-foreground md:text-[1.75rem]">
              {c.about.title}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {c.about.lead}
            </p>
          </div>
        </div>

        {/* Методы — терракотовый прямоугольник со скруглёнными углами, перекрывает низ */}
        <div className="relative z-10 mt-10 md:-mt-12 md:ml-auto md:w-[80%]">
          <div className="rounded-[2.5rem] bg-terracotta px-6 py-8 shadow-lg sm:px-10 sm:py-10">
            <div className="rounded-2xl bg-cream p-6 sm:p-8">
              <h3 className="font-display text-xl text-terracotta">Методы</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.about.methods.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 text-foreground/85"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
